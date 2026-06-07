import Image from "next/image";

export default function ContinueWithClarity() {
  return (
    <section className="ewc-section section-pad" style={{ background: "#FEF9F2" }}>
      <div className="ewc-inner" style={{ position: "relative", width: "100%", height: "440px", overflow: "hidden" }}>
        <Image
          src="/assets/images/products/category-necklace.png"
          alt="Continue with Clarity"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          loading="lazy"
        />
        <div
          className="ewc-content"
          style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", gap: "16px", maxWidth: "520px" }}
        >
          <h2
            className="font-prata ewc-title"
            style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: "130%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}
          >
            Continue with Clarity
          </h2>
          <p className="font-lato" style={{ fontSize: "14px", lineHeight: "160%", color: "rgba(255,255,255,0.9)", margin: 0 }}>
            If you&apos;d like to explore further, these guides offer context and support—before, during, or after your decision.
          </p>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "32px" }}>
            <a
              href="/authenticity"
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
              AUTHENTICITY &amp; CERTIFICATION
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
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
              BEFORE YOU WEAR GUIDE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
