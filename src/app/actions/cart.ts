"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import { getCartItems } from "@/lib/cart-server";
import { MAX_CART_QUANTITY, type CartItem } from "@/lib/cart";

type AddCartItemInput = {
  productId: string;
  variantId?: string;
  addOnId?: string;
  sizeId?: string;
};

async function upsertCartItem(cartId: string, input: AddCartItemInput, quantity: number) {
  const existing = await prisma.cartItem.findFirst({
    where: {
      cartId,
      productId: input.productId,
      variantId: input.variantId ?? null,
      addOnId: input.addOnId ?? null,
      sizeId: input.sizeId ?? null,
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: Math.min(existing.quantity + quantity, MAX_CART_QUANTITY) },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId,
        productId: input.productId,
        variantId: input.variantId,
        addOnId: input.addOnId,
        sizeId: input.sizeId,
        quantity,
      },
    });
  }
}

export async function getCart(): Promise<CartItem[]> {
  const user = await requireUser();
  return getCartItems(user.id);
}

export async function addCartItem(input: AddCartItemInput, quantity = 1): Promise<CartItem[]> {
  const user = await requireUser();

  const product = await prisma.product.findUnique({ where: { id: input.productId } });
  if (!product) throw new Error("Product not found");

  const qty = Math.min(Math.max(1, Math.floor(quantity)), MAX_CART_QUANTITY);

  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  await upsertCartItem(cart.id, input, qty);

  revalidatePath("/cart");
  revalidatePath("/checkout");
  return getCartItems(user.id);
}

export async function removeCartItem(itemId: string): Promise<CartItem[]> {
  const user = await requireUser();

  await prisma.cartItem.deleteMany({ where: { id: itemId, cart: { userId: user.id } } });

  revalidatePath("/cart");
  revalidatePath("/checkout");
  return getCartItems(user.id);
}

export async function updateCartItemQuantity(itemId: string, quantity: number): Promise<CartItem[]> {
  const user = await requireUser();

  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { id: itemId, cart: { userId: user.id } } });
  } else {
    const qty = Math.min(Math.floor(quantity), MAX_CART_QUANTITY);
    await prisma.cartItem.updateMany({
      where: { id: itemId, cart: { userId: user.id } },
      data: { quantity: qty },
    });
  }

  revalidatePath("/cart");
  revalidatePath("/checkout");
  return getCartItems(user.id);
}

export async function clearCart(): Promise<CartItem[]> {
  const user = await requireUser();

  await prisma.cartItem.deleteMany({ where: { cart: { userId: user.id } } });

  revalidatePath("/cart");
  revalidatePath("/checkout");
  return [];
}

export async function mergeGuestCart(items: CartItem[]): Promise<CartItem[]> {
  const user = await requireUser();

  if (items.length === 0) return getCartItems(user.id);

  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  for (const item of items) {
    if (!item.productId || !item.quantity) continue;

    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product) continue;

    const qty = Math.min(Math.max(1, Math.floor(item.quantity)), MAX_CART_QUANTITY);

    await upsertCartItem(
      cart.id,
      {
        productId: item.productId,
        variantId: item.variantId,
        addOnId: item.addOnId,
        sizeId: item.sizeId,
      },
      qty
    );
  }

  revalidatePath("/cart");
  revalidatePath("/checkout");
  return getCartItems(user.id);
}
