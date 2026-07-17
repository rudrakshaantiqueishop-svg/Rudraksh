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
    include: { category: true, authorUser: { select: { name: true } } },
  });
  // Only published posts are visible on the public site.
  if (!blog || blog.status !== "PUBLISHED") return null;
  return blog;
}

// Sidebar "Popular Posts" — most recent published posts, excluding the one
// currently being read.
export async function getPopularBlogs(excludeId: string, limit = 3) {
  return prisma.blog.findMany({
    where: { status: "PUBLISHED", id: { not: excludeId } },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: { id: true, slug: true, title: true, coverImage: true, publishedAt: true },
  });
}

// Bottom "Related Articles" — prefer posts in the same category as the one
// being read, then fill with the most recent posts. Always excludes the
// current post and never repeats a post already picked.
export async function getRelatedBlogs(excludeId: string, categoryId: string | null, limit = 3) {
  const select = {
    id: true,
    slug: true,
    title: true,
    excerpt: true,
    coverImage: true,
    publishedAt: true,
    readTimeMinutes: true,
  };

  const categoryPosts = categoryId
    ? await prisma.blog.findMany({
        where: { categoryId, status: "PUBLISHED", id: { not: excludeId } },
        orderBy: { publishedAt: "desc" },
        take: limit,
        select,
      })
    : [];

  if (categoryPosts.length >= limit) return categoryPosts;

  const exclude = [excludeId, ...categoryPosts.map((p) => p.id)];
  const fillerPosts = await prisma.blog.findMany({
    where: { status: "PUBLISHED", id: { notIn: exclude } },
    orderBy: { publishedAt: "desc" },
    take: limit - categoryPosts.length,
    select,
  });

  return [...categoryPosts, ...fillerPosts];
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

  const [rows, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take,
      include: { category: true, authorUser: { select: { name: true } } },
    }),
    prisma.blog.count({ where }),
  ]);

  // Prefer the linked staff account's real name for the byline, falling back
  // to the free-text author only when there is no linked account.
  const posts = rows.map(({ authorUser, ...post }) => ({
    ...post,
    author: authorUser?.name ?? post.author,
  }));

  return { posts, total };
}
