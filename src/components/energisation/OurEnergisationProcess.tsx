import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Verification First",
    imageLeft: true,
    image: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790891629/rudraksh/authenticity/verification-step-2-scientific-testing.webp",
    desc: "Only verified Rudraksha or gemstones are considered for energisation. Authenticity is established before any preparation begins.",
  },
  {
    number: 2,
    title: "Cleansing & Handling",
    imageLeft: false,
    image: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790971264/rudraksh/energisation/energisation-step-2-cleansing-handling.webp",
    desc: "The piece is gently cleaned and handled with care. This step focuses on respectful preparation, not forceful treatment.",
  },
  {
    number: 3,
    title: "Traditional Preparation",
    imageLeft: true,
    image: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790971523/rudraksh/energisation/energisation-step-3-traditional-preparation.webp",
    desc: "Mantras or intentions are applied according to traditional practices. The process is quiet, focused, and never rushed.",
  },
  {
    number: 4,
    title: "Quiet Rest Period",
    imageLeft: false,
    image: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790157044/rudraksh/real-product-images/new_products_co2/dsc_5185.jpg",
    desc: "After preparation, the piece is allowed to rest. This pause is intentional, allowing the process to complete naturally.",
  },
  {
    number: 5,
    title: "Final Review",
    imageLeft: true,
    image: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790156056/rudraksh/products/japa-mala/rudraksha-karungali-dual-protection-mala/role_ls_2.webp",
    desc: "Prepared pieces are reviewed once more, packed carefully, and dispatched with attention.",
  },
];

export default function OurEnergisationProcess() {
  return (
    <section className="oep-section section-pad" style={{ background: "#FEF9F2" }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "48px" }}>
        <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}>
          Our Energisation Process
        </h2>
        <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", textAlign: "center", margin: 0 }}>
          Energisation is only performed after authenticity is confirmed. No exceptions.
        </p>
      </div>

      {/* Story Container */}
      <div className="oep-container" style={{
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
            <div className={`oep-img${!step.imageLeft ? " oep-img-even" : ""}`} style={{ flexShrink: 0, width: "226px", height: "226px", position: "relative", overflow: "hidden" }}>
              <Image
                src={step.image}
                alt={`Step ${step.number} — ${step.title}`}
                fill
                sizes="(max-width: 767px) 100vw, 226px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          );

          const textBlock = (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              <h3 className="oep-title font-prata" style={{ fontSize: "30px", lineHeight: "140%", color: "#0B0404", margin: 0 }}>
                <span style={{ color: "#BB5A28" }}>Step {step.number} —</span>{" "}{step.title}
              </h3>
              <p className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "160%", color: "#78716C", margin: 0 }}>
                {step.desc}
              </p>
            </div>
          );

          return (
            <div
              key={step.number}
              className="oep-step"
              style={{
                display: "flex", flexDirection: "row", alignItems: "center",
                justifyContent: "space-between", gap: "48px",
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
