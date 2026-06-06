"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const productColumns = [
  [
    { name: "Rudraksha",   icon: "/assets/icons/icon-rudraksha.svg" },
    { name: "Bracelets",   icon: "/assets/icons/icon-bracelets.svg" },
    { name: "Murtis",      icon: "/assets/icons/icon-murtis.svg" },
  ],
  [
    { name: "Siddha Mala", icon: "/assets/icons/icon-siddha-mala.svg" },
    { name: "Gemstones",   icon: "/assets/icons/icon-gemstones.svg" },
    { name: "Antiques",    icon: "/assets/icons/icon-antiques.svg" },
  ],
  [
    { name: "Combinations",  icon: "/assets/icons/icon-combinations.svg" },
    { name: "Singing Bowls", icon: "/assets/icons/icon-singing-bowls.svg" },
    { name: "Necklaces",     icon: "/assets/icons/icon-necklaces.svg" },
  ],
];

const aboutLinks = [
  { name: "Authenticity & Certification", href: "#" },
  { name: "Energisation Process", href: "#" },
  { name: "Blogs", href: "#" },
  { name: "Testinomial", href: "#" },
];

export default function Header({ activePage }: { activePage?: string }) {
  const pathname = usePathname();
  const currentPage = activePage ?? (pathname === "/" ? "home" : pathname === "/about" ? "about" : pathname === "/contact" ? "contact" : "home");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-[#FEF9F2]" style={{ borderBottom: activeDropdown ? "none" : "1px solid rgba(0,0,0,0.05)" }}>
      {/* Main bar */}
      <div className="flex items-center justify-between h-px-section" style={{ height: "72px", paddingTop: 0, paddingBottom: 0 }}>

        {/* Hamburger — mobile only */}
        <button className="header-hamburger hidden items-center justify-center p-2 text-[#0B0404]" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/assets/images/common/logo.png" alt="Rudraksha Antiquei" width={212} height={40} style={{ objectFit: "contain", height: "36px", width: "auto" }} />
        </Link>

        {/* Nav — absolutely centred, hidden on mobile */}
        <div className="header-nav-center absolute inset-x-0 h-full flex justify-center pointer-events-none">
          <nav className="flex items-center gap-8 pointer-events-auto h-full">

            <Link href="/" className={`font-lato text-base font-normal flex items-center h-full transition-colors ${currentPage === "home" ? "text-[#BB5A28]" : "text-[#0B0404] hover:text-[#BB5A28]"}`}>
              HOME
            </Link>

            {/* About Us trigger */}
            <div
              className={`relative flex items-center gap-2 font-lato text-base font-normal h-full transition-colors cursor-pointer ${activeDropdown === "about" || currentPage === "about" ? "text-[#BB5A28]" : "text-[#0B0404] hover:text-[#BB5A28]"}`}
              onMouseEnter={() => setActiveDropdown("about")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/about" className="flex items-center h-full">
                ABOUT US
              </Link>
              <svg width="15" height="8" viewBox="0 0 15 8" fill="none" className={`transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180" : ""}`}>
                <path d="M1 1L7.5 7L14 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Linear Dropdown for About Us */}
              {activeDropdown === "about" && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 bg-[#FEF9F2] flex flex-col min-w-[260px] py-3 rounded-b-md z-50"
                  style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", top: "100%" }}
                >
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-6 py-3 font-lato font-medium text-[#44403C] hover:text-[#BB5A28] hover:bg-black/5 transition-colors whitespace-nowrap text-base"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products trigger */}
            <button
              className={`flex items-center gap-2 font-lato text-base font-normal h-full transition-colors ${activeDropdown === "products" ? "text-[#BB5A28]" : "text-[#0B0404] hover:text-[#BB5A28]"}`}
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              PRODUCTS
              <svg width="15" height="8" viewBox="0 0 15 8" fill="none" className={`transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180" : ""}`}>
                <path d="M1 1L7.5 7L14 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <Link href="/contact" className={`font-lato text-base font-normal flex items-center h-full uppercase transition-colors ${currentPage === "contact" ? "text-[#BB5A28]" : "text-[#0B0404] hover:text-[#BB5A28]"}`}>
              CONTACT US
            </Link>

          </nav>
        </div>

        {/* Right actions — desktop */}
        <div className="header-actions-desktop flex items-center gap-6">
          {[
            <svg key="search" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
            <svg key="heart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
            <svg key="user" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
            <svg key="cart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
          ].map((icon, i) => (
            <button key={i} className="text-[#44403C] hover:text-[#BB5A28] transition-colors">{icon}</button>
          ))}
          <div className="flex items-center gap-1 font-lato text-base text-[#44403C] cursor-pointer hover:text-[#BB5A28] transition-colors">
            <span>USD</span>
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none">
              <path d="M1 1L7.5 7L14 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Right actions — mobile only (search, heart, cart) */}
        <div className="header-actions-mobile hidden items-center gap-4">
          {[
            <svg key="s" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
            <svg key="h" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
            <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
          ].map((icon, i) => (
            <button key={i} className="text-[#44403C]">{icon}</button>
          ))}
        </div>
      </div>

      {/* Products Dropdown */}
      {activeDropdown === "products" && (
        <div
          className="absolute left-0 right-0 w-full bg-[#FEF9F2]"
          style={{ boxShadow: "0px 1px 10px 0px rgba(0,0,0,0.15)", paddingTop: "40px", paddingBottom: "40px", top: "100%" }}
          onMouseEnter={() => setActiveDropdown("products")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 70px", display: "flex", justifyContent: "space-between" }}>
            {productColumns.map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "30px", width: "200px" }}>
                {col.map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    className="group/item"
                    style={{ display: "flex", alignItems: "center", gap: "16px", textDecoration: "none" }}
                  >
                    {/* Icon circle */}
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "rgba(187,90,40,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Image src={item.icon} alt={item.name} width={24} height={24} />
                    </div>
                    {/* Label */}
                    <span
                      className="font-lato font-medium text-[#44403C] group-hover/item:text-[#BB5A28] transition-colors"
                      style={{ fontSize: "16px", lineHeight: "150%" }}
                    >
                      {item.name}
                    </span>
                    {/* Arrow */}
                    <div className="ml-auto flex-shrink-0">
                      <Image src="/assets/icons/icon-arrow.svg" alt="" width={24} height={24} />
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}


    </header>
  );
}
