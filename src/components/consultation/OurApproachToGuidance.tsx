import Image from "next/image";

const principles = [
  "No exaggerated claims",
  "Recommendations only when appropriate",
  "Authentic Rudraksha and certified gemstones",
  "Clear explanation before purchase",
];

export default function OurApproachToGuidance() {
  return (
    <section className="oatg-section section-pad" style={{ background: "#FEF9F2" }}>
      <div className="oatg-row" style={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: "64px", height: "652px" }}>

        {/* Left – image */}
        <div className="oatg-img" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Image src="/assets/images/about/about-sacred-2.png" alt="Our approach to guidance" fill sizes="(max-width: 1023px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>

        {/* Right – text */}
        <div className="oatg-text" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                Our Approach to Guidance
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
                We follow a disciplined and responsible approach:
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {principles.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Image src="/assets/icons/Star 1.svg" alt="Star" width={18} height={18} style={{ flexShrink: 0 }} />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>

            <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "160%", margin: 0 }}>
              We believe sacred objects should not be prescribed casually. Every recommendation must be aligned with chart indication and individual context. Consultation is meant to clarify — not to persuade.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
