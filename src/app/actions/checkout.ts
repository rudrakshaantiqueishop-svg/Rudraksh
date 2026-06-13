"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import { getCartItems } from "@/lib/cart-server";
import { getCartTotals } from "@/lib/cart";

export type InitiateCheckoutResult = { error: string };

const PAYMENTS_NOT_CONFIGURED_MESSAGE = "Online payments aren't enabled yet. Please check back soon.";

export async function initiateCheckout(addressId: string): Promise<InitiateCheckoutResult> {
  const user = await requireUser();

  const address = await prisma.address.findFirst({
    where: { id: addressId, userId: user.id },
  });
  if (!address) {
    return { error: "Please select a valid shipping address." };
  }

  const items = await getCartItems(user.id);
  if (items.length === 0) {
    return { error: "Your cart is empty." };
  }

  const { subtotalCents } = getCartTotals(items);
  if (subtotalCents <= 0) {
    return { error: "Your cart total is invalid." };
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return { error: PAYMENTS_NOT_CONFIGURED_MESSAGE };
  }

  // Razorpay order creation + Order/OrderItem persistence (only after
  // payment.captured webhook confirmation) will be wired up here once
  // RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are configured.
  return { error: PAYMENTS_NOT_CONFIGURED_MESSAGE };
}
