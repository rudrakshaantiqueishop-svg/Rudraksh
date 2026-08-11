import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, CreditCard, ShieldCheck, HelpCircle, Package, Copy } from "lucide-react";
import { requireUser } from "@/lib/dal";
import { getOrderForUser, orderItemView } from "@/lib/admin-orders";
import OrderTimeline from "@/components/orders/OrderTimeline";
import CopyOrderButton from "@/components/orders/CopyOrderButton";
import {
  orderNumber,
  fulfillmentLabel,
  fulfillmentHint,
  fulfillmentBadgeClasses,
  formatOrderDate,
} from "@/lib/orders";
import { formatPrice } from "@/lib/currency";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const order = await getOrderForUser(id, user.id);

  if (!order) {
    notFound();
  }

  const items = order.items.map(orderItemView);

  return (
    <div className="flex flex-col gap-6">
      {/* Back Link & Header */}
      <div className="flex flex-col gap-3 border-b border-[#E7DFD6] pb-5">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1.5 font-lato text-xs sm:text-sm font-semibold text-[#78716C] hover:text-[#552912] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Order History
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3">
            <h1 className="font-prata text-2xl sm:text-3xl text-[#0B0404] m-0">
              Order {orderNumber(order.id)}
            </h1>
            <CopyOrderButton text={order.id} />
          </div>

          <div>
            {order.status === "PAID" ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-lato text-xs font-bold uppercase tracking-wider ${fulfillmentBadgeClasses(
                  order.fulfillmentStatus
                )}`}
              >
                <Package size={14} />
                {fulfillmentLabel(order.fulfillmentStatus)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-4 py-1.5 font-lato text-xs font-bold text-red-800 uppercase tracking-wider">
                Payment Failed / Unpaid
              </span>
            )}
          </div>
        </div>

        <p className="font-lato text-xs sm:text-sm text-[#78716C] m-0">
          Placed on <strong className="text-[#0B0404] font-medium">{formatOrderDate(order.createdAt)}</strong>
        </p>
      </div>

      {/* Track Your Order Card */}
      {order.status === "PAID" && (
        <div className="rounded-2xl border border-[#EADFD1] bg-[#FFFDF9] p-6 shadow-[0_1px_2px_rgba(85,41,18,0.04)] flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-prata text-xl text-[#0B0404] m-0 flex items-center gap-2">
              <span>Track Your Order</span>
            </h2>
            <p className="font-lato text-xs sm:text-sm text-[#552912] bg-[#FDF6ED] border border-[#F5E6D3] rounded-md px-3.5 py-2.5 mt-2 m-0 font-medium">
              {fulfillmentHint(order.fulfillmentStatus)}
            </p>
          </div>

          <OrderTimeline status={order.fulfillmentStatus} events={order.events} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Purchased Items Card */}
        <div className="lg:col-span-2 rounded-2xl border border-[#EADFD1] bg-[#FFFDF9] p-6 shadow-[0_1px_2px_rgba(85,41,18,0.04)] flex flex-col justify-between">
          <div>
            <h3 className="font-prata text-lg text-[#0B0404] m-0 mb-4 pb-3 border-b border-[#EFE1CF]">
              Order Items ({items.length})
            </h3>
            <div className="flex flex-col gap-4">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 border-b border-[#F0E8DD] pb-4 last:border-0 last:pb-0 items-start"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E7DFD6] bg-[#F0E8DD]">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">No Image</div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    {item.slug ? (
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-prata text-base text-[#0B0404] hover:text-[#552912] transition-colors line-clamp-1 font-medium"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="font-prata text-base text-[#0B0404] font-medium">{item.name}</span>
                    )}

                    {item.options && (
                      <span className="font-lato text-xs text-[#78716C] bg-stone-100 px-2 py-0.5 rounded w-fit">
                        {item.options}
                      </span>
                    )}

                    <span className="font-lato text-xs text-[#78716C] mt-1">
                      Qty: <strong className="text-[#0B0404]">{item.quantity}</strong>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-lato text-base font-bold text-[#0B0404]">
                      {formatPrice(item.lineTotalCents, "INR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="mt-6 pt-4 border-t border-[#E7DFD6] flex flex-col gap-2 font-lato text-sm">
            <div className="flex justify-between text-[#78716C]">
              <span>Items Subtotal</span>
              <span>{formatPrice(order.totalCents, "INR")}</span>
            </div>
            <div className="flex justify-between text-[#78716C]">
              <span>Sacred Energization & Lab Certification</span>
              <span className="text-emerald-700 font-semibold">Included (Free)</span>
            </div>
            <div className="flex justify-between text-[#78716C]">
              <span>Express Insured Shipping</span>
              <span className="text-emerald-700 font-semibold">Free</span>
            </div>
            <div className="flex justify-between items-center text-base font-bold text-[#0B0404] border-t border-[#F0E8DD] pt-3 mt-1">
              <span>Total Paid</span>
              <span className="text-[#552912] text-lg font-bold">{formatPrice(order.totalCents, "INR")}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Address & Payment Details */}
        <div className="flex flex-col gap-6">
          {/* Delivery Address */}
          <div className="rounded-2xl border border-[#EADFD1] bg-[#FFFDF9] p-6 shadow-[0_1px_2px_rgba(85,41,18,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#552912] border-b border-[#EFE1CF] pb-3">
              <MapPin size={18} />
              <h3 className="font-prata text-base text-[#0B0404] m-0">Delivery Address</h3>
            </div>

            {order.address ? (
              <address className="font-lato text-xs sm:text-sm not-italic leading-relaxed text-[#44403C]">
                <strong className="block text-sm font-semibold text-[#0B0404] mb-1">
                  {order.address.fullName}
                </strong>
                {order.address.line1}
                {order.address.line2 ? `, ${order.address.line2}` : ""}
                <br />
                {order.address.city}, {order.address.state} - {order.address.postalCode}
                <br />
                {order.address.country}
                <br />
                <span className="inline-block mt-2 font-medium text-[#78716C]">
                  Phone: {order.address.phone}
                </span>
              </address>
            ) : (
              <p className="font-lato text-xs text-[#78716C] m-0">
                Shipping address details associated with this order.
              </p>
            )}
          </div>

          {/* Payment Info */}
          <div className="rounded-2xl border border-[#EADFD1] bg-[#FFFDF9] p-6 shadow-[0_1px_2px_rgba(85,41,18,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#552912] border-b border-[#E7DFD6] pb-3">
              <CreditCard size={18} />
              <h3 className="font-prata text-base text-[#0B0404] m-0">Payment Summary</h3>
            </div>

            <dl className="flex flex-col gap-2.5 font-lato text-xs sm:text-sm m-0">
              <div className="flex items-center justify-between">
                <dt className="text-[#78716C]">Method</dt>
                <dd className="font-semibold text-[#0B0404]">Razorpay Secure Checkout</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[#78716C]">Payment Status</dt>
                <dd className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <ShieldCheck size={14} /> Paid Online
                </dd>
              </div>
            </dl>
          </div>

          {/* Need Help Box */}
          <div className="rounded-xl border border-[#E7DFD6] bg-[#FDF6ED] p-5 text-center flex flex-col items-center gap-2">
            <HelpCircle size={22} className="text-[#552912]" />
            <h4 className="font-prata text-base text-[#0B0404] m-0">Need Help with your Order?</h4>
            <p className="font-lato text-xs text-[#78716C] m-0">
              Our spiritual guidance team is available to assist you with order status, energization, or delivery queries.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded bg-[#552912] text-white font-lato text-xs font-semibold hover:bg-[#3D1D0D] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
