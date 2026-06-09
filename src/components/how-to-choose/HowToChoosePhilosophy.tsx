import Image from "next/image";

const bullets = [
  { color: "#BB5A28", text: "Authentic accuracy" },
  { color: "#552912", text: "Evidence-based knowledge" },
  { color: "#BB5A28", text: "Personalised service" },
  { color: "#CCB26A", text: "Accessible and value-driven" },
];

export default function HowToChoosePhilosophy() {
  return (
    <section className="htc-section">
      <div className="htc-philosophy-row">

        {/* Left — content */}
        <div className="htc-philosophy-content">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="font-prata htc-split-title">Our Philosophy</h2>
            <p className="font-lato htc-split-body">
              We believe that no two people are the same — and neither should their choices be. Our guidance is rooted in tradition, personalised to your life, and free from exaggerated claims.
            </p>
          </div>

          {/* Bullet list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bullets.map((b) => (
              <div key={b.text} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: b.color, flexShrink: 0,
                }} />
                <span className="font-lato" style={{ fontSize: "15px", lineHeight: "150%", color: "#44403C" }}>
                  {b.text}
                </span>
              </div>
            ))}
          </div>

          <p className="font-lato" style={{ fontSize: "13px", lineHeight: "155%", color: "#78716C" }}>
            Authentic tradition often means valuing purpose more than popular opinion.
          </p>
        </div>

        {/* Right — overlapping images with gradient border (FoundingIntention pattern) */}
        <div className="htc-overlap-wrap">
          {/* Decorative gradient border rectangle */}
          <div style={{
            position: "absolute",
            left: "15.33%", top: "15.27%",
            width: "69.5%", height: "69.45%",
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            zIndex: 0,
          }} />
          {/* Top-right image */}
          <div style={{
            position: "absolute",
            left: "20.83%", top: 0,
            width: "79.16%", height: "46.9%",
            overflow: "hidden", zIndex: 1,
          }}>
            <Image
              src="/assets/images/about/about-p02.png"
              alt="Rudraksha tradition"
              fill
              sizes="(max-width: 1023px) 79vw, 415px"
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Bottom-left image */}
          <div style={{
            position: "absolute",
            left: 0, top: "53.09%",
            width: "79.16%", height: "46.9%",
            overflow: "hidden", zIndex: 1,
          }}>
            <Image
              src="/assets/images/about/about-p04.png"
              alt="Gemstone selection"
              fill
              sizes="(max-width: 1023px) 79vw, 415px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
