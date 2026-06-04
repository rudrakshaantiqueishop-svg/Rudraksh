import Image from "next/image";
import Link from "next/link";



const features = [
  ["Ethically sourced materials", "Lab-certified authenticity"],
  ["Energised as per Vedic rituals", "Expert guidance available"],
];

export default function WhoWeAre() {
  return (
    <section style={{ background: "#FEF9F2", padding: "100px 70px" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

        {/* Left image */}
        <div style={{ flex: "0 0 50%", height: "600px", overflow: "hidden", position: "relative" }}>
          <Image
            src="/images/who-we-are.png"
            alt="Who are we"
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>

        {/* Right content */}
        <div style={{ flex: 1, paddingLeft: "64px", display: "flex", flexDirection: "column", gap: "48px" }}>

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
                <div key={ri} style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
                  {row.map((label) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "16px", width: "260px" }}>
                      <Image src="/images/icons/Star 1.svg" alt="Star" width={20} height={20} style={{ flexShrink: 0 }} />
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
      </div>
    </section>
  );
}
