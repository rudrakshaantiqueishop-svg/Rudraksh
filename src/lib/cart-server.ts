import "server-only";

import { prisma } from "@/lib/prisma";
import { getMainImage } from "@/lib/product-utils";
import type { CartItem } from "@/lib/cart";

export async function getOrCreateCart(userId: string) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (cart) return cart;
  return prisma.cart.create({ data: { userId } });
}

export async function getCartItems(userId: string): Promise<CartItem[]> {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: { include: { images: true } },
          variant: true,
          addOn: true,
          size: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!cart) return [];

  return cart.items.map((item) => {
    const variantDelta = item.variant?.priceDeltaCents ?? 0;
    const addOnDelta = item.addOn?.priceDeltaCents ?? 0;
    const image = item.variant?.image ?? getMainImage(item.product.images)?.url ?? "";

    return {
      id: item.id,
      productId: item.productId,
      slug: item.product.slug,
      name: item.product.name,
      image,
      unitPriceCents: item.product.priceCents + variantDelta + addOnDelta,
      variantId: item.variantId ?? undefined,
      variantLabel: item.variant?.label,
      sizeId: item.sizeId ?? undefined,
      sizeLabel: item.size?.label,
      addOnId: item.addOnId ?? undefined,
      addOnLabel: item.addOn?.label,
      quantity: item.quantity,
    };
  });
}
