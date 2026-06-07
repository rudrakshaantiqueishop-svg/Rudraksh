import Image from "next/image";

const steps = [
  { label: "STEP 1", title: "Share Your Birth Details", desc: "Provide your date, time, and place of birth." },
  { label: "STEP 2", title: "Chart Analysis", desc: "Our astrologers examine planetary influences and suitability." },
  { label: "STEP 3", title: "Personalized Guidance", desc: "Receive structured recommendations on Rudraksha, gemstones, or appropriate combinations." },
];

export default function HowConsultationWorks() {
  return (
    <section className="hcw-section section-pad" style={{ background: "#FEF9F2" }}>
      <h2
        className="font-prata"
        style={{ fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: "0 0 56px 0" }}
      >
        How Consultation Works?
      </h2>

      <div className="hcw-row flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col lg:flex-row items-center lg:items-start flex-1 w-full lg:w-auto">
            <div className="flex flex-col items-center gap-3 flex-1">
              <div style={{
                width: "62px", height: "62px", borderRadius: "50%",
                background: "linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Image src="/assets/icons/Star.svg" alt="step" width={18} height={18} />
              </div>

              <p className="font-prata" style={{ fontSize: "13px", color: "#552912", textAlign: "center", letterSpacing: "0.06em", lineHeight: "140%", margin: 0 }}>
                {s.label}
              </p>
              <h3 className="font-lato" style={{ fontSize: "15px", fontWeight: 600, color: "#0B0404", textAlign: "center", lineHeight: "140%", margin: 0 }}>
                {s.title}
              </h3>
              <p className="font-lato" style={{ fontSize: "16px", fontWeight: 400, color: "#78716C", textAlign: "center", lineHeight: "150%", maxWidth: "200px", margin: 0 }}>
                {s.desc}
              </p>
            </div>

            {i < steps.length - 1 && (
              <span className="flex-shrink-0 mt-7 lg:mt-[20px] transform lg:translate-x-0 rotate-90 lg:rotate-0">
                <svg width="100" height="34" viewBox="0 0 100 34" fill="none">
                  <path d="M7 17h86M83 10l10 7-10 7" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="font-lato" style={{ fontSize: "18px", color: "#78716C", textAlign: "center", lineHeight: "150%", margin: "48px 0 0 0" }}>
        Clear explanations are provided before any suggestion is made.
      </p>
    </section>
  );
}
