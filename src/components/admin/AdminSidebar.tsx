"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Newspaper, Users } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 flex-col md:h-full md:w-[260px]">
      <div className="mb-4 mt-6 md:mb-8 md:mt-0">
        <h1 className="font-prata text-[28px] text-dark">Admin</h1>
        <p className="mt-1 font-lato text-sm text-gray-text">Manage your store</p>
      </div>

      <div className="fixed bottom-6 left-1/2 z-50 flex w-[90%] max-w-[400px] -translate-x-1/2 flex-row items-center justify-around rounded-full bg-white px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:static md:z-auto md:flex-1 md:w-auto md:max-w-none md:translate-x-0 md:flex-col md:items-stretch md:rounded-none md:bg-transparent md:px-0 md:py-0 md:shadow-none">
        <nav className="flex flex-1 justify-around md:flex-none md:justify-start md:flex-col md:gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-1 rounded-full p-3 transition-colors md:flex-row md:justify-start md:gap-3 md:rounded-none md:px-4 md:py-3 font-lato text-xs md:text-sm uppercase tracking-[0.06em] ${
                  isActive ? "bg-brown text-cream" : "text-gray-text hover:bg-secondary hover:text-dark"
                }`}
                aria-label={label}
              >
                <Icon size={22} strokeWidth={1.5} className="md:h-[18px] md:w-[18px]" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
