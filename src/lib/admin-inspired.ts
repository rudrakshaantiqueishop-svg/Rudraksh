import "server-only";
import { prisma } from "@/lib/prisma";
import { DEFAULT_INSPIRED_ITEMS } from "@/lib/inspired";

export async function listInspiredItemsForAdmin() {
  try {
    if (!prisma.inspiredItem) {
      return [];
    }

    const items = await prisma.inspiredItem.findMany({
      orderBy: { sortOrder: "asc" },
    });

    if (items.length === 0) {
      const seeded = [];
      for (const def of DEFAULT_INSPIRED_ITEMS) {
        const item = await prisma.inspiredItem.create({
          data: {
            title: def.title,
            type: def.type,
            videoUrl: def.videoUrl,
            imageUrl: def.imageUrl,
            productImageUrl: def.productImageUrl,
            price: def.price,
            originalPrice: def.originalPrice,
            sortOrder: def.sortOrder,
            isActive: true,
          },
        });
        seeded.push(item);
      }
      return seeded;
    }

    return items;
  } catch (error) {
    console.error("Error listing inspired items for admin:", error);
    return [];
  }
}

export async function getInspiredItemForAdmin(id: string) {
  try {
    if (!prisma.inspiredItem) return null;
    return await prisma.inspiredItem.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error getting inspired item by ID:", error);
    return null;
  }
}

export async function getStoreCatalogForAdmin() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        subcategories: {
          orderBy: { sortOrder: "asc" },
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        products: {
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            subcategoryId: true,
            priceCents: true,
            compareAtPriceCents: true,
            images: {
              take: 1,
              orderBy: { sortOrder: "asc" },
              select: { url: true },
            },
          },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching catalog for admin:", error);
    return [];
  }
}

export type InspiredItemForAdmin = NonNullable<Awaited<ReturnType<typeof getInspiredItemForAdmin>>>;
export type StoreCatalogForAdmin = Awaited<ReturnType<typeof getStoreCatalogForAdmin>>;

