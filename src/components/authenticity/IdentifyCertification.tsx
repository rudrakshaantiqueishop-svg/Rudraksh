import Image from "next/image";

const trustworthyItems = [
  "Clearly mention the verification method",
  "Describe what has been tested",
  "Avoid vague spiritual claims",
  "Be specific, not generic",
];

const cautionItems = [
  "Promise results or powers",
  "Use decorative language instead of facts",
  "Do not explain how authenticity was verified",
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.5 8L6.5 12L13.5 4" stroke="#552912" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="#BB5A28" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function IdentifyCertification() {
  return (
    <section className="ic-section" style={{ background: "#FFF5E7", padding: "100px 70px", display: "flex", flexDirection: "column", gap: "48px" }}>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}>
          How to Identify Reliable Certification
        </h2>
        <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", textAlign: "center", margin: 0 }}>
          A real certificate informs—it does not impress.
        </p>
      </div>

      {/* Rows container */}
      <div style={{ display: "flex", flexDirection: "column", gap: "48px", maxWidth: "940px", width: "100%", margin: "0 auto" }}>

        {/* Row 1 — text LEFT, image RIGHT */}
        <div className="ic-row ic-row-reverse" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(32px, 6vw, 100px)" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>
              A trustworthy certification should:
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {trustworthyItems.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckIcon />
                  <span className="font-lato" style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ic-img" style={{ flex: 1, width: "100%", maxWidth: "420px", aspectRatio: "420 / 320", position: "relative", overflow: "hidden" }}>
            <Image src="/assets/images/common/common.png" alt="Trustworthy certification" fill sizes="(max-width: 767px) 100vw, 420px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Row 2 — image LEFT, text RIGHT */}
        <div className="ic-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(32px, 6vw, 100px)" }}>
          <div className="ic-img ic-img-left" style={{ flex: 1, width: "100%", maxWidth: "420px", aspectRatio: "420 / 320", position: "relative", overflow: "hidden" }}>
            <Image src="/assets/images/common/common.png" alt="Caution certificates" fill sizes="(max-width: 767px) 100vw, 420px" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>
              Be cautious of certificates that:
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {cautionItems.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CrossIcon />
                  <span className="font-lato" style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
