import Image from "next/image";

const steps = [
  { step: "Sourcing", desc: "Selected through trusted and traceable channels." },
  { step: "Physical Examination", desc: "Manually inspected for natural formation and structural integrity." },
  { step: "Scientific Testing", desc: "Non-destructive testing methods, including imaging where required." },
  { step: "Mukhi Verification\n(for Rudraksha)", desc: "Confirmed through detailed inspection and technical methods." },
  { step: "Documentation &\nCertification", desc: "Certification is prepared before listing or dispatch." },
];

export default function WhatHappens() {
  return (
    <section className="wh-section" style={{ background: "#FFF5E6", position: "relative", overflow: "hidden" }}>
      {/* Leaf — bottom left */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "382px", height: "260px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/common/leaf.svg" alt="" fill style={{ objectFit: "contain", objectPosition: "bottom left" }} />
      </div>
      {/* Leaf — top right, mirrored */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "382px", height: "260px", pointerEvents: "none", zIndex: 0, transform: "rotate(180deg)" }}>
        <Image src="/assets/images/common/leaf.svg" alt="" fill style={{ objectFit: "contain", objectPosition: "bottom left" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="font-prata wh-heading" style={{
          lineHeight: "140%", letterSpacing: "-0.02em",
          color: "#0B0404", textAlign: "center",
        }}>
          What Happens Before a Product Is Offered
        </h2>
        <p className="font-lato wh-subhead" style={{
          fontSize: "16px", color: "#44403C", textAlign: "center", lineHeight: "150%",
        }}>
          Every Rudraksha and gemstone goes through a structured process:
        </p>

        {/* Steps */}
        <div className="wh-steps">
          {steps.map((s, i) => (
            <div key={i} className="wh-step-wrap">
              <div className="wh-step-inner">
                <div style={{
                  width: "70px", height: "70px", borderRadius: "99px",
                  background: "linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Image src="/assets/icons/Star.svg" alt="step" width={20} height={19} />
                </div>
                <p className="font-prata" style={{
                  fontSize: "16px", color: "#552912", textAlign: "center",
                  textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: "140%",
                  whiteSpace: "pre-line", width: "100%", maxWidth: "180px",
                }}>
                  {s.step}
                </p>
                <p className="font-lato" style={{
                  fontSize: "14px", fontWeight: 500, color: "#44403C",
                  textAlign: "center", lineHeight: "140%", maxWidth: "180px",
                }}>
                  {s.desc}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="wh-arrow">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M7 17h20M21 10l7 7-7 7" stroke="#BB5A28" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="font-lato wh-footer" style={{
          textAlign: "center", fontSize: "15px",
          color: "#44403C", lineHeight: "150%", letterSpacing: "0.01em",
        }}>
          Only verified pieces are offered. Verification always precedes presentation.
        </p>
      </div>
    </section>
  );
}
