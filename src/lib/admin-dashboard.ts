import "server-only";
import { prisma } from "@/lib/prisma";

export async function getAdminDashboardCounts() {
  const [products, blogs, users] = await Promise.all([
    prisma.product.count(),
    prisma.blog.count(),
    prisma.user.count(),
  ]);

  return { products, blogs, users };
}
