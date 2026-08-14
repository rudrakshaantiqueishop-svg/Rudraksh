import { requireAdmin } from "@/lib/dal";
import { listOrdersForAdmin } from "@/lib/admin-orders";
import AdminOrdersView from "@/components/admin/AdminOrdersView";

export default async function AdminOrdersPage() {
  await requireAdmin();
  // Fetch all orders so status enum filter tabs (including Abandoned Carts) work instantly
  const orders = await listOrdersForAdmin(true);

  return <AdminOrdersView orders={orders} />;
}

