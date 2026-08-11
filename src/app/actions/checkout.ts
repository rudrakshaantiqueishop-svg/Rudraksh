"use server";

import Razorpay from "razorpay";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import { getCartItems } from "@/lib/cart-server";
import { getCartTotals } from "@/lib/cart";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { orderNumber, formatOrderDate } from "@/lib/orders";
import { formatPrice } from "@/lib/currency";
import { getMainImage } from "@/lib/product-utils";

export type InitiateCheckoutResult =
  | {
      success: true;
      orderId: string;
      razorpayOrderId: string;
      amount: number;
      currency: string;
      keyId: string;
    }
  | { success: false; error: string };

export type VerifyPaymentResult =
  | { success: true; orderId: string; totalCents: number }
  | { success: false; error: string };

const PAYMENTS_NOT_CONFIGURED_MESSAGE =
  "Online payments aren't configured yet. Please make sure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set in .env.";

/**
 * A stable fingerprint of what is being bought. Two checkout attempts for the
 * same basket produce the same string, which is how we recognise a duplicate
 * attempt (second tab, double click, back button) and hand back the order that
 * already exists instead of opening a second chargeable Razorpay order.
 */
/**
 * Loads the just-paid order and hands it to Resend. Kept separate so the
 * confirmation path is easy to read and can be reused if a resend-receipt
 * action is ever added.
 */
async function sendOrderConfirmation(orderId: string, email: string): Promise<void> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: { select: { name: true } },
      address: true,
      items: { include: { product: { select: { name: true, images: true } } } },
    },
  });
  if (!order) return;

  await sendOrderConfirmationEmail(email, {
    orderId: order.id,
    orderNumber: orderNumber(order.id),
    customerName: order.user.name ?? "there",
    placedOn: formatOrderDate(order.createdAt),
    totalAmount: formatPrice(order.totalCents, "INR"),
    paymentReference: order.razorpayPaymentId,
    items: order.items.map((item) => ({
      // Snapshot first: the live product may have been renamed or repriced.
      name: item.productName ?? item.product?.name ?? "Product",
      options: [item.variantLabel, item.sizeLabel, item.addOnLabel].filter(Boolean).join(" · ") || undefined,
      quantity: item.quantity,
      lineTotal: formatPrice(item.priceCents * item.quantity, "INR"),
      imageUrl: item.product ? getMainImage(item.product.images)?.url : undefined,
    })),
    address: order.address,
  });
}

function lineSignature(
  lines: {
    productId: string;
    quantity: number;
    unitPriceCents: number;
    variantLabel?: string | null;
    sizeLabel?: string | null;
    addOnLabel?: string | null;
  }[]
): string {
  return lines
    .map((l) =>
      [
        l.productId,
        l.quantity,
        l.unitPriceCents,
        l.variantLabel ?? "",
        l.sizeLabel ?? "",
        l.addOnLabel ?? "",
      ].join("|")
    )
    .sort()
    .join("~");
}

export async function initiateCheckout(addressId: string): Promise<InitiateCheckoutResult> {
  const user = await requireUser();

  const address = await prisma.address.findFirst({
    where: { id: addressId, userId: user.id },
  });
  if (!address) {
    return { success: false, error: "Please select a valid shipping address." };
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: { include: { category: true } },
          variant: true,
          addOn: true,
          size: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return { success: false, error: "Your cart is empty." };
  }

  // ── Unavailable-item guard ────────────────────────────────────────────
  // Products whose category has been hidden in the admin panel can still be
  // sitting in a cart from before it was hidden. They are not on sale, so they
  // can't be paid for — but the message has to name them, otherwise there is no
  // way for the customer to tell what to take out.
  const unavailable = cart.items.filter((item) => item.product.category?.isActive === false);

  if (unavailable.length > 0) {
    const names = unavailable.map((item) => `"${item.product.name}"`).join(", ");
    return {
      success: false,
      error:
        unavailable.length === 1
          ? `${names} is not available to buy right now. Please remove it from your cart to continue.`
          : `These items are not available to buy right now: ${names}. Please remove them from your cart to continue.`,
    };
  }

  const cartItems = await getCartItems(user.id);
  const { subtotalCents } = getCartTotals(cartItems);
  if (subtotalCents <= 0) {
    return { success: false, error: "Your cart total is invalid." };
  }

  // Don't take money for something we can't ship.
  const stockLevels = await prisma.product.findMany({
    where: { id: { in: cartItems.map((i) => i.productId) } },
    select: { id: true, name: true, stockCount: true },
  });
  const shortItem = cartItems.find((item) => {
    const product = stockLevels.find((p) => p.id === item.productId);
    return !product || product.stockCount < item.quantity;
  });
  if (shortItem) {
    const available = stockLevels.find((p) => p.id === shortItem.productId)?.stockCount ?? 0;
    return {
      success: false,
      error:
        available === 0
          ? `"${shortItem.name}" has just gone out of stock. Please remove it from your cart to continue.`
          : `Only ${available} left of "${shortItem.name}". Please reduce the quantity to continue.`,
    };
  }

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return { success: false, error: PAYMENTS_NOT_CONFIGURED_MESSAGE };
  }

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const signature = lineSignature(cartItems);

    // ── Duplicate-attempt guard ───────────────────────────────────────────
    // If this customer already has an unpaid order open for exactly this
    // basket, reuse it. Without this, a second tab or an impatient double
    // click creates a second Razorpay order and the customer can be charged
    // twice for the same cart.
    const openOrders = await prisma.order.findMany({
      where: { userId: user.id, status: "PENDING" },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    const reusable = openOrders.find(
      (o) =>
        o.razorpayOrderId !== null &&
        o.addressId === address.id &&
        o.totalCents === subtotalCents &&
        lineSignature(
          o.items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            unitPriceCents: i.priceCents,
            variantLabel: i.variantLabel,
            sizeLabel: i.sizeLabel,
            addOnLabel: i.addOnLabel,
          }))
        ) === signature
    );

    if (reusable?.razorpayOrderId) {
      return {
        success: true,
        orderId: reusable.id,
        razorpayOrderId: reusable.razorpayOrderId,
        amount: reusable.totalCents,
        currency: "INR",
        keyId,
      };
    }

    // Any other unpaid order is for a basket the customer has since changed;
    // retire it so it can't be paid for by an old, still-open Razorpay window.
    const stale = openOrders.filter((o) => o.id !== reusable?.id).map((o) => o.id);
    if (stale.length > 0) {
      await prisma.order.updateMany({
        where: { id: { in: stale }, status: "PENDING" },
        data: { status: "CANCELLED", fulfillmentStatus: "CANCELLED" },
      });
    }

    // Create internal PENDING order record in DB. Line items are built from the
    // same cartItems the total was summed from, and snapshot the chosen options
    // so the order stays packable if the product changes later.
    const dbOrder = await prisma.order.create({
      data: {
        userId: user.id,
        addressId: address.id,
        status: "PENDING",
        totalCents: subtotalCents,
        currency: "INR",
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.unitPriceCents,
            productName: item.name,
            variantLabel: item.variantLabel ?? null,
            sizeLabel: item.sizeLabel ?? null,
            addOnLabel: item.addOnLabel ?? null,
          })),
        },
      },
    });

    // Amount in Razorpay is subunit (paise for INR / cents for USD). subtotalCents is already in cents/paise.
    const razorpayOrder = await razorpay.orders.create({
      amount: subtotalCents,
      currency: "INR",
      receipt: dbOrder.id,
      notes: {
        userId: user.id,
        addressId: address.id,
        orderId: dbOrder.id,
      },
    });

    // Update order with razorpayOrderId
    await prisma.order.update({
      where: { id: dbOrder.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return {
      success: true,
      orderId: dbOrder.id,
      razorpayOrderId: razorpayOrder.id,
      amount: subtotalCents,
      currency: "INR",
      keyId,
    };
  } catch (err: unknown) {
    console.error("Razorpay order creation failed:", err);
    return {
      success: false,
      error: "Failed to initiate payment with Razorpay. Please check API keys and try again.",
    };
  }
}

export async function verifyRazorpayPayment({
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<VerifyPaymentResult> {
  const user = await requireUser();
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return { success: false, error: "Razorpay key secret is not configured on server." };
  }

  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user.id },
      include: { items: true },
    });

    if (!order) {
      return { success: false, error: "Order not found." };
    }

    // Already confirmed — the checkout handler can fire more than once, and a
    // repeat must not decrement stock or re-clear the cart a second time.
    if (order.status === "PAID") {
      return { success: true, orderId: order.id, totalCents: order.totalCents };
    }

    // The signature only proves "this Razorpay order was paid". Without tying it
    // back to the order row, a cheap paid order's signature could be replayed
    // against a different, more expensive pending order.
    if (!order.razorpayOrderId || order.razorpayOrderId !== razorpayOrderId) {
      return { success: false, error: "This payment does not belong to this order." };
    }

    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "utf8");
    const receivedBuf = Buffer.from(String(razorpaySignature), "utf8");
    const signatureValid =
      expectedBuf.length === receivedBuf.length && crypto.timingSafeEqual(expectedBuf, receivedBuf);

    if (!signatureValid) {
      await prisma.order.updateMany({
        where: { id: order.id, status: "PENDING" },
        data: { status: "FAILED" },
      });
      return { success: false, error: "Invalid payment signature verification." };
    }

    // ── Confirm exactly once ──────────────────────────────────────────────
    // The Razorpay handler can fire more than once, and the customer may have
    // two tabs open, so two confirmations can arrive at the same instant. The
    // updateMany below is the claim: the database decides a single winner, and
    // only that caller goes on to take stock and clear the cart. Reading the
    // status first and then writing would let both callers pass the check.
    //
    // CANCELLED is claimable too — if the "window dismissed" signal raced ahead
    // of a payment that actually succeeded, the money is real and the order has
    // to be honoured.
    const applied = await prisma.$transaction(async (tx) => {
      const claim = await tx.order.updateMany({
        where: { id: order.id, status: { in: ["PENDING", "CANCELLED"] } },
        data: {
          status: "PAID",
          fulfillmentStatus: "PLACED",
          razorpayPaymentId,
          paidAt: new Date(),
        },
      });

      if (claim.count === 0) return false;

      await tx.orderEvent.create({
        data: { orderId: order.id, status: "PLACED", note: "Payment received." },
      });

      // Never let stock go negative: two customers can clear the pre-checkout
      // stock check at the same time and both pay. Both payments are real, so
      // both orders stand — we take what is there and flag the shortfall for
      // the admin rather than silently going below zero.
      // Sorted so concurrent orders touching the same products always take row
      // locks in the same order, which is what stops them deadlocking.
      const itemsInLockOrder = [...order.items].sort((a, b) =>
        a.productId.localeCompare(b.productId)
      );

      let shortfall = false;
      for (const item of itemsInLockOrder) {
        const taken = await tx.product.updateMany({
          where: { id: item.productId, stockCount: { gte: item.quantity } },
          data: { stockCount: { decrement: item.quantity } },
        });
        if (taken.count === 0) {
          shortfall = true;
          await tx.product.updateMany({
            where: { id: item.productId },
            data: { stockCount: 0 },
          });
        }
      }

      if (shortfall) {
        await tx.orderEvent.create({
          data: {
            orderId: order.id,
            status: "PLACED",
            note: "Stock ran out while this payment was going through — check availability before shipping.",
          },
        });
      }

      await tx.cartItem.deleteMany({ where: { cart: { userId: user.id } } });
      return true;
    }, { timeout: 15000 });

    if (!applied) {
      // Another request confirmed it a moment ago. Re-read so we only report
      // success for an order that really is paid.
      const settled = await prisma.order.findUnique({
        where: { id: order.id },
        select: { status: true, totalCents: true },
      });
      if (settled?.status !== "PAID") {
        return { success: false, error: "This order could no longer be confirmed. Please contact us." };
      }
      return { success: true, orderId: order.id, totalCents: settled.totalCents };
    }

    // Confirmation email. Deliberately after the transaction and swallowed on
    // failure — the payment has already gone through, so a Resend outage must
    // never turn a paid order into an error for the customer.
    try {
      await sendOrderConfirmation(order.id, user.email);
    } catch (mailErr) {
      console.error("Order confirmation email failed:", mailErr);
    }

    revalidatePath("/cart");
    revalidatePath("/account/orders");
    revalidatePath("/admin/orders");

    return { success: true, orderId: order.id, totalCents: order.totalCents };
  } catch (err: unknown) {
    console.error("Payment verification error:", err);
    return { success: false, error: "Payment verification failed." };
  }
}

// Called when the customer closes the Razorpay window without paying, so the
// abandoned order doesn't sit in the admin list looking like a live one.
export async function abandonCheckout(orderId: string): Promise<void> {
  const user = await requireUser();
  await prisma.order.updateMany({
    where: { id: orderId, userId: user.id, status: "PENDING" },
    data: { status: "CANCELLED", fulfillmentStatus: "CANCELLED" },
  });
}
