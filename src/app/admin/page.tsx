import Link from "next/link";
import { Package, Newspaper, Users } from "lucide-react";
import { getAdminDashboardCounts } from "@/lib/admin-dashboard";

export default async function AdminPage() {
  const counts = await getAdminDashboardCounts();

  const cards = [
    { href: "/admin/products", label: "Products", count: counts.products, icon: Package },
    { href: "/admin/blog", label: "Blog Posts", count: counts.blogs, icon: Newspaper },
    { href: "/admin/users", label: "Users", count: counts.users, icon: Users },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-prata text-[28px] text-dark">Admin Dashboard</h1>
        <p className="mt-1 font-lato text-sm text-gray-text">
          Manage products, blog posts, and users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ href, label, count, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col gap-3 border border-border p-6 transition-colors hover:bg-secondary"
          >
            <Icon size={24} strokeWidth={1.5} className="text-brown" />
            <div>
              <p className="font-prata text-2xl text-dark">{count}</p>
              <p className="font-lato text-sm uppercase tracking-[0.06em] text-gray-text">
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
