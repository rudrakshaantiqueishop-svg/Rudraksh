import Image from "next/image";

const doesNotBullets = [
  "Guarantee outcomes",
  "Replace personal intention or effort",
  "Instantly change life circumstances",
  "Act as a solution on its own",
];

export default function WhatEnergisationDoesNot() {
  return (
    <section className="wedn-section section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column" }}>

      {/* Row 1 — Image LEFT, Text RIGHT */}
      <div className="wedn-row" style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        <div className="wedn-img" style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image src="/assets/images/common/common.png" alt="What energisation does not do" fill sizes="(max-width: 1023px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wedn-text" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className="wedn-text-inner" style={{ marginLeft: "64px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 className="font-prata" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                What Energisation Does Not Do
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
                Energisation does not:
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {doesNotBullets.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Image src="/assets/icons/Star 1.svg" alt="Star" width={20} height={20} style={{ flexShrink: 0 }} />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
              It is a supportive step—not a promise.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2 — Text LEFT, Image RIGHT */}
      <div className="wedn-row wedn-row-reverse" style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        <div className="wedn-text" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className="wedn-text-inner" style={{ marginRight: "64px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 className="font-prata" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              Choice and Consent
            </h2>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
              Energisation is always optional. We do not apply it automatically. We do not imply that a product is incomplete without it. The choice is yours—and respected fully.
            </p>
          </div>
        </div>
        <div className="wedn-img" style={{ flex: 1, minHeight: "700px", position: "relative", overflow: "hidden" }}>
          <Image src="/assets/images/common/common.png" alt="Choice and consent" fill sizes="(max-width: 1023px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
      </div>

    </section>
  );
}
