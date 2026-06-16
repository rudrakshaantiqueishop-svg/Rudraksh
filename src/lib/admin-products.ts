import "server-only";
import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 15;

export async function listProductsForAdmin({
  search,
  categoryId,
  page = 1,
}: {
  search?: string;
  categoryId?: string;
  page?: number;
}) {
  const where: Prisma.ProductWhereInput = {};
  if (search) where.name = { contains: search, mode: "insensitive" };
  if (categoryId) where.categoryId = categoryId;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        category: true,
        images: { where: { role: "MAIN" }, take: 1 },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, pageSize: PAGE_SIZE };
}

export async function getProductForAdmin(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { sortOrder: "asc" } },
      addOns: { orderBy: { sortOrder: "asc" } },
      sizes: { orderBy: { sortOrder: "asc" } },
      collections: true,
      category: true,
    },
  });
}

export type ProductForAdmin = NonNullable<Awaited<ReturnType<typeof getProductForAdmin>>>;
