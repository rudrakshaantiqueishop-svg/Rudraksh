import Image from "next/image";

export default function LookingForMoreGuidance() {
  return (
    <section className="lfmg-section section-pad" style={{ background: "#FEF9F2" }}>
      <div className="lfmg-banner" style={{ position: "relative", width: "100%", height: "480px", overflow: "hidden" }}>
        <Image
          src="/assets/images/about/about-sacred-1.png"
          alt="Looking for more guidance?"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          loading="lazy"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,4,4,0.6) 0%, rgba(11,4,4,0.2) 50%, rgba(11,4,4,0) 75%)" }} />
        <div style={{
          position: "absolute",
          left: "48px", top: "50%", transform: "translateY(-50%)",
          width: "420px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="font-prata" style={{ fontSize: "28px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}>
              Looking for more guidance?
            </h2>
            <p className="font-lato" style={{ fontSize: "14px", lineHeight: "160%", color: "#E7E5E4", margin: 0 }}>
              If you prefer understanding before ownership, we encourage you to begin with a conversation.
            </p>
          </div>
          <a href="#consultation-form" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "#FFFFFF", fontFamily: "var(--lato), Arial, sans-serif",
            fontSize: "14px", fontWeight: 500, letterSpacing: "0.06em",
            textDecoration: "none", textTransform: "uppercase",
            paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.6)",
            width: "fit-content",
          }}>
            BOOK YOUR CONSULTATION
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
