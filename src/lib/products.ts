import { prisma } from "@/lib/prisma";

export * from "@/lib/product-utils";

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getCollections() {
  return prisma.collection.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getCollectionBySlug(slug: string) {
  return prisma.collection.findUnique({ where: { slug } });
}

export async function getProductsByCollection(collectionSlug: string) {
  return prisma.product.findMany({
    where: { collections: { some: { slug: collectionSlug } } },
    orderBy: { createdAt: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } }, sizes: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getBestsellerProducts(limit = 8) {
  return prisma.product.findMany({
    where: { isBestseller: true },
    take: limit,
    orderBy: { createdAt: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { sortOrder: "asc" } },
      addOns: { orderBy: { sortOrder: "asc" } },
      sizes: { orderBy: { sortOrder: "asc" } },
      reviews: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { image: true } } },
      },
      category: true,
    },
  });
}

export async function getSimilarProducts(categoryId: string, excludeId: string, limit = 4) {
  return prisma.product.findMany({
    where: { categoryId, NOT: { id: excludeId } },
    take: limit,
    orderBy: { createdAt: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    where: { category: { slug: categorySlug } },
    orderBy: { createdAt: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } }, sizes: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getCategoriesWithProductCounts() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return categories;
}

export async function searchProducts(query: string, limit = 6) {
  const term = query.trim();
  if (!term) return [];

  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
      ],
    },
    take: limit,
    include: { images: { where: { role: "MAIN" }, take: 1 } },
  });
}
