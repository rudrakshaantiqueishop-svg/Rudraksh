import Image from "next/image";

const responsibilityBullets = [
  "Share accurate information",
  "Be transparent about limitations",
  "Advise waiting when needed",
  "Respect your right to decide",
];

export default function SourcingAndResponsibility() {
  return (
    <section className="sar-section section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column" }}>

      {/* Row 1 — Image LEFT, Text RIGHT */}
      <div className="sar-row" style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        <div className="sar-img" style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image src="/assets/images/common/common.png" alt="Sourcing and origin" fill sizes="(max-width: 1023px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="sar-text" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className="sar-text-inner" style={{ marginLeft: "64px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="font-prata" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              Sourcing &amp; Origin
            </h2>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
              Our Rudraksha and gemstones are sourced through established, responsible channels. We focus on traceability, ethical handling, and long-term relationships rather than volume. We share sourcing details where relevant, without exaggeration or unnecessary mystique.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2 — Text LEFT, Image RIGHT */}
      <div className="sar-row sar-row-reverse" style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        <div className="sar-text" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className="sar-text-inner" style={{ marginRight: "64px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="font-prata" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              Handling with Respect
            </h2>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
              Authenticity does not end with verification. Once confirmed, each piece is handled with care and respect. Preparation and energisation are carried out thoughtfully, in alignment with traditional practices—never rushed or treated as a production step.
            </p>
          </div>
        </div>
        <div className="sar-img" style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image src="/assets/images/common/common.png" alt="Handling with respect" fill sizes="(max-width: 1023px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
      </div>

      {/* Row 3 — Image LEFT, Text RIGHT */}
      <div className="sar-row" style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        <div className="sar-img" style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image src="/assets/images/common/common.png" alt="Our responsibility" fill sizes="(max-width: 1023px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="sar-text" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className="sar-text-inner" style={{ marginLeft: "64px", display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h2 className="font-prata" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                  Our Responsibility
                </h2>
                <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
                  We do not believe in fear-based selling or urgency-driven decisions. Our responsibility is to:
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {responsibilityBullets.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Image src="/assets/icons/Star 1.svg" alt="Star" width={20} height={20} style={{ flexShrink: 0 }} />
                    <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
              Trust is built through honesty, not pressure.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
