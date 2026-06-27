"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ShippingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h18v14H4z"/><path d="M22 12h4l4 4v6h-8V12z"/><circle cx="9" cy="23" r="2"/><circle cx="25" cy="23" r="2"/>
  </svg>
);
const ReturnIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12H22M6 12l5-5M6 12l5 5"/><path d="M26 20H10M26 20l-5-5M26 20l-5 5"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="12"/><path d="M16 9v7l4 4"/>
  </svg>
);
const CardIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="26" height="18" rx="2"/><line x1="3" y1="13" x2="29" y2="13"/>
    <circle cx="10" cy="20" r="3" fill="rgba(255,255,255,0.4)" stroke="white"/>
    <circle cx="15" cy="20" r="3" fill="rgba(255,255,255,0.2)" stroke="white"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B0404">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#0B0404" stroke="none"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B0404">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B0404">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
);

export default function Footer() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <footer>
      {/* ── 1. BENEFITS BAR ── */}
      <div className="footer-benefits h-px-section py-10 grid grid-cols-2 lg:grid-cols-4 gap-8" style={{
        background: "linear-gradient(90deg, #552912 0%, #BB5A28 100%)",
      }}>
        {[
          { Icon: ShippingIcon, title: "Free Shipping", sub: "You will love at great low prices" },
          { Icon: ReturnIcon, title: "15 Days Returns", sub: "Within 15 days for an exchange" },
          { Icon: ClockIcon, title: "Customer Support", sub: "24 hours a day, 7 days a week" },
          { Icon: CardIcon, title: "Flexible Payment", sub: "Pay with multiple credit cards" },
        ].map(({ Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-4">
            <Icon />
            <div>
              <p className="font-lato" style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.4 }}>{title}</p>
              <p className="font-lato" style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. NEWSLETTER + CONTACT + SOCIAL ── */}
      <div className="footer-mid h-px-section py-8 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 border-b border-[#E7E5E4]" style={{ background: "#FFFFFF" }}>
        {/* LEFT — Contact */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "160px" }}>
          <p className="font-lato" style={{ fontSize: "18px", fontWeight: 400, color: "#0B0404", letterSpacing: "0.05em", textTransform: "uppercase" }}>CONTACT US</p>
          <p className="font-lato" style={{ fontSize: "16px", color: "#78716C" }}>+91 8798334560</p>
        </div>

        {/* CENTER — Newsletter (bordered left+right) */}
        <div className="footer-mid-dividers w-full lg:flex-1 lg:max-w-[804px] lg:border-x lg:border-[#E7E5E4] lg:px-8 flex flex-col items-center gap-6">
          {isLoggedIn ? (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
              <h3 className="font-prata" style={{ fontSize: "36px", lineHeight: "129%", letterSpacing: "-0.02em", color: "#0B0404" }}>
                Thank You for Joining!
              </h3>
              <p className="font-lato" style={{ fontSize: "16px", color: "#78716C", textAlign: "center", maxWidth: "450px" }}>
                You&apos;ll be the first to hear about new Rudraksha arrivals, special offers, and spiritual insights.
              </p>
              <Link href="/products" style={{
                marginTop: "16px", height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: "#552912", color: "#FFFFFF", textDecoration: "none",
                padding: "0 32px", fontSize: "14px", fontWeight: 500,
                fontFamily: "var(--lato), Arial, sans-serif", letterSpacing: "0.03em"
              }}>
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3 className="font-prata" style={{ fontSize: "36px", lineHeight: "129%", letterSpacing: "-0.02em", color: "#0B0404" }}>
                  Let&apos;s Get In Touch!
                </h3>
                <p className="font-lato" style={{ fontSize: "16px", color: "#78716C", textAlign: "center" }}>
                  What&apos;s inside? Exclusive sales, new arrivals &amp; much more.
                </p>
              </div>
              {/* Email input row */}
              <div className="footer-email-wrap relative w-full lg:w-[453px]" style={{ height: "48px" }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    border: "none", borderBottom: "1px solid #E7E5E4",
                    outline: "none", fontSize: "16px", color: "#0B0404",
                    fontFamily: "var(--lato), Arial, sans-serif",
                    background: "transparent", paddingLeft: "0",
                  }}
                />
                <button style={{
                  position: "absolute", right: 0, top: 0, height: "48px",
                  background: "#552912", color: "#FFFFFF",
                  border: "none", padding: "0 24px",
                  fontSize: "14px", fontWeight: 500, cursor: "pointer",
                  fontFamily: "var(--lato), Arial, sans-serif",
                  letterSpacing: "0.03em",
                }}>
                  SIGN UP
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT — Social */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "160px" }}>
          <p className="font-lato" style={{ fontSize: "18px", fontWeight: 400, color: "#0B0404", letterSpacing: "0.05em", textTransform: "uppercase" }}>SOCIAL NETWORKS</p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {[
              { Icon: FacebookIcon, href: "https://www.facebook.com/share/1Ec8zZJbo8/" },
              { Icon: InstagramIcon, href: "https://www.instagram.com/rudrakshaantiquei?igsh=MWJlNmFiNTY4ZjV3cg==" },
              { Icon: YoutubeIcon, href: "https://youtube.com/@_lifechangingbeads?si=9HZqrn30Lkx3ea3E" }
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s" }}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM NAV BAR ── */}
      <div className="footer-bottom h-px-section py-6 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0" style={{ background: "#FFFFFF" }}>
        {/* Left nav */}
        <div className="footer-bottom-nav flex flex-wrap justify-center gap-5">
          {[
            { label: "HOME", href: "/" },
            { label: "ABOUT US", href: "/about" },
            { label: "PRODUCTS", href: "/products" },
            { label: "CONTACT US", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="font-lato" style={{ fontSize: "16px", color: "#0B0404", textDecoration: "none", fontWeight: 400, letterSpacing: "0.03em" }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/assets/images/common/logo-25e94a.png" alt="Rudraksha Antiquei" width={212} height={40} style={{ objectFit: "contain" }} />
        </Link>

        {/* Right links */}
        <div className="footer-bottom-legal flex flex-wrap justify-center gap-5">
          {["RETURNS", "TERMS & CONDITIONS", "PRIVACY POLICY"].map((label) => (
            <Link key={label} href="#" className="font-lato" style={{ fontSize: "16px", color: "#0B0404", textDecoration: "none", fontWeight: 400, letterSpacing: "0.03em" }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── 4. COPYRIGHT BAR ── */}
      <div style={{
        background: "#552912",
        padding: "16px 70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <p className="font-lato" style={{ fontSize: "16px", color: "#FFFFFF", textAlign: "center" }}>
          Copyright © 2026 Rudraksha Antiquei. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
