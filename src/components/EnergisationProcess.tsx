import Image from "next/image";
import Link from "next/link";

const steps = [
  { label: "STEP 1", desc: "Careful selection of authentic material" },
  { label: "STEP 2", desc: "Purification using traditional methods" },
  { label: "STEP 3", desc: "Energisation through Vedic rituals & mantras" },
  { label: "STEP 4", desc: "Final inspection & blessing" },
  { label: "STEP 5", desc: "Delivered ready to wear or use" },
];



export default function EnergisationProcess() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2" }}>

      {/* Heading */}
      <h2
        className="font-prata"
        style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: "0 0 12px 0" }}
      >
        Our Energisation Process
      </h2>
      <p
        className="font-lato"
        style={{ fontSize: "16px", color: "#44403C", textAlign: "center", lineHeight: "150%", margin: "0 0 64px 0", maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}
      >
        Each piece is prepared through a mindful, step-by-step ritual process to honour its spiritual significance.
      </p>

      {/* Steps row */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start mb-14 gap-6 lg:gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col lg:flex-row items-center lg:items-start flex-1 w-full lg:w-auto">
            {/* Step content */}
            <div className="flex flex-col items-center gap-4 flex-1">
              {/* Gradient circle */}
              <div style={{
                width: "70px", height: "70px", borderRadius: "50%",
                background: "linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Image src="/assets/icons/Star.svg" alt="step" width={20} height={20} />
              </div>

              {/* Step label */}
              <p
                className="font-prata"
                style={{ fontSize: "14px", color: "#552912", textAlign: "center", letterSpacing: "0.06em", lineHeight: "140%", margin: 0 }}
              >
                {s.label}
              </p>

              {/* Description */}
              <p
                className="font-lato"
                style={{ fontSize: "14px", fontWeight: 400, color: "#44403C", textAlign: "center", lineHeight: "150%", maxWidth: "160px", margin: 0 }}
              >
                {s.desc}
              </p>
            </div>

            {/* Arrow between steps */}
            {i < steps.length - 1 && (
              <span className="flex-shrink-0 mt-4 lg:mt-[18px] transform rotate-90 lg:rotate-0">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M7 17h20M21 10l7 7-7 7" stroke="#BB5A28" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
          href="#"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            paddingBottom: "6px", borderBottom: "1px solid #44403C",
            textDecoration: "none",
          }}
          className="group/cta"
        >
          <span
            className="font-lato group-hover/cta:text-[#BB5A28] transition-colors"
            style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", color: "#44403C" }}
          >
            EXPLORE MORE
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover/cta:stroke-[#BB5A28] transition-colors" stroke="#44403C" strokeWidth="1.5">
            <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

    </section>
  );
}
