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
    <section style={{ background: "#FFF5E7", padding: "100px 70px", display: "flex", flexDirection: "column", gap: "48px" }}>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h2
          className="font-prata"
          style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}
        >
          How to Identify Reliable Certification
        </h2>
        <p
          className="font-lato"
          style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", textAlign: "center", margin: 0 }}
        >
          A real certificate informs—it does not impress.
        </p>
      </div>

      {/* Rows container */}
      <div style={{ display: "flex", flexDirection: "column", gap: "48px", maxWidth: "940px", width: "100%", margin: "0 auto" }}>

        {/* Row 1 — text LEFT, image RIGHT, vertically centered */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "100px" }}>

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

          <div style={{ flexShrink: 0, width: "420px", height: "320px", position: "relative", overflow: "hidden" }}>
            <Image src="/assets/images/common/common.png" alt="Trustworthy certification" fill sizes="420px" style={{ objectFit: "cover" }} />
          </div>

        </div>

        {/* Row 2 — image LEFT, text RIGHT, center-aligned */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "100px" }}>

          <div style={{ flexShrink: 0, width: "420px", height: "320px", position: "relative", overflow: "hidden" }}>
            <Image src="/assets/images/common/common.png" alt="Caution certificates" fill sizes="420px" style={{ objectFit: "cover" }} />
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
