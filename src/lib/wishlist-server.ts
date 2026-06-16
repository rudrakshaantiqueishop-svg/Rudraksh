import "server-only";

import { prisma } from "@/lib/prisma";
import { getMainImage } from "@/lib/product-utils";
import type { WishlistItem } from "@/lib/wishlist";

export async function getWishlistItems(userId: string): Promise<WishlistItem[]> {
  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    include: { product: { include: { images: true } } },
    orderBy: { createdAt: "desc" },
  });

  return items.map((item) => ({
    id: item.id,
    productId: item.productId,
    slug: item.product.slug,
    name: item.product.name,
    image: getMainImage(item.product.images)?.url ?? "",
    priceCents: item.product.priceCents,
    compareAtPriceCents: item.product.compareAtPriceCents,
  }));
}

export async function getWishlistProductIds(userId: string): Promise<string[]> {
  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    select: { productId: true },
  });
  return items.map((item) => item.productId);
}
