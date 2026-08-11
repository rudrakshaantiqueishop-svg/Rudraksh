import "server-only";
import { prisma } from "@/lib/prisma";
import { getMainImage, type ProductImageLite } from "@/lib/product-utils";

const orderDetailInclude = {
  user: { select: { id: true, name: true, email: true, phone: true } },
  address: true,
  events: { orderBy: { createdAt: "asc" } },
  items: {
    include: {
      product: { select: { slug: true, name: true, images: true } },
    },
  },
} as const;

// Abandoned checkouts (the customer closed the Razorpay window) are not orders
// anyone needs to act on, so they stay out of the admin list by default.
export async function listOrdersForAdmin(includeUnpaid = false) {
  return prisma.order.findMany({
    where: includeUnpaid ? undefined : { status: { in: ["PAID", "FAILED"] } },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { items: true } },
    },
  });
}

export async function getOrderForAdmin(id: string) {
  return prisma.order.findUnique({ where: { id }, include: orderDetailInclude });
}

export async function listOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId, status: { in: ["PAID", "FAILED"] } },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { select: { slug: true, name: true, images: true } } } },
    },
  });
}

export async function getOrderForUser(id: string, userId: string) {
  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: orderDetailInclude,
  });
  return order;
}

// Line items render the same way on both sides: prefer the snapshot taken at
// purchase time, fall back to the live product for orders placed before
// snapshots existed.
export function orderItemView(item: {
  productName: string | null;
  variantLabel: string | null;
  sizeLabel: string | null;
  addOnLabel: string | null;
  quantity: number;
  priceCents: number;
  product: { slug: string; name: string; images: ProductImageLite[] } | null;
}) {
  return {
    name: item.productName ?? item.product?.name ?? "Product",
    slug: item.product?.slug ?? null,
    image: item.product ? (getMainImage(item.product.images)?.url ?? "") : "",
    options: [item.variantLabel, item.sizeLabel, item.addOnLabel].filter(Boolean).join(" · "),
    quantity: item.quantity,
    priceCents: item.priceCents,
    lineTotalCents: item.priceCents * item.quantity,
  };
}

export type OrderForAdmin = NonNullable<Awaited<ReturnType<typeof getOrderForAdmin>>>;
export type OrderListItemForAdmin = Awaited<ReturnType<typeof listOrdersForAdmin>>[number];
export type OrderForUser = NonNullable<Awaited<ReturnType<typeof getOrderForUser>>>;
export type OrderListItemForUser = Awaited<ReturnType<typeof listOrdersForUser>>[number];
