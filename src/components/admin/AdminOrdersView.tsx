"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  User,
  ChevronRight,
  CheckCircle2,
  Clock,
  Truck,
  Navigation,
  XCircle,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import {
  orderNumber,
  fulfillmentLabel,
  fulfillmentBadgeClasses,
  paymentLabel,
  paymentBadgeClasses,
  formatOrderDateTime,
} from "@/lib/orders";
import { formatPrice } from "@/lib/currency";
import type { OrderListItemForAdmin } from "@/lib/admin-orders";

interface AdminOrdersViewProps {
  orders: OrderListItemForAdmin[];
}

export default function AdminOrdersView({ orders }: AdminOrdersViewProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Calculate counts for each enum & state
  const counts = {
    all: orders.filter((o) => o.status !== "PENDING").length,
    placed: orders.filter((o) => o.status === "PAID" && o.fulfillmentStatus === "PLACED").length,
    shipped: orders.filter((o) => o.status === "PAID" && o.fulfillmentStatus === "SHIPPED").length,
    outForDelivery: orders.filter((o) => o.status === "PAID" && o.fulfillmentStatus === "OUT_FOR_DELIVERY").length,
    delivered: orders.filter((o) => o.status === "PAID" && o.fulfillmentStatus === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status === "FAILED" || o.fulfillmentStatus === "CANCELLED").length,
    abandoned: orders.filter((o) => o.status === "PENDING").length,
  };

  // Filter orders according to active tab
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "PLACED") {
      return order.status === "PAID" && order.fulfillmentStatus === "PLACED";
    }
    if (statusFilter === "SHIPPED") {
      return order.status === "PAID" && order.fulfillmentStatus === "SHIPPED";
    }
    if (statusFilter === "OUT_FOR_DELIVERY") {
      return order.status === "PAID" && order.fulfillmentStatus === "OUT_FOR_DELIVERY";
    }
    if (statusFilter === "DELIVERED") {
      return order.status === "PAID" && order.fulfillmentStatus === "DELIVERED";
    }
    if (statusFilter === "CANCELLED") {
      return order.status === "FAILED" || order.fulfillmentStatus === "CANCELLED";
    }
    if (statusFilter === "PENDING") {
      return order.status === "PENDING";
    }
    return order.status !== "PENDING";
  });

  const filterTabs = [
    { id: "all", label: "All Active", count: counts.all, icon: ShoppingBag },
    { id: "PLACED", label: "Order Placed", count: counts.placed, icon: Clock, highlight: counts.placed > 0 },
    { id: "SHIPPED", label: "Shipped", count: counts.shipped, icon: Truck },
    { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", count: counts.outForDelivery, icon: Navigation },
    { id: "DELIVERED", label: "Delivered", count: counts.delivered, icon: CheckCircle2 },
    { id: "CANCELLED", label: "Cancelled", count: counts.cancelled, icon: XCircle },
    { id: "PENDING", label: "Abandoned Carts", count: counts.abandoned, icon: AlertCircle, isAbandoned: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div>
        <h1 className="font-prata text-2xl font-normal text-dark sm:text-3xl">Orders</h1>
        <p className="mt-1 font-lato text-sm text-gray-text">
          {counts.placed > 0
            ? `${counts.placed} ${counts.placed === 1 ? "order needs" : "orders need"} processing & shipping.`
            : "All paid orders are up to date."}
        </p>
      </div>

      {/* Horizontally Scrollable Enum Status Filter Bar */}
      <div className="relative">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth touch-pan-x">
          {filterTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-lato text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "border-brown bg-brown text-cream shadow-xs"
                    : tab.isAbandoned
                    ? "border-amber-200 bg-amber-50/70 text-amber-900 hover:border-amber-400 hover:bg-amber-100/70"
                    : "border-stone-200 bg-white text-stone-600 hover:border-brown/50 hover:bg-stone-50 hover:text-dark"
                }`}
              >
                <Icon size={14} className={isActive ? "text-cream" : tab.isAbandoned ? "text-amber-700" : "text-stone-500"} />
                <span>{tab.label}</span>
                <span
                  className={`ml-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-cream"
                      : tab.highlight
                      ? "bg-amber-200 text-amber-950"
                      : tab.isAbandoned
                      ? "bg-amber-200/80 text-amber-900"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Responsive Card Layout */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-800">
            <ShoppingBag size={24} />
          </div>
          <h3 className="font-prata text-lg text-dark">No orders found</h3>
          <p className="max-w-xs font-lato text-sm text-gray-text">
            There are no orders matching the selected status filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => {
            const isAbandoned = order.status === "PENDING";
            return (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isAbandoned
                    ? "border-amber-200/90 hover:border-amber-400 bg-linear-to-b from-amber-50/20 to-white"
                    : "border-stone-200/90 hover:border-brown/40"
                }`}
              >
                <div className="flex flex-col gap-4">
                  {/* Card Header: Order Number & Date */}
                  <div className="flex items-center justify-between border-b border-stone-100/90 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-amber-100/70 px-3 py-1 font-prata text-sm font-semibold text-stone-900 group-hover:bg-brown group-hover:text-cream transition-all duration-200 shadow-2xs">
                        {orderNumber(order.id)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500 font-lato text-xs">
                      <Clock size={13} className="text-stone-400" />
                      <span>{formatOrderDateTime(order.createdAt)}</span>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="flex items-center gap-3.5 py-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 font-lato text-sm font-bold text-stone-700 ring-2 ring-stone-100/80 group-hover:ring-brown/30 transition-all">
                      {order.user.name ? order.user.name.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-lato text-sm font-semibold text-dark group-hover:text-brown transition-colors">
                        {order.user.name ?? "Customer"}
                      </p>
                      <p className="truncate font-lato text-xs text-stone-500">{order.user.email}</p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-lato text-xs font-bold uppercase tracking-wider ${paymentBadgeClasses(
                        order.status
                      )}`}
                    >
                      <CreditCard size={12} />
                      {paymentLabel(order.status)}
                    </span>
                    {order.status === "PAID" && (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-lato text-xs font-bold uppercase tracking-wider ${fulfillmentBadgeClasses(
                          order.fulfillmentStatus
                        )}`}
                      >
                        <Package size={12} />
                        {fulfillmentLabel(order.fulfillmentStatus)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Items, Total & Action */}
                <div className="mt-6 flex items-center justify-between border-t border-stone-100/90 pt-4">
                  <div className="flex items-center gap-2 font-lato text-xs font-medium text-stone-600 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-100">
                    <Package size={14} className="text-stone-500" />
                    <span>
                      {order._count.items} {order._count.items === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-prata text-lg font-bold text-dark">
                      {formatPrice(order.totalCents, "INR")}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-all duration-200 group-hover:bg-brown group-hover:text-cream group-hover:scale-105">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
