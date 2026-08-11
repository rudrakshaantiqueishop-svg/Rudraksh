import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { listOrdersForAdmin } from "@/lib/admin-orders";
import {
  orderNumber,
  fulfillmentLabel,
  fulfillmentBadgeClasses,
  paymentLabel,
  paymentBadgeClasses,
  formatOrderDate,
} from "@/lib/orders";
import { formatPrice } from "@/lib/currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ all?: string }>;
}) {
  await requireAdmin();
  const { all } = await searchParams;
  const includeAbandoned = all === "1";
  const orders = await listOrdersForAdmin(includeAbandoned);

  const toShip = orders.filter(
    (o) => o.status === "PAID" && o.fulfillmentStatus !== "DELIVERED" && o.fulfillmentStatus !== "CANCELLED"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-prata text-2xl text-dark">Orders</h1>
          <p className="mt-1 font-lato text-sm text-gray-text">
            {toShip > 0
              ? `${toShip} ${toShip === 1 ? "order needs" : "orders need"} to be shipped or updated.`
              : "Everything is up to date."}
          </p>
        </div>
        <Link
          href={includeAbandoned ? "/admin/orders" : "/admin/orders?all=1"}
          className="font-lato text-sm text-[#BB5A28] underline underline-offset-2"
        >
          {includeAbandoned ? "Hide abandoned checkouts" : "Show abandoned checkouts"}
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[110px]">Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[70px] text-center">Items</TableHead>
              <TableHead className="w-[110px] text-right">Total</TableHead>
              <TableHead className="w-[130px] text-center">Payment</TableHead>
              <TableHead className="w-[150px] text-center">Shipping</TableHead>
              <TableHead className="w-[90px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center font-lato text-gray-text">
                  No orders yet. They appear here as soon as a customer pays.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-lato text-sm font-semibold text-dark">
                    {orderNumber(order.id)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-lato text-sm text-dark">
                        {order.user.name ?? "Customer"}
                      </span>
                      <span className="font-lato text-xs text-gray-text">{order.user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-lato text-sm text-gray-text">
                    {formatOrderDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-center font-lato text-sm text-dark">
                    {order._count.items}
                  </TableCell>
                  <TableCell className="text-right font-lato text-sm font-semibold text-dark">
                    {formatPrice(order.totalCents, "INR")}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 font-lato text-xs font-semibold ${paymentBadgeClasses(
                        order.status
                      )}`}
                    >
                      {paymentLabel(order.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.status === "PAID" ? (
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 font-lato text-xs font-semibold ${fulfillmentBadgeClasses(
                          order.fulfillmentStatus
                        )}`}
                      >
                        {fulfillmentLabel(order.fulfillmentStatus)}
                      </span>
                    ) : (
                      <span className="font-lato text-xs text-gray-text">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-lato text-sm text-[#BB5A28] underline underline-offset-2"
                    >
                      Open
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
