import Image from "next/image";

const helps = [
  "Know the piece is genuine",
  "Understand what has been verified",
  "Avoid misinformation or misrepresentation",
];

const doesNot = [
  "Guarantee outcomes",
  "Predict personal results",
  "Replace personal intention or practice",
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3.33 10L7.5 14.17L16.67 5" stroke="#552912" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4.38 4.38L15.62 15.62M15.62 4.38L4.38 15.62" stroke="#BB5A28" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CertificationScope() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column", gap: "48px" }}>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
        <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}>
          What Certification Does—and Does Not—Do
        </h2>
        <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", textAlign: "center", margin: 0 }}>
          Certification provides clarity, not promises.
        </p>
      </div>

      {/* Three-column row */}
      <div className="cs-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(24px, 4vw, 80px)" }}>

        {/* Left — helps you */}
        <div className="cs-panel-left" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <span className="font-lato" style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>
            Certification helps you:
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {helps.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckIcon />
                <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "160%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center — image with gradient border */}
        <div className="cs-center" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "100%", maxWidth: "360px", aspectRatio: "1", padding: "5.5%",
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
            backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box",
          }}>
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
              <Image src="/assets/images/common/common.png" alt="Certified Rudraksha" fill sizes="(max-width: 1023px) 90vw, 320px" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* Right — does not */}
        <div className="cs-panel-right" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <span className="font-lato" style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>
            Certification does not:
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {doesNot.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CrossIcon />
                <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "160%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
