"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import { getWishlistItems, getWishlistProductIds } from "@/lib/wishlist-server";
import type { WishlistItem } from "@/lib/wishlist";

export async function getWishlist(): Promise<WishlistItem[]> {
  const user = await requireUser();
  return getWishlistItems(user.id);
}

export async function getWishlistIds(): Promise<string[]> {
  const user = await requireUser();
  return getWishlistProductIds(user.id);
}

export async function toggleWishlistItem(productId: string): Promise<{ ids: string[] }> {
  const user = await requireUser();

  const existing = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId: user.id, productId } },
  });

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } });
  } else {
    await prisma.wishlistItem.create({ data: { userId: user.id, productId } });
  }

  revalidatePath("/account/wishlist");
  return { ids: await getWishlistProductIds(user.id) };
}
