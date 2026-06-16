import "server-only";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 20;

export async function listUsersForAdmin({
  search,
  page = 1,
}: {
  search?: string;
  page?: number;
}) {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: { select: { addresses: true, reviews: true, wishlistItems: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total, pageSize: PAGE_SIZE };
}

export async function getUserForAdmin(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { addresses: true },
  });
}

export type UserForAdmin = NonNullable<Awaited<ReturnType<typeof getUserForAdmin>>>;
