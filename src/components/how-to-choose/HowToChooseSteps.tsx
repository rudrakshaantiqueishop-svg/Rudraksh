import Image from "next/image";

const steps = [
  {
    number: "STEP 1",
    title: "Intention",
    body: "What are you genuinely seeking right now? Clarity, grounding, protection, focus, balance — or simply understanding.",
  },
  {
    number: "STEP 2",
    title: "Personal Factors",
    body: "Your lifestyle, beliefs, mindset, and readiness all play a role. There is no universal answer that works for everyone.",
  },
  {
    number: "STEP 3",
    title: "Thoughtful Recommendation",
    body: "Only after understanding the above do we suggest a Rudraksha or gemstone — and in some cases, we may advise not choosing one yet.",
  },
];

export default function HowToChooseSteps() {
  return (
    <section className="htcs-section">
      {/* Header */}
      <div className="htcs-header">
        <h2 className="font-prata htcs-title">How We Guide Every Recommendation</h2>
        <p className="font-lato htcs-subtitle">Instead of telling you what to buy, we focus on what truly fits.</p>
      </div>

      {/* Steps row — mirrors EnergisationProcess layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-0">
        {steps.map((step, i) => (
          <div key={step.number} className="flex flex-col lg:flex-row items-center lg:items-start flex-1 w-full lg:w-auto">

            {/* Step content — centered */}
            <div className="flex flex-col items-center gap-3 flex-1 px-4">
              {/* Gradient circle */}
              <div style={{
                width: "68px", height: "68px", borderRadius: "50%",
                background: "linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Image src="/assets/icons/Star.svg" alt="step" width={22} height={22} style={{ width: "auto", height: "auto" }} />
              </div>

              {/* Step label */}
              <p className="font-prata" style={{
                fontSize: "14px", color: "#552912", textAlign: "center",
                letterSpacing: "0.06em", lineHeight: "140%", margin: 0,
              }}>
                {step.number}
              </p>

              {/* Title */}
              <p className="font-prata" style={{
                fontSize: "clamp(15px, 1.4vw, 18px)", color: "#0B0404",
                textAlign: "center", lineHeight: "130%", margin: 0,
              }}>
                {step.title}
              </p>

              {/* Body */}
              <p className="font-lato" style={{
                fontSize: "14px", color: "#44403C", textAlign: "center",
                lineHeight: "160%", maxWidth: "220px", margin: 0,
              }}>
                {step.body}
              </p>
            </div>

            {/* Arrow between steps */}
            {i < steps.length - 1 && (
              <span className="flex-shrink-0 mt-4 lg:mt-[22px] rotate-90 lg:rotate-0">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M7 17h20M21 10l7 7-7 7" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
