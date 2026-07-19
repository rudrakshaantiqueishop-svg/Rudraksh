import "server-only";
import { prisma } from "@/lib/prisma";

export async function listCategoriesForAdmin() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true, subcategories: true } },
    },
  });
}

export async function getCategoryForAdmin(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: {
      subcategories: {
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { products: true } } },
      },
    },
  });
}

export type CategoryForAdmin = NonNullable<Awaited<ReturnType<typeof getCategoryForAdmin>>>;
