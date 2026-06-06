import Image from "next/image";

const bullets = [
  "Rudraksha viewing and selection",
  "Gemstone consultations",
  "Verification discussions",
  "Certification clarification",
];

export default function VisitOurStore() {
  return (
    <section className="vos-section section-pad" style={{ background: "#FFF5E6" }}>
      <div className="vos-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "80px" }}>

        {/* LEFT — text */}
        <div className="vos-text" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 className="font-prata" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: "130%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              Visit Our Store in Rishikesh
            </h2>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0 }}>
              Our physical store is located in Rishikesh, in an environment that reflects the discipline and restraint we practice in our work. The space is designed for quiet, focused consultations — not hurried transactions. You are welcome to visit us for:
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bullets.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Image src="/assets/icons/Star 1.svg" alt="Star" width={20} height={20} style={{ flexShrink: 0 }} />
                <span className="font-lato" style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="vos-img" style={{ flexShrink: 0, width: "650px", height: "600px", position: "relative", overflow: "hidden" }}>
          <Image
            src="/assets/images/common/common.png"
            alt="Visit our store in Rishikesh"
            fill
            sizes="(max-width: 767px) 100vw, 440px"
            style={{ objectFit: "cover" }}
          />
        </div>

      </div>
    </section>
  );
}
