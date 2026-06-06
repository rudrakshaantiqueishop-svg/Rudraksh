import Image from "next/image";

export default function StillHaveQuestions() {
  return (
    <section style={{ position: "relative", width: "100%", height: "480px", overflow: "hidden" }}>
      <Image
        src="/assets/images/common/comman banner.png"
        alt="Still Have Questions?"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
      <div style={{
        position: "absolute",
        left: "70px", bottom: "64px",
        display: "flex", flexDirection: "column", gap: "16px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}>
            Still Have Questions?
          </h2>
          <p className="font-lato" style={{ fontSize: "14px", lineHeight: "150%", color: "rgba(255,255,255,0.85)", margin: 0 }}>
            If you&apos;d like clarity or guidance, we&apos;re here to help—without obligation.
          </p>
        </div>
        <a href="#" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#FFFFFF", fontFamily: "var(--lato), Arial, sans-serif",
          fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em",
          textDecoration: "none", textTransform: "uppercase",
          paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.7)",
          width: "fit-content",
        }}>
          SPEAK WITH AN EXPERT
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
