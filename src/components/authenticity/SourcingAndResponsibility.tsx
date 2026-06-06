import Image from "next/image";

const responsibilityBullets = [
  "Share accurate information",
  "Be transparent about limitations",
  "Advise waiting when needed",
  "Respect your right to decide",
];

export default function SourcingAndResponsibility() {
  return (
    <section style={{ background: "#FEF9F2", padding: "70px", display: "flex", flexDirection: "column" }}>

      {/* Row 1 — Image LEFT, Text RIGHT */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>

        <div style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image
            src="/assets/images/common/common.png"
            alt="Sourcing and origin"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ marginLeft: "64px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              className="font-prata"
              style={{ fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
            >
              Sourcing &amp; Origin
            </h2>
            <p
              className="font-lato"
              style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}
            >
              Our Rudraksha and gemstones are sourced through established, responsible channels. We focus on traceability, ethical handling, and long-term relationships rather than volume. We share sourcing details where relevant, without exaggeration or unnecessary mystique.
            </p>
          </div>
        </div>

      </div>

      {/* Row 2 — Text LEFT, Image RIGHT */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "64px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              className="font-prata"
              style={{ fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
            >
              Handling with Respect
            </h2>
            <p
              className="font-lato"
              style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}
            >
              Authenticity does not end with verification. Once confirmed, each piece is handled with care and respect. Preparation and energisation are carried out thoughtfully, in alignment with traditional practices—never rushed or treated as a production step.
            </p>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image
            src="/assets/images/common/common.png"
            alt="Handling with respect"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>

      </div>

      {/* Row 3 — Image LEFT, Text RIGHT */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>

        <div style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image
            src="/assets/images/common/common.png"
            alt="Our responsibility"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ marginLeft: "64px", display: "flex", flexDirection: "column", gap: "48px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2
                className="font-prata"
                style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
              >
                Our Responsibility
              </h2>
              <p
                className="font-lato"
                style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}
              >
                We do not believe in fear-based selling or urgency-driven decisions. Our responsibility is to:
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {responsibilityBullets.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Image src="/assets/icons/Star 1.svg" alt="Star" width={20} height={20} style={{ flexShrink: 0 }} />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p
            className="font-lato"
            style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}
          >
            Trust is built through honesty, not pressure.
          </p>

          </div>
        </div>

      </div>

    </section>
  );
}
