import Image from "next/image";

const steps = [
  { step: "Sourcing", desc: "Selected through trusted and traceable channels." },
  { step: "Physical Examination", desc: "Manually inspected for natural formation and structural integrity." },
  { step: "Scientific Testing", desc: "Non-destructive testing methods, including imaging where required." },
  { step: "Mukhi Verification\n(for Rudraksha)", desc: "Confirmed through detailed inspection and technical methods." },
  { step: "Documentation &\nCertification", desc: "Certification is prepared before listing or dispatch." },
];

const ArrowIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ flexShrink: 0, marginTop: "18px" }}>
    <path d="M7 17h20M21 10l7 7-7 7" stroke="#BB5A28" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WhatHappens() {
  return (
    <section style={{ background: "#FFF5E6", padding: "100px 70px", position: "relative", overflow: "hidden" }}>
      {/* Leaf background — bottom left */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "382px", height: "260px",
        pointerEvents: "none", zIndex: 0,
      }}>
        <Image
          src="/images/leaf.svg"
          alt=""
          fill
          style={{ objectFit: "contain", objectPosition: "bottom left" }}
        />
      </div>

      {/* Leaf background — top right, mirrored */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "382px", height: "260px",
        pointerEvents: "none", zIndex: 0,
        transform: "rotate(180deg)",
      }}>
        <Image
          src="/images/leaf.svg"
          alt=""
          fill
          style={{ objectFit: "contain", objectPosition: "bottom left" }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <h2 className="font-prata" style={{
          fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em",
          color: "#0B0404", textAlign: "center", marginBottom: "8px",
        }}>
          What Happens Before a Product Is Offered
        </h2>
        <p className="font-lato" style={{
          fontSize: "16px", color: "#44403C", textAlign: "center",
          marginBottom: "80px", lineHeight: "150%",
        }}>
          Every Rudraksha and gemstone goes through a structured process:
        </p>

        {/* Steps row */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
              {/* Icon box */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", flex: 1 }}>
                {/* Gradient circle with star icon */}
                <div style={{
                  width: "70px", height: "70px", borderRadius: "99px",
                  background: "linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Image
                    src="/images/icons/Star.svg"
                    alt="step"
                    width={20}
                    height={19}
                  />
                </div>

                {/* Step name */}
                <p className="font-prata" style={{
                  fontSize: "16px", color: "#552912", textAlign: "center",
                  textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: "140%",
                  whiteSpace: "pre-line", width: "130px",
                }}>
                  {s.step}
                </p>

                {/* Step description */}
                <p className="font-lato" style={{
                  fontSize: "14px", fontWeight: 500, color: "#44403C",
                  textAlign: "center", lineHeight: "140%", maxWidth: "180px",
                }}>
                  {s.desc}
                </p>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && <ArrowIcon />}
            </div>
          ))}
        </div>

        {/* Footer quote */}
        <p className="font-lato" style={{
          marginTop: "60px", textAlign: "center", fontSize: "15px",
          color: "#44403C", lineHeight: "150%", letterSpacing: "0.01em",
        }}>
          Only verified pieces are offered. Verification always precedes presentation.
        </p>
      </div>
    </section>
  );
}
