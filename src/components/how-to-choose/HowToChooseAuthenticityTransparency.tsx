import Image from "next/image";
import Link from "next/link";

const bullets = [
  { color: "#BB5A28", text: "Carefully sourced" },
  { color: "#552912", text: "Verified for authenticity" },
  { color: "#BB5A28", text: "Documented with certification" },
  { color: "#CCB26A", text: "Prepared with traditional care" },
];

export default function HowToChooseAuthenticityTransparency() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2", paddingBottom: 0, overflow: "hidden" }}>
      <div className="ab-row flex flex-col lg:flex-row items-start justify-between">

        {/* Left — text content */}
        <div className="w-full lg:w-[320px] lg:flex-shrink-0">
          <h2
            className="font-prata"
            style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: "0 0 16px 0" }}
          >
            Authenticity &amp; Transparency
          </h2>

          <p
            className="font-lato"
            style={{ fontSize: "15px", lineHeight: "160%", color: "#44403C", margin: "0 0 24px 0" }}
          >
            Every Rudraksha and gemstone we offer is:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
            {bullets.map((b) => (
              <div key={b.text} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                <span className="font-lato" style={{ fontSize: "15px", lineHeight: "150%", color: "#44403C" }}>
                  {b.text}
                </span>
              </div>
            ))}
          </div>

          <p
            className="font-lato"
            style={{ fontSize: "14px", lineHeight: "160%", color: "#78716C", margin: "0 0 32px 0" }}
          >
            You can review our verification and certification process in detail below.
          </p>

          <Link
            href="/authenticity"
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
              VIEW CERTIFICATION PROCESS
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover/cta:stroke-[#BB5A28] transition-colors" stroke="#44403C" strokeWidth="1.5">
              <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Right — two staggered images (AuthenticityBanner pattern) */}
        <div className="ab-images flex w-full lg:w-auto gap-4 lg:gap-5 items-start mt-8 lg:mt-0">
          <div className="ab-img1 flex-1 lg:flex-none lg:w-[356px] relative overflow-hidden h-[70vw] md:h-[40vw] lg:h-[560px]" style={{ marginTop: 0 }}>
            <Image
              src="/assets/images/about/about-founding-1.png"
              alt="Rudraksha mala with flowers"
              fill
              sizes="(max-width: 1024px) 50vw, 356px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="ab-img2 flex-1 lg:flex-none lg:w-[356px] relative overflow-hidden h-[70vw] md:h-[40vw] lg:h-[560px]" style={{ marginTop: "12%" }}>
            <Image
              src="/assets/images/about/about-p04.png"
              alt="Rudraksha mala on wood"
              fill
              sizes="(max-width: 1024px) 50vw, 356px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
