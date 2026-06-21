import Image from "next/image";

export default function StillUnsure() {
  return (
    <section style={{ position: "relative", width: "100%", height: "380px", overflow: "hidden" }}>
      <Image
        src="/assets/images/common/common.png"
        alt="Still unsure?"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        loading="lazy"
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      <div style={{
        position: "absolute",
        left: "64px", top: "50%", transform: "translateY(-50%)",
        width: "460px",
        display: "flex", flexDirection: "column", gap: "24px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h2 className="font-prata" style={{ fontSize: "32px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}>
            Still Unsure?
          </h2>
          <p className="font-lato" style={{ fontSize: "14px", lineHeight: "160%", color: "#E7E5E4", margin: 0 }}>
            If you have questions or feel uncertain, guidance is always available. There is no expectation to proceed.
          </p>
        </div>
        <a href="/consultation" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#FFFFFF", fontFamily: "var(--lato), Arial, sans-serif",
          fontSize: "14px", fontWeight: 500, letterSpacing: "0.06em",
          textDecoration: "none", textTransform: "uppercase",
          paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.6)",
          width: "fit-content",
        }}>
          ASK AN EXPERT
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
