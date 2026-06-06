import Image from "next/image";

export default function ProductGuidanceBanner() {
  return (
    <section className="pgb-section" style={{ position: "relative", width: "100%", height: "480px", overflow: "hidden" }}>
      <Image
        src="/assets/images/common/comman banner.png"
        alt="Need Product-Specific Guidance?"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        loading="lazy"
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,2,0.55)" }} />
      <div
        className="pgb-content"
        style={{ position: "absolute", left: "70px", bottom: "64px", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "460px" }}
      >
        <h2
          className="font-prata pgb-title"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "120%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}
        >
          Need Product-Specific Guidance?
        </h2>
        <p className="font-lato" style={{ fontSize: "14px", lineHeight: "160%", color: "rgba(255,255,255,0.8)", margin: 0 }}>
          If your query is about selecting the right Rudraksha or gemstone, we recommend using our dedicated guidance. This allows us to understand your context properly before suggesting anything.
        </p>
        <a
          href="#"
          className="font-lato"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "#FFFFFF", fontSize: "13px", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none", paddingBottom: "6px",
            borderBottom: "1px solid rgba(255,255,255,0.7)",
            width: "fit-content",
          }}
        >
          ASK AN EXPERT
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
