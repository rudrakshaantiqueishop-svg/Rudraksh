import Image from "next/image";

const team = [
  {
    name: "Raj Pandya",
    role: "Vedic Astrologer",
    image: "/assets/images/about/about-p01-3021a5.png",
  },
  {
    name: "Raj Pandya",
    role: "Vedic Astrologer",
    image: "/assets/images/about/about-p02.png",
  },
  {
    name: "Raj Pandya",
    role: "Vedic Astrologer",
    image: "/assets/images/about/about-p03.png",
  },
];

const description =
  "Practicing traditional Vedic astrology with a focus on practical guidance. Specializes in birth chart analysis related to Rudraksha and gemstone suitability.";

export default function ExperiencedAndResponsibleGuidance() {
  return (
    <section className="earg-section section-pad" style={{ background: "#FEF9F2" }}>
      <h2 className="font-prata" style={{ fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: "0 0 40px 0" }}>
        Experienced &amp; Responsible Guidance
      </h2>

      <div className="earg-grid" style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
        {team.map((member, i) => (
          <div key={i} className="earg-card" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="earg-img" style={{ width: "100%", maxWidth: "412px", height: "450px", position: "relative", overflow: "hidden" }}>
              <Image src={member.image} alt={member.name} fill sizes="(max-width: 1023px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <h3 className="font-prata" style={{ fontSize: "20px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                  {member.name}
                </h3>
                <span className="font-lato" style={{ fontSize: "14px", fontWeight: 600, color: "#BB5A28" }}>
                  {member.role}
                </span>
              </div>
              <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#78716C", margin: 0 }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
