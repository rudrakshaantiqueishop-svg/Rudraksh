import Image from "next/image";

const considerIf = [
  "You are new to wearing Rudraksha or gemstones",
  "You prefer traditional preparation",
  "You value ritual as part of your practice",
];

const notNecessaryIf = [
  "You already follow your own preparation practices",
  "You prefer a purely personal or self-led approach",
  "You are unsure or hesitant",
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C8A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "3px" }}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BB5A28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "3px" }}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function WhenEnergisationIsRecommended() {
  return (
    <section className="weir-section section-pad" style={{ background: "#FEF9F2" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "56px" }}>
        <h2 className="font-prata" style={{ fontSize: "clamp(28px, 4vw, 36px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}>
          When Energisation Is—and Is Not—Recommended
        </h2>
        <p className="font-lato" style={{ fontSize: "14px", color: "#78716C", textAlign: "center", margin: 0 }}>
          Choosing energisation should feel natural—not obligatory.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 max-w-7xl mx-auto w-full">

        {/* Left – may be considered if */}
        <div className="flex-1 w-full lg:max-w-[380px] flex flex-col gap-5">
          <h3 className="font-lato" style={{ fontSize: "19px", fontWeight: 600, color: "#0B0404", margin: 0 }}>
            Energisation may be considered if:
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {considerIf.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <CheckIcon />
                <span className="font-lato" style={{ fontSize: "16px", lineHeight: "160%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center – image */}
        <div className="shrink-0 w-[280px] h-[280px] lg:w-[340px] lg:h-[340px] border border-[#BB5A28] p-[10px] lg:p-[14px] relative">
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
            <Image src="/assets/images/products/category-necklace.png" alt="Rudraksha mala" fill sizes="(max-width: 1024px) 280px, 340px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Right – may not be necessary if */}
        <div className="flex-1 w-full lg:max-w-[380px] flex flex-col gap-5">
          <h3 className="font-lato" style={{ fontSize: "19px", fontWeight: 600, color: "#0B0404", margin: 0 }}>
            Energisation may not be necessary if:
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {notNecessaryIf.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <CrossIcon />
                <span className="font-lato" style={{ fontSize: "16px", lineHeight: "160%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
