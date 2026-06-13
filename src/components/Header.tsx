"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown, Plus, Minus } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import { useCurrency } from "@/components/CurrencyProvider";
import { CurrencyCode } from "@/lib/currency";

const CURRENCY_OPTIONS: CurrencyCode[] = ["USD", "INR"];

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
  { name: "Authenticity & Certification", href: "/authenticity" },
  { name: "Energisation Process", href: "/energisation-process" },
  { name: "How to Choose", href: "/how-to-choose" },
  { name: "Blogs", href: "/blog" },
  { name: "Testimonial", href: "/testimonial" },
];

export default function Header({ activePage }: { activePage?: string }) {
  const pathname = usePathname();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const accountHref = isLoggedIn ? "/account" : "/login";
  const currentPage = activePage ?? (pathname === "/" ? "home" : pathname === "/about" ? "about" : pathname === "/contact" ? "contact" : pathname?.startsWith("/products") ? "products" : "home");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false); // Default open in mobile as per image

  const [isVisible, setIsVisible] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileCurrencyOpen, setIsMobileCurrencyOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > 50 && currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setActiveDropdown(null); // Close dropdown if scrolling down
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-[#FEF9F2] transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`} style={{ borderBottom: activeDropdown ? "none" : "1px solid rgba(0,0,0,0.05)" }}>
      {/* Main bar */}
      <div className="flex items-center justify-between h-px-section" style={{ height: "72px", paddingTop: 0, paddingBottom: 0 }}>

        {/* Hamburger — mobile only */}
        <button
          className="header-hamburger hidden items-center justify-center p-2 -ml-2 text-[#0B0404]"
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} strokeWidth={1.5} />
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
              <ChevronDown
                size={15}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180" : ""}`}
              />

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
            <div
              className={`relative flex items-center gap-2 font-lato text-base font-normal h-full transition-colors cursor-pointer ${activeDropdown === "products" || currentPage === "products" ? "text-[#BB5A28]" : "text-[#0B0404] hover:text-[#BB5A28]"}`}
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/products" className="flex items-center h-full">
                PRODUCTS
              </Link>
              <ChevronDown
                size={15}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180" : ""}`}
              />
            </div>

            <Link href="/contact" className={`font-lato text-base font-normal flex items-center h-full uppercase transition-colors ${currentPage === "contact" ? "text-[#BB5A28]" : "text-[#0B0404] hover:text-[#BB5A28]"}`}>
              CONTACT US
            </Link>

          </nav>
        </div>

        {/* Right actions — desktop */}
        <div className="header-actions-desktop flex items-center gap-6">
          {[
            <Search key="search" size={24} strokeWidth={1.5} />,
            <Heart key="heart" size={24} strokeWidth={1.5} />,
            <ShoppingCart key="cart" size={24} strokeWidth={1.5} />,
          ].map((icon, i) => (
            <button key={i} className="text-[#44403C] hover:text-[#BB5A28] transition-colors">{icon}</button>
          ))}
          {isLoggedIn ? (
            <Link href={accountHref} className="text-[#44403C] hover:text-[#BB5A28] transition-colors" aria-label="My Account">
              <User size={24} strokeWidth={1.5} />
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-[#44403C] hover:text-[#BB5A28] transition-colors"
              aria-label="Sign in"
            >
              <User size={24} strokeWidth={1.5} />
            </button>
          )}
          <div
            className="relative flex items-center gap-1 font-lato text-base text-[#44403C] cursor-pointer hover:text-[#BB5A28] transition-colors"
            onMouseEnter={() => setIsCurrencyOpen(true)}
            onMouseLeave={() => setIsCurrencyOpen(false)}
          >
            <span>{currency}</span>
            <ChevronDown size={15} strokeWidth={1.5} className={`transition-transform duration-200 ${isCurrencyOpen ? "rotate-180" : ""}`} />

            {isCurrencyOpen && (
              <div
                className="absolute right-0 top-full bg-[#FEF9F2] flex flex-col min-w-[80px] py-2 rounded-md z-50"
                style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
              >
                {CURRENCY_OPTIONS.map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setIsCurrencyOpen(false);
                    }}
                    className={`px-4 py-2 text-left font-lato text-sm transition-colors hover:bg-black/5 hover:text-[#BB5A28] ${currency === code ? "text-[#BB5A28] font-medium" : "text-[#44403C]"}`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right actions — mobile only (search, heart, cart) */}
        <div className="header-actions-mobile hidden items-center gap-4">
          {[
            <Search key="s" size={20} strokeWidth={1.5} />,
            <Heart key="h" size={20} strokeWidth={1.5} />,
            <ShoppingCart key="c" size={20} strokeWidth={1.5} />,
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
                      <Image src={item.icon} alt={item.name} width={24} height={24} style={{ width: "auto", height: "auto" }} />
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#FEF9F2] overflow-y-auto pb-8 md:hidden">
          {/* Top Bar matching image */}
          <div className="flex items-center justify-between px-4 border-b border-black/5" style={{ height: "72px" }}>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 -ml-1 text-[#0B0404]" aria-label="Close menu">
                <X size={22} strokeWidth={1.5} />
              </button>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/assets/images/common/logo.png" alt="Rudraksha Antiquei" width={160} height={30} style={{ objectFit: "contain", height: "28px", width: "auto" }} />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {[
                <Search key="s" size={20} strokeWidth={1.5} />,
                <Heart key="h" size={20} strokeWidth={1.5} />,
                <ShoppingCart key="c" size={20} strokeWidth={1.5} />,
              ].map((icon, i) => (
                <button key={i} className="text-[#0B0404]">{icon}</button>
              ))}
            </div>
          </div>

          <div className="px-6 py-6 flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-[#78716C] font-lato text-[13px] tracking-wide">
              <div className="flex justify-between items-center">
                <span>CURRENCY</span>
                <button
                  className="flex items-center gap-1 text-[#0B0404] font-medium"
                  onClick={() => setIsMobileCurrencyOpen((open) => !open)}
                >
                  <span>{currency}</span>
                  <ChevronDown size={12} strokeWidth={1.5} className={`transition-transform duration-200 ${isMobileCurrencyOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {isMobileCurrencyOpen && (
                <div className="flex gap-3 self-end">
                  {CURRENCY_OPTIONS.map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsMobileCurrencyOpen(false);
                      }}
                      className={`px-3 py-1 rounded-full border font-lato text-[13px] transition-colors ${currency === code ? "border-[#BB5A28] text-[#BB5A28]" : "border-black/10 text-[#44403C]"}`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <Link href={accountHref} className="font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                PROFILE
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase text-left"
              >
                SIGN IN
              </button>
            )}

            <Link href="/" className="font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase" onClick={() => setIsMobileMenuOpen(false)}>
              HOME
            </Link>

            <Link href="/about" className="font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase" onClick={() => setIsMobileMenuOpen(false)}>
              ABOUT US
            </Link>

            <Link href="/how-to-choose" className="font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase pl-4" onClick={() => setIsMobileMenuOpen(false)}>
              HOW TO CHOOSE
            </Link>

            <Link href="/blog" className="font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase pl-4" onClick={() => setIsMobileMenuOpen(false)}>
              BLOGS
            </Link>

            <div className="flex flex-col">
              <div className="flex justify-between items-center font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase">
                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                  PRODUCTS
                </Link>
                <button
                  aria-label="Toggle products menu"
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                >
                  {isMobileProductsOpen ? (
                    <Minus size={16} strokeWidth={1.5} />
                  ) : (
                    <Plus size={16} strokeWidth={1.5} />
                  )}
                </button>
              </div>

              {isMobileProductsOpen && (
                <div className="flex flex-col gap-6 mt-6 pl-4">
                  {productColumns.flat().map((item) => (
                    <Link
                      key={item.name}
                      href="#"
                      className="flex items-center gap-4 text-decoration-none group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#BB5A28]/10 flex items-center justify-center shrink-0">
                        <Image src={item.icon} alt={item.name} width={22} height={22} style={{ width: "auto", height: "auto" }} />
                      </div>
                      <span className="font-lato font-normal text-[#44403C] text-[15px] group-hover:text-[#BB5A28] transition-colors">
                        {item.name}
                      </span>
                      <div className="ml-auto flex-shrink-0 opacity-50">
                        <Image src="/assets/icons/icon-arrow.svg" alt="" width={20} height={20} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/contact" className="font-lato font-medium text-[#0B0404] text-[15px] tracking-wide uppercase mt-2" onClick={() => setIsMobileMenuOpen(false)}>
              CONTACT US
            </Link>
          </div>
        </div>
      )}

      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
}
