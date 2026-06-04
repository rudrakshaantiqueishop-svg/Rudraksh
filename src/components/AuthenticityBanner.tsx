import Image from "next/image";
import Link from "next/link";

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1l2.39 6.26H19l-5.19 3.77 1.99 6.22L10 13.27l-5.8 3.98 1.99-6.22L1 7.26h6.61L10 1z" fill="url(#star-auth)" />
    <defs>
      <linearGradient id="star-auth" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#552912" /><stop offset="1" stopColor="#BB5A28" />
      </linearGradient>
    </defs>
  </svg>
);

const bullets = [
  "Lab-certified for authenticity",
  "Each piece comes with a unique identification",
  "Verified sourcing and quality checks",
  "Secure, tamper-proof packaging",
];

export default function AuthenticityBanner() {
  return (
    <section style={{ background: "#FEF9F2", padding: "100px 70px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>

        {/* Left — text content */}
        <div style={{ width: "320px", flexShrink: 0 }}>
          <h2
            className="font-prata"
            style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: "0 0 20px 0" }}
          >
            Authenticity You Can Trust
          </h2>

          <p
            className="font-lato"
            style={{ fontSize: "15px", lineHeight: "160%", color: "#44403C", margin: "0 0 28px 0" }}
          >
            Every Rudraksha and gemstone undergoes a thorough verification
            process to ensure its genuineness and quality.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {bullets.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <StarIcon />
                <span className="font-lato" style={{ fontSize: "14px", lineHeight: "150%", color: "#44403C" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="#"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              paddingBottom: "6px", borderBottom: "1px solid #44403C",
              textDecoration: "none",
            }}
            className="group/cta"
          >
            <span
              className="font-lato group-hover/cta:text-[#BB5A28] transition-colors"
              style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", color: "#44403C" }}
            >
              EXPLORE MORE
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover/cta:stroke-[#BB5A28] transition-colors" stroke="#44403C" strokeWidth="1.5">
              <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Right — two images side by side */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

          {/* Image 1 — starts from top */}
          <div style={{ width: "356px", height: "560px", position: "relative", overflow: "hidden", marginTop: "0" }}>
            <Image
              src="/images/about-sacred-1.png"
              alt="Rudraksha malas"
              fill
              sizes="356px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Image 2 — offset down */}
          <div style={{ width: "356px", height: "560px", position: "relative", overflow: "hidden", marginTop: "80px" }}>
            <Image
              src="/images/about-founding-2.png"
              alt="Sacred offering"
              fill
              sizes="356px"
              style={{ objectFit: "cover" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
