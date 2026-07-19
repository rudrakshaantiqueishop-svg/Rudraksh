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

// Sidebar "Related Products" for a blog post — products in the same category
// as the post, filled out with bestsellers when the category is empty or the
// post has no category.
export async function getRelatedProducts(categoryId: string | null, limit = 3) {
  const include = { images: { orderBy: { sortOrder: "asc" as const } } };

  const inCategory = categoryId
    ? await prisma.product.findMany({
        where: { categoryId },
        take: limit,
        orderBy: [{ isBestseller: "desc" }, { createdAt: "asc" }],
        include,
      })
    : [];

  if (inCategory.length >= limit) return inCategory;

  const fillers = await prisma.product.findMany({
    where: { isBestseller: true, id: { notIn: inCategory.map((p) => p.id) } },
    take: limit - inCategory.length,
    orderBy: { createdAt: "asc" },
    include,
  });

  return [...inCategory, ...fillers];
}

export async function getProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    where: { category: { slug: categorySlug } },
    orderBy: { createdAt: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } }, sizes: { orderBy: { sortOrder: "asc" } } },
  });
}

// ── Subcategories ──────────────────────────────────────────────────────

// Category + its subcategories (for the category landing page grid).
export async function getCategoryWithSubcategories(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      subcategories: {
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { products: true } } },
      },
    },
  });
}

// Flat list of every subcategory with its parent category id — used by the
// admin product form to populate a category-dependent subcategory select.
export async function getAllSubcategories() {
  return prisma.subcategory.findMany({
    orderBy: [{ categoryId: "asc" }, { sortOrder: "asc" }],
    select: { id: true, name: true, slug: true, categoryId: true, group: true },
  });
}

export async function getSubcategoriesByCategory(categorySlug: string) {
  return prisma.subcategory.findMany({
    where: { category: { slug: categorySlug } },
    orderBy: { sortOrder: "asc" },
  });
}

// A subcategory resolved within its parent category (slugs are unique per
// category, so both are required).
export async function getSubcategoryBySlug(categorySlug: string, subSlug: string) {
  const category = await prisma.category.findUnique({ where: { slug: categorySlug }, select: { id: true } });
  if (!category) return null;
  return prisma.subcategory.findUnique({
    where: { categoryId_slug: { categoryId: category.id, slug: subSlug } },
    include: { category: true },
  });
}

// All products in a subcategory, with the data the listing + facet helpers
// need (images, sizes, collections). Filtering/faceting happens in memory.
export async function getProductsBySubcategory(categorySlug: string, subSlug: string) {
  return prisma.product.findMany({
    where: { category: { slug: categorySlug }, subcategory: { slug: subSlug } },
    orderBy: { createdAt: "asc" },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      sizes: { orderBy: { sortOrder: "asc" } },
      collections: { select: { slug: true, name: true } },
    },
  });
}

export async function getCategoriesWithProductCounts() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return categories;
}

// Fetch products by an ordered list of slugs, preserving the slug order
// (used for Life Path Number recommendations). Missing slugs are skipped.
export async function getProductsBySlugs(slugs: string[]) {
  if (slugs.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { slug: { in: slugs } },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return slugs.map((slug) => bySlug.get(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
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
