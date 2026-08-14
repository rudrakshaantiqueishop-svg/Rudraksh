"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState, useCallback } from "react";
import { User, MapPin, Package, Heart, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { logout } from "@/app/actions/auth";

const navItems = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/orders", label: "Order History", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountSidebar({
  name,
  email,
}: {
  name: string | null;
  email: string;
}) {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      const timer = setTimeout(checkScroll, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname, checkScroll]);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollDistance = container.clientWidth * 0.6;
    container.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <aside className="flex shrink-0 flex-col md:h-full md:w-[260px]">
      <div className="mb-4 mt-6 md:mb-8 md:mt-0">
        <h1 className="font-prata text-[28px] text-dark">My Account</h1>
        <p className="mt-1 truncate font-lato text-sm text-gray-text">{name ?? email}</p>
      </div>

      <div className="fixed bottom-4 left-3 right-3 z-50 max-w-xl mx-auto md:static md:z-auto md:w-full md:max-w-none md:mx-0">
        <div className="relative flex items-center rounded-2xl border border-stone-200/90 bg-white/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl md:border-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none md:flex-col md:items-stretch">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Scroll left"
              className="absolute left-1 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-md transition-all hover:bg-white hover:text-dark active:scale-90 md:hidden"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
          )}

          <div
            className={`pointer-events-none absolute left-0 bottom-0 top-0 z-10 w-7 rounded-l-2xl bg-gradient-to-r from-white via-white/80 to-transparent transition-opacity duration-200 md:hidden ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          <nav
            ref={scrollContainerRef}
            className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto scroll-smooth px-1 py-0.5 touch-pan-x md:flex-col md:items-stretch md:gap-1 md:overflow-visible md:p-0"
          >
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = href === "/account" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  ref={isActive ? activeItemRef : null}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-lato text-xs font-semibold uppercase tracking-[0.05em] transition-all duration-200 md:w-full md:justify-start md:gap-3 md:rounded-xl md:px-4 md:py-3 md:text-sm ${
                    isActive
                      ? "bg-brown text-cream shadow-sm shadow-brown/25 scale-[1.01] ring-1 ring-brown/30"
                      : "text-stone-600 hover:bg-secondary/80 hover:text-dark active:scale-95"
                  }`}
                  aria-label={label}
                >
                  <Icon size={18} strokeWidth={1.75} className="shrink-0 md:h-[18px] md:w-[18px]" />
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div
            className={`pointer-events-none absolute right-0 bottom-0 top-0 z-10 w-7 rounded-r-2xl bg-gradient-to-l from-white via-white/80 to-transparent transition-opacity duration-200 md:hidden ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Scroll right"
              className="absolute right-1 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-md transition-all hover:bg-white hover:text-dark active:scale-90 md:hidden"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          )}

          <form action={logout} className="ml-1 shrink-0 border-l border-stone-200 pl-2 md:ml-0 md:mt-4 md:border-none md:pl-0">
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-stone-600 transition-all duration-200 hover:bg-red-50 hover:text-destructive active:scale-95 md:w-full md:justify-start md:gap-3 md:rounded-xl md:px-4 md:py-3 font-lato text-xs md:text-sm font-semibold uppercase tracking-[0.05em]"
              aria-label="Sign Out"
            >
              <LogOut size={18} strokeWidth={1.75} className="shrink-0 md:h-[18px] md:w-[18px]" />
              <span className="whitespace-nowrap">Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

