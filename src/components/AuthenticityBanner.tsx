import Image from "next/image";
import Link from "next/link";


const bullets = [
  "Lab-certified for authenticity",
  "Each piece comes with a unique identification",
  "Verified sourcing and quality checks",
  "Secure, tamper-proof packaging",
];

export default function AuthenticityBanner() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2", paddingBottom: 0, overflow: "hidden" }}>
      <div className="ab-row flex flex-col lg:flex-row items-start justify-between">

        {/* Left — text content */}
        <div className="w-full lg:w-[320px] lg:flex-shrink-0">
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
                <Image src="/assets/icons/Star 1.svg" alt="Star" width={20} height={20} style={{ flexShrink: 0 }} />
                <span className="font-lato" style={{ fontSize: "14px", lineHeight: "150%", color: "#44403C" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>

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
              EXPLORE MORE
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover/cta:stroke-[#BB5A28] transition-colors" stroke="#44403C" strokeWidth="1.5">
              <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Right — two images side by side */}
        <div className="ab-images flex w-full lg:w-auto gap-4 lg:gap-5 items-start mt-8 lg:mt-0">

          {/* Image 1 — starts from top */}
          <div className="ab-img1 flex-1 lg:flex-none lg:w-[356px] relative overflow-hidden h-[70vw] md:h-[40vw] lg:h-[560px]" style={{ marginTop: 0 }}>
            <Image
              src="/assets/images/about/about-sacred-1.png"
              alt="Rudraksha malas"
              fill
              sizes="(max-width: 1024px) 50vw, 356px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Image 2 — offset down */}
          <div className="ab-img2 flex-1 lg:flex-none lg:w-[356px] relative overflow-hidden h-[70vw] md:h-[40vw] lg:h-[560px]" style={{ marginTop: "12%" }}>
            <Image
              src="/assets/images/about/about-founding-2.png"
              alt="Sacred offering"
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
