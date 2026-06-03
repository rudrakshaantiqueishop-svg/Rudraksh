import Image from "next/image";

export default function StillHaveQuestions() {
  return (
    <section style={{ position: "relative", width: "100%", height: "600px", overflow: "hidden" }}>
      <Image
        src="/images/still-have-questions.png"
        alt="Still have questions?"
        fill
        sizes="100vw"
        style={{ objectFit: "fill", objectPosition: "center 40%" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div style={{
        position: "absolute",
        left: "64px", top: "50%", transform: "translateY(-50%)",
        width: "650px",
        display: "flex", flexDirection: "column", gap: "32px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#FFFFFF" }}>
            Still Have Questions?
          </h2>
          <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#E7E5E4" }}>
            If you would like guidance before choosing a Rudraksha or gemstone, our team is available — without pressure.
          </p>
        </div>
        <a href="#" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#FFFFFF", fontFamily: "var(--lato), Arial, sans-serif",
          fontSize: "16px", fontWeight: 500, letterSpacing: "0.06em",
          textDecoration: "none", textTransform: "uppercase",
          paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.6)",
          width: "fit-content",
        }}>
          ASK AN EXPERT
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
