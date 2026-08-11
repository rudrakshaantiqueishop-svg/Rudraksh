import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { getOrderForAdmin, orderItemView } from "@/lib/admin-orders";
import OrderStatusUpdater from "@/components/admin/OrderStatusUpdater";
import OrderTimeline from "@/components/orders/OrderTimeline";
import {
  orderNumber,
  paymentLabel,
  paymentBadgeClasses,
  formatOrderDateTime,
} from "@/lib/orders";
import { formatPrice } from "@/lib/currency";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const order = await getOrderForAdmin(id);

  if (!order) {
    notFound();
  }

  const items = order.items.map(orderItemView);
  const isPaid = order.status === "PAID";

  return (
    <div className="flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 font-lato text-sm text-gray-text transition-colors hover:text-dark"
        >
          <ArrowLeft size={16} /> Back to Orders
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-prata text-2xl text-dark">Order {orderNumber(order.id)}</h1>
          <span
            className={`rounded-full px-2.5 py-0.5 font-lato text-xs font-semibold ${paymentBadgeClasses(
              order.status
            )}`}
          >
            {paymentLabel(order.status)}
          </span>
        </div>
        <p className="font-lato text-sm text-gray-text">
          Placed {formatOrderDateTime(order.createdAt)}
          {order.paidAt ? ` · Paid ${formatOrderDateTime(order.paidAt)}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: what to pack and where to send it */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-prata text-lg text-dark">Items to Pack</h2>
            <div className="flex flex-col">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 border-b border-[#E7DFD6] py-4 first:pt-0 last:border-0 last:pb-0"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-[#F0E8DD]">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="font-lato text-sm font-medium text-dark">{item.name}</span>
                    {item.options && (
                      <span className="font-lato text-xs font-semibold text-brown">
                        {item.options}
                      </span>
                    )}
                    <span className="font-lato text-xs text-gray-text">
                      {formatPrice(item.priceCents, "INR")} each
                    </span>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="font-lato text-sm font-bold text-dark">×{item.quantity}</span>
                    <span className="font-lato text-xs text-gray-text">
                      {formatPrice(item.lineTotalCents, "INR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-4 font-lato text-sm">
              <span className="font-semibold text-dark">Order Total</span>
              <span className="font-bold text-dark">{formatPrice(order.totalCents, "INR")}</span>
            </div>
          </section>

          <section className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-3 font-prata text-lg text-dark">Ship To</h2>
            {order.address ? (
              <address className="font-lato text-sm not-italic leading-relaxed text-gray-text">
                <span className="block font-semibold text-dark">{order.address.fullName}</span>
                {order.address.line1}
                {order.address.line2 ? `, ${order.address.line2}` : ""}
                <br />
                {order.address.city}, {order.address.state} {order.address.postalCode}
                <br />
                {order.address.country}
                <br />
                <span className="text-dark">{order.address.phone}</span>
              </address>
            ) : (
              <p className="font-lato text-sm text-destructive">
                The customer deleted this address. Contact them before shipping.
              </p>
            )}
          </section>

          <section className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-3 font-prata text-lg text-dark">Customer & Payment</h2>
            <dl className="grid grid-cols-1 gap-3 font-lato text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-gray-text">Name</dt>
                <dd className="text-dark">{order.user.name ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-text">Email</dt>
                <dd className="break-all text-dark">{order.user.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-text">Phone</dt>
                <dd className="text-dark">{order.user.phone ?? order.address?.phone ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-text">Razorpay payment ID</dt>
                <dd className="break-all font-mono text-xs text-dark">
                  {order.razorpayPaymentId ?? "—"}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Right: the action panel */}
        <div className="flex flex-col gap-6">
          <section className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-1 font-prata text-lg text-dark">Update Shipping Status</h2>
            <p className="mb-4 font-lato text-xs text-gray-text">
              The customer sees this immediately on their order page.
            </p>
            <OrderStatusUpdater
              orderId={order.id}
              current={order.fulfillmentStatus}
              disabled={!isPaid}
            />
          </section>

          {isPaid && (
            <section className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-prata text-lg text-dark">History</h2>
              <OrderTimeline status={order.fulfillmentStatus} events={order.events} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
