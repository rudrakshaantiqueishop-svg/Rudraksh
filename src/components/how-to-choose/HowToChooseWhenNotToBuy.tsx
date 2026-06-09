import Image from "next/image";

const reasons = [
  "You feel rushed or pressured",
  "Your intention isn't clear yet",
  "You're acting out of fear or anxiety",
  "You're unsure but not ready for guidance",
];

function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4.38 4.38L15.62 15.62M15.62 4.38L4.38 15.62" stroke="#BB5A28" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function HowToChooseWhenNotToBuy() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2" }}>
      <div className="htcwn-row">

        {/* Left — image */}
        <div className="htcwn-image-wrap">
          <Image
            src="/assets/images/about/about-p01-3021a5.png"
            alt="Sacred rudraksha and gemstone items"
            fill
            sizes="(max-width: 1023px) 100vw, 46vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {/* Right — content */}
        <div className="htcwn-content">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 className="font-prata htc-split-title">When Not to Buy</h2>
            <p className="font-lato htc-split-body">
              Sometimes, the right decision is to wait. We encourage you to pause if:
            </p>
          </div>

          {/* Cross list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {reasons.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CrossIcon />
                <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "160%", color: "#44403C" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="font-lato" style={{ fontSize: "15px", lineHeight: "160%", color: "#57534E" }}>
            Choosing sacred objects requires the right state of mind. Waiting is not a setback —{" "}
            it&apos;s part of the process.
          </p>
        </div>

      </div>
    </section>
  );
}
