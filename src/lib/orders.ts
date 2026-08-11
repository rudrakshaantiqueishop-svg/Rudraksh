import type { FulfillmentStatus, OrderStatus } from "@/generated/prisma/client";

// Order ids are uuids, which nobody can read out over the phone. This is the
// short reference shown to customers and admins alike.
export function orderNumber(id: string): string {
  return `#${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

// The shipping journey, in order. Everything that walks the customer through
// "where is my parcel" derives from this one list.
export const FULFILLMENT_STEPS = [
  {
    value: "PLACED",
    label: "Order Placed",
    customerHint: "We have your order and are getting it ready.",
  },
  {
    value: "SHIPPED",
    label: "Shipped",
    customerHint: "Your parcel has left our facility.",
  },
  {
    value: "OUT_FOR_DELIVERY",
    label: "Out for Delivery",
    customerHint: "Your parcel is with the courier and arriving today.",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    customerHint: "Your order has been delivered.",
  },
] as const satisfies readonly { value: FulfillmentStatus; label: string; customerHint: string }[];

export const CANCELLED_STEP = {
  value: "CANCELLED",
  label: "Cancelled",
  customerHint: "This order was cancelled.",
} as const;

export function fulfillmentLabel(status: FulfillmentStatus): string {
  if (status === "CANCELLED") return CANCELLED_STEP.label;
  return FULFILLMENT_STEPS.find((s) => s.value === status)?.label ?? status;
}

export function fulfillmentHint(status: FulfillmentStatus): string {
  if (status === "CANCELLED") return CANCELLED_STEP.customerHint;
  return FULFILLMENT_STEPS.find((s) => s.value === status)?.customerHint ?? "";
}

// Index of a status along the journey; -1 for cancelled, which is off the track.
export function fulfillmentStepIndex(status: FulfillmentStatus): number {
  return FULFILLMENT_STEPS.findIndex((s) => s.value === status);
}

export function fulfillmentBadgeClasses(status: FulfillmentStatus): string {
  switch (status) {
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-800";
    case "OUT_FOR_DELIVERY":
      return "bg-blue-100 text-blue-800";
    case "SHIPPED":
      return "bg-amber-100 text-amber-900";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-stone-100 text-stone-700";
  }
}

export function paymentLabel(status: OrderStatus): string {
  switch (status) {
    case "PAID":
      return "Paid";
    case "PENDING":
      return "Payment pending";
    case "FAILED":
      return "Payment failed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

export function paymentBadgeClasses(status: OrderStatus): string {
  switch (status) {
    case "PAID":
      return "bg-emerald-100 text-emerald-800";
    case "PENDING":
      return "bg-amber-100 text-amber-900";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-stone-100 text-stone-600";
  }
}

export function formatOrderDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatOrderDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
