import Image from "next/image";

const reasons = [
  "Random online recommendations",
  "Social media trends",
  "Fear-driven advice",
  "One-size-fits-all claims",
];

export default function HowToChooseConfusion() {
  return (
    <section className="htc-section">
      <div className="htc-confusion-row">

        {/* Left — decorative framed image (WhenGuidanceBecomesHelpful pattern) */}
        <div className="htc-frame-wrap">
          {/* Top-left outline rectangle */}
          <div style={{
            position: "absolute", left: 0, top: 0,
            width: "63%", height: "65%",
            border: "3px solid #552912",
            zIndex: 0,
          }} />
          {/* Bottom-right outline rectangle */}
          <div style={{
            position: "absolute", right: 0, bottom: 0,
            width: "63%", height: "65%",
            border: "3px solid #BB5A28",
            zIndex: 0,
          }} />
          {/* Main photo — inset over the corner frames */}
          <div style={{
            position: "absolute",
            left: "12.5%", top: "10%",
            width: "82%", height: "80%",
            overflow: "hidden", zIndex: 1,
          }}>
            <Image
              src="/assets/images/about/about-p03.png"
              alt="Rudraksha selection"
              fill
              sizes="(max-width: 1023px) 82vw, 430px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right — content */}
        <div className="htc-confusion-content">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="font-prata htc-split-title">
              Why Most People End Up Confused
            </h2>
            <p className="font-lato htc-split-body">
              Many people select Rudraksha or gemstones based on incomplete or misleading information, such as:
            </p>
          </div>

          {/* 2×2 checklist with ? icon */}
          <div className="htc-checklist">
            {reasons.map((r) => (
              <div key={r} className="htc-check-item">
                <span style={{
                  flexShrink: 0, width: "20px", height: "20px",
                  borderRadius: "50%", border: "1.5px solid #BB5A28",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 600, color: "#BB5A28",
                  fontFamily: "Georgia, serif",
                }}>?</span>
                <span className="font-lato htc-check-text">{r}</span>
              </div>
            ))}
          </div>

          <p className="font-lato htc-split-body">
            Without proper context, this often leads to doubt or disappointment — not because the stones lack value, but because the choice wasn&apos;t aligned with the individual.
          </p>
        </div>

      </div>
    </section>
  );
}
