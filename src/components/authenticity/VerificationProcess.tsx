import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Physical Examination",
    imageLeft: true,
    lines: [
      { type: "text", content: "Each piece is first examined by hand." },
      { type: "text", content: "We assess:" },
      { type: "bullet", content: "Natural shape and formation" },
      { type: "bullet", content: "Weight and density" },
      { type: "bullet", content: "Surface texture and natural lines" },
      { type: "text", content: "This step helps identify obvious inconsistencies before deeper testing." },
    ],
  },
  {
    number: 2,
    title: "Scientific Testing",
    imageLeft: false,
    lines: [
      { type: "text", content: "We use established testing methods to examine internal structure and material integrity." },
      { type: "text", content: "This may include:" },
      { type: "bullet", content: "X-ray imaging" },
      { type: "bullet", content: "Microscopic analysis" },
      { type: "bullet", content: "Lab-based verification techniques" },
      { type: "text", content: "These tests help confirm that the material is natural and unmodified. No jargon. No assumptions." },
    ],
  },
  {
    number: 3,
    title: "Mukhi & Structure Confirmation",
    imageLeft: true,
    lines: [
      { type: "text", content: "The mukhi count and structural features are confirmed using:" },
      { type: "bullet", content: "Manual examination" },
      { type: "bullet", content: "Technical validation" },
      { type: "text", content: "This ensures accuracy, especially in cases where surface appearance alone can be misleading." },
    ],
  },
  {
    number: 4,
    title: "Certification",
    imageLeft: false,
    lines: [
      { type: "text", content: "Once verification is complete, certification is prepared." },
      { type: "text", content: "Depending on the item, this may be:" },
      { type: "bullet", content: "Independent lab certification" },
      { type: "bullet", content: "Or structured in-house certification with documented criteria" },
      { type: "text", content: "Certification details are shared clearly with your purchase." },
    ],
  },
  {
    number: 5,
    title: "Final Review",
    imageLeft: true,
    lines: [
      { type: "text", content: "Before dispatch, each piece is reviewed once more. Only items that pass all verification steps move forward. Anything uncertain is set aside—never sold." },
    ],
  },
];

export default function VerificationProcess() {
  return (
    <section className="vp-section section-pad" style={{ background: "#FEF9F2" }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "48px" }}>
        <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}>
          Our Verification Process
        </h2>
        <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", textAlign: "center", margin: 0 }}>
          Every Rudraksha and gemstone goes through a structured, multi-step verification process before it is offered.
        </p>
      </div>

      {/* Story Container */}
      <div className="vp-container" style={{
        background: "#FFF5E6",
        border: "1px solid transparent",
        backgroundImage: "linear-gradient(#FFF5E6, #FFF5E6), linear-gradient(180deg, #BB5A28 0%, #552912 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
      }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const imageBlock = (
            <div className={`vp-img${!step.imageLeft ? " vp-img-even" : ""}`} style={{ flexShrink: 0, width: "226px", height: "226px", position: "relative", overflow: "hidden" }}>
              <Image src="/assets/images/common/common.png" alt={`Step ${step.number}`} fill sizes="(max-width: 767px) 100vw, 226px" style={{ objectFit: "cover" }} />
            </div>
          );

          const textBlock = (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
              <h3 className="vp-title font-prata" style={{ fontSize: "30px", lineHeight: "140%", color: "#0B0404", margin: 0 }}>
                <span style={{ color: "#BB5A28" }}>Step {step.number} —</span>{" "}{step.title}
              </h3>
              <div className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "160%", color: "#78716C", display: "flex", flexDirection: "column", gap: "2px" }}>
                {step.lines.map((line, j) =>
                  line.type === "bullet" ? (
                    <span key={j} style={{ paddingLeft: "16px" }}>&bull; {line.content}</span>
                  ) : (
                    <span key={j}>{line.content}</span>
                  )
                )}
              </div>
            </div>
          );

          return (
            <div
              key={step.number}
              className="vp-step"
              style={{
                display: "flex", flexDirection: "row", alignItems: "center",
                justifyContent: "space-between", gap: "60px",
                paddingBottom: "32px",
                marginBottom: isLast ? 0 : "32px",
                borderBottom: isLast ? "none" : "1px solid #E7E5E4",
              }}
            >
              {step.imageLeft ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
