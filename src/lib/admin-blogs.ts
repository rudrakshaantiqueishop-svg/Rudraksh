import "server-only";
import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 15;

export async function listBlogsForAdmin({
  search,
  categoryId,
  page = 1,
}: {
  search?: string;
  categoryId?: string;
  page?: number;
}) {
  const where: Prisma.BlogWhereInput = {};
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (categoryId) where.categoryId = categoryId;

  const [posts, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { category: true },
    }),
    prisma.blog.count({ where }),
  ]);

  return { posts, total, pageSize: PAGE_SIZE };
}

export async function getBlogForAdmin(id: string) {
  return prisma.blog.findUnique({ where: { id } });
}

export type BlogForAdmin = NonNullable<Awaited<ReturnType<typeof getBlogForAdmin>>>;
