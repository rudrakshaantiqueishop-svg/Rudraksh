import Image from "next/image";

export default function ContinueWithClarity() {
  return (
    <section className="cwc-section section-pad" style={{ background: "#FEF9F2" }}>
      <div className="cwc-inner" style={{ position: "relative", width: "100%", height: "380px", overflow: "hidden" }}>
        <Image
          src="/assets/images/common/comman banner.png"
          alt="Continue with Clarity"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,2,0.5)" }} />
        <div
          className="cwc-content"
          style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", gap: "16px", maxWidth: "520px" }}
        >
          <h2
            className="font-prata cwc-title"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: "130%", letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}
          >
            Continue with Clarity
          </h2>
          <p className="font-lato" style={{ fontSize: "14px", lineHeight: "160%", color: "rgba(255,255,255,0.85)", margin: 0 }}>
            We believe sacred objects require clarity, not urgency. If you have questions, we encourage you to ask. We are here to guide — not to persuade.
          </p>
          <a
            href="/how-to-choose"
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
            HOW TO CHOOSE GUIDE
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
