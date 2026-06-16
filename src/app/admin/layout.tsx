import { requireAdmin } from "@/lib/dal";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <section className="bg-cream" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="flex w-full flex-col gap-4 px-6 py-[10px] md:flex-row md:gap-12">
        <AdminSidebar />
        <main className="min-w-0 flex-1 pb-24 md:pb-8">{children}</main>
      </div>
    </section>
  );
}
