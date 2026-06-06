import Image from "next/image";
import Link from "next/link";



const features = [
  ["Ethically sourced materials", "Lab-certified authenticity"],
  ["Energised as per Vedic rituals", "Expert guidance available"],
];

export default function WhoWeAre() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2" }}>
      <div className="wwa-row flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0">

        {/* Right content — rendered first so it appears on top on mobile */}
        <div className="wwa-content flex-1 flex flex-col lg:pt-0 lg:pl-16" style={{ gap: "32px" }}>

          {/* Text + icon list block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Title + description */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2
                className="font-prata"
                style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
              >
                Who Are We?
              </h2>
              <p
                className="font-lato"
                style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0 }}
              >
                Rooted in ancient Vedic wisdom, our work brings together traditional spiritual practices and modern standards of authenticity. Each Rudraksha and gemstone is chosen with care, tested for genuineness, and prepared with intention — ensuring you receive pieces that are true, pure, and meaningful.
              </p>
            </div>

            {/* Feature rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {features.map((row, ri) => (
                <div key={ri} className="flex flex-col sm:flex-row gap-4">
                  {row.map((label) => (
                    <div key={label} className="flex items-center gap-3 min-w-0">
                      <Image src="/assets/icons/Star 1.svg" alt="Star" width={20} height={20} style={{ flexShrink: 0 }} />
                      <span
                        className="font-lato"
                        style={{ fontSize: "16px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/about"
            style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              paddingBottom: "8px", borderBottom: "1px solid #552912",
              width: "fit-content", textDecoration: "none",
            }}
          >
            <span
              className="font-lato"
              style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", color: "#552912" }}
            >
              EXPLORE ABOUT US
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 7L7 17" stroke="#552912" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 7H17V16" stroke="#552912" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

        </div>

        {/* Image — below text on mobile, left on desktop */}
        <div className="wwa-img w-full lg:flex-none lg:w-1/2 flex-shrink-0 lg:order-first" style={{ height: "clamp(260px, 55vw, 600px)", overflow: "hidden", position: "relative" }}>
          <Image
            src="/assets/images/about/who-we-are.png"
            alt="Who are we"
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
    </section>
  );
}
