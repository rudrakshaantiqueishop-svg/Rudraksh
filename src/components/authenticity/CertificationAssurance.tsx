import Image from "next/image";

const bullets = [
  "Authenticity",
  "Structural identification",
  "Verification method used",
];

export default function CertificationAssurance() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2" }}>
      <div className="ca-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "40px" }}>

        {/* Left — text content */}
        <div className="ca-text" style={{ flex: 1, minWidth: 0, paddingRight: "64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "23px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                Yes, You Will Receive Certification
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
                Every verified Rudraksha or gemstone is accompanied by certification. This certification confirms:
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {bullets.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Image src="/assets/icons/Star 1.svg" alt="Star" width={18} height={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>
            <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
              It is provided as documentation, not as a marketing add-on.
            </p>
          </div>
        </div>

        {/* Right — two overlapping images */}
        <div className="ca-images" style={{ flexShrink: 0, width: "100%", maxWidth: "530px", aspectRatio: "530 / 560", position: "relative" }}>
          <div style={{ position: "absolute", right: 0, top: 0, width: "64.15%", height: "53.57%", overflow: "hidden", zIndex: 1 }}>
            <Image src="/assets/images/common/common.png" alt="Certification" fill sizes="(max-width: 1023px) 60vw, 340px" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", left: 0, bottom: 0, width: "64.15%", height: "53.57%", overflow: "hidden", zIndex: 2 }}>
            <Image src="/assets/images/common/common.png" alt="Certified piece" fill sizes="(max-width: 1023px) 60vw, 340px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
