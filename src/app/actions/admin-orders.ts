"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import type { FulfillmentStatus } from "@/generated/prisma/client";

const ALLOWED: FulfillmentStatus[] = [
  "PLACED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

export type UpdateStatusResult = { success: true } | { success: false; error: string };

export async function updateFulfillmentStatus(
  orderId: string,
  status: string,
  note?: string
): Promise<UpdateStatusResult> {
  await requireAdmin();

  if (!ALLOWED.includes(status as FulfillmentStatus)) {
    return { success: false, error: "Unknown status." };
  }
  const next = status as FulfillmentStatus;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, status: true, fulfillmentStatus: true },
  });
  if (!order) {
    return { success: false, error: "Order not found." };
  }
  if (order.status !== "PAID") {
    return { success: false, error: "This order has not been paid for yet." };
  }
  if (order.fulfillmentStatus === next) {
    return { success: true };
  }

  // Each change is recorded as an event so the customer sees a dated history
  // rather than only the latest state.
  await prisma.$transaction([
    prisma.order.update({ where: { id: orderId }, data: { fulfillmentStatus: next } }),
    prisma.orderEvent.create({
      data: { orderId, status: next, note: note?.trim() || null },
    }),
  ]);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/account/orders");
  revalidatePath(`/account/orders/${orderId}`);

  return { success: true };
}
