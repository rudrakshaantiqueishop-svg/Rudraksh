import { prisma } from "@/lib/prisma";

export async function getBlogsByCategory(categoryId: string, limit = 3) {
  const categoryPosts = await prisma.blog.findMany({
    where: { categoryId, status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  if (categoryPosts.length >= limit) {
    return categoryPosts;
  }

  const fillerPosts = await prisma.blog.findMany({
    where: { status: "PUBLISHED", id: { notIn: categoryPosts.map((p) => p.id) } },
    orderBy: { publishedAt: "desc" },
    take: limit - categoryPosts.length,
  });

  return [...categoryPosts, ...fillerPosts];
}

export async function getRecentBlogs(limit = 3) {
  return prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: { id: true, slug: true, title: true, excerpt: true, coverImage: true },
  });
}

export async function getBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { category: true },
  });
  // Only published posts are visible on the public site.
  if (!blog || blog.status !== "PUBLISHED") return null;
  return blog;
}

export async function getBlogCategories() {
  return prisma.category.findMany({
    where: { blogs: { some: { status: "PUBLISHED" } } },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });
}

export async function getBlogsPaginated({
  categorySlug,
  skip = 0,
  take = 4,
}: {
  categorySlug?: string;
  skip?: number;
  take?: number;
}) {
  const where = categorySlug
    ? { status: "PUBLISHED" as const, category: { slug: categorySlug } }
    : { status: "PUBLISHED" as const };

  const [posts, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take,
      include: { category: true },
    }),
    prisma.blog.count({ where }),
  ]);

  return { posts, total };
}
