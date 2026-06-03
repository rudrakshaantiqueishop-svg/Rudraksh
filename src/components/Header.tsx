"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const products = [
  { name: "Rudraksha", icon: "🔮" },
  { name: "Siddha Mala", icon: "📿" },
  { name: "Combinations", icon: "✨" },
  { name: "Bracelets", icon: "💎" },
  { name: "Gemstones", icon: "🪨" },
  { name: "Singing Bowls", icon: "🎵" },
  { name: "Murtis", icon: "🏺" },
  { name: "Antiques", icon: "🏛️" },
  { name: "Necklaces", icon: "📿" },
];

export default function Header({ activePage }: { activePage?: string }) {
  const pathname = usePathname();
  const currentPage = activePage ?? (pathname === "/" ? "home" : pathname === "/about" ? "about" : pathname === "/contact" ? "contact" : "home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-black/5">
      <div className="flex items-center justify-between h-[72px] px-[70px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/images/logo.png" alt="Rudraksha Antiquei" width={220} height={72} style={{ objectFit: "contain", height: "60px", width: "auto" }} />
        </Link>

        {/* Nav */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
          <Link href="/" className={`font-lato text-sm font-bold tracking-wide transition-colors ${currentPage === "home" ? "text-accent" : "text-dark hover:text-accent"}`}>
            HOME
          </Link>
          <Link href="/about" className={`font-lato text-sm font-bold tracking-wide transition-colors ${currentPage === "about" ? "text-accent" : "text-dark hover:text-accent"}`}>
            ABOUT US
          </Link>

          {/* Products dropdown */}
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className={`flex items-center gap-1.5 font-lato text-sm font-bold tracking-wide transition-colors ${currentPage === "products" ? "text-accent" : "text-dark hover:text-accent"}`}>
              PRODUCTS
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[1300px] -ml-[560px] bg-cream shadow-[0px_4px_20px_rgba(0,0,0,0.12)] pt-10 pb-10 px-[70px]">
                <div className="grid grid-cols-3 gap-x-16 gap-y-7">
                  {products.map((p) => (
                    <Link key={p.name} href="#" className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{p.icon}</span>
                      </div>
                      <span className="font-lato text-base font-medium text-gray-text group-hover/item:text-accent transition-colors">{p.name}</span>
                      <svg className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BB5A28" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="#" className={`font-lato text-sm font-bold tracking-wide uppercase transition-colors ${currentPage === "contact" ? "text-accent" : "text-dark hover:text-accent"}`}>
            Contact Us
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {[
            <svg key="s" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
            <svg key="h" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
            <svg key="u" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
            <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
          ].map((icon, i) => (
            <button key={i} className="text-dark hover:text-accent transition-colors">{icon}</button>
          ))}
          <div className="flex items-center gap-1 text-sm font-bold text-dark cursor-pointer hover:text-accent transition-colors">
            <span>USD</span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </header>
  );
}
