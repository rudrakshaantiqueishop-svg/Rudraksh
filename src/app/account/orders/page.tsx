import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Package, ShoppingBag } from "lucide-react";
import { requireUser } from "@/lib/dal";
import { listOrdersForUser, orderItemView } from "@/lib/admin-orders";
import {
  orderNumber,
  fulfillmentLabel,
  fulfillmentBadgeClasses,
  formatOrderDate,
} from "@/lib/orders";
import { formatPrice } from "@/lib/currency";

export default async function OrdersPage() {
  const user = await requireUser();
  const orders = await listOrdersForUser(user.id);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="m-0 font-prata text-2xl text-[#0B0404] sm:text-3xl">Order History</h1>
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#EADFD1] bg-gradient-to-b from-[#FFF9F0] to-[#FFFDF9] p-10 text-center shadow-[0_1px_2px_rgba(85,41,18,0.04)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E6D3] text-[#552912]">
            <ShoppingBag size={28} />
          </div>
          <h3 className="m-0 font-prata text-xl text-[#0B0404]">No Orders Placed Yet</h3>
          <p className="m-0 max-w-md font-lato text-sm text-[#78716C]">
            Explore our sacred lab-certified Rudrakshas, authentic malas, and energized spiritual
            treasures.
          </p>
          <Link
            href="/products"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-[#552912] px-6 py-3 font-lato text-xs font-bold tracking-wider text-white shadow-md transition-colors hover:bg-[#3D1D0D]"
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="m-0 font-prata text-2xl text-[#0B0404] sm:text-3xl">Order History</h1>
        <span className="rounded-full border border-[#EADFD1] bg-[#FDF6ED] px-3 py-1 font-lato text-xs font-semibold text-[#7A5C3E]">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {orders.map((order) => {
          const items = order.items.map(orderItemView);
          const preview = items.slice(0, 3);
          const remaining = items.length - preview.length;

          return (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              /* Warm off-white rather than flat white, so the card sits on the
                 cream page as a layer instead of a hole punched in it. */
              className="group overflow-hidden rounded-2xl border border-[#EADFD1] bg-[#FFFDF9] shadow-[0_1px_2px_rgba(85,41,18,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D8BFA3] hover:shadow-[0_10px_28px_rgba(85,41,18,0.10)]"
            >
              {/* Header band */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE1CF] bg-gradient-to-r from-[#FFF5E6] to-[#FDF6ED] px-5 py-3.5">
                <div className="flex flex-col">
                  <span className="font-prata text-base font-medium text-[#0B0404] transition-colors group-hover:text-[#552912]">
                    Order {orderNumber(order.id)}
                  </span>
                  <span className="mt-0.5 font-lato text-xs text-[#8B7355]">
                    Placed on {formatOrderDate(order.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {order.status === "PAID" ? (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-lato text-xs font-bold uppercase tracking-wider ${fulfillmentBadgeClasses(
                        order.fulfillmentStatus
                      )}`}
                    >
                      <Package size={12} />
                      {fulfillmentLabel(order.fulfillmentStatus)}
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 font-lato text-xs font-bold uppercase tracking-wider text-red-800">
                      Payment Failed
                    </span>
                  )}
                  <ChevronRight
                    size={18}
                    className="text-[#B89B7A] transition-all group-hover:translate-x-0.5 group-hover:text-[#552912]"
                  />
                </div>
              </div>

              {/* Item thumbnails */}
              <div className="flex items-center gap-3 px-5 py-4">
                {preview.map((item, i) => (
                  <div
                    key={i}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#EADFD1] bg-[#F5EADF]"
                  >
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-[#B89B7A]">
                        No Image
                      </div>
                    )}
                  </div>
                ))}
                {remaining > 0 && (
                  <span className="rounded-lg border border-[#EADFD1] bg-[#FDF6ED] px-2.5 py-1 font-lato text-xs font-medium text-[#7A5C3E]">
                    +{remaining} more
                  </span>
                )}
              </div>

              {/* Footer strip */}
              <div className="flex items-center justify-between border-t border-[#EFE1CF] bg-[#FBF3E9] px-5 py-3 font-lato">
                <span className="text-xs text-[#8B7355]">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#8B7355]">Total</span>
                  <span className="font-prata text-base text-[#552912]">
                    {formatPrice(order.totalCents, "INR")}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
