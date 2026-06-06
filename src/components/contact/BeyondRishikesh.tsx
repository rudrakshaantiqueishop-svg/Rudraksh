import Image from "next/image";

const bullets = [
  "Verification",
  "Certification",
  "Careful preparation",
  "Secure shipping",
];

export default function BeyondRishikesh() {
  return (
    <section className="br-section section-pad" style={{ background: "#FEF9F2" }}>
      <div className="br-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "80px" }}>

        {/* LEFT — text */}
        <div className="br-text" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 className="font-prata" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: "130%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              Beyond Rishikesh
            </h2>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0 }}>
              While we are based in Rishikesh, we serve clients across India and internationally. Each order — domestic or global — follows the same process:
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bullets.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Image src="/assets/icons/Star 1.svg" alt="Star" width={18} height={18} style={{ flexShrink: 0 }} />
                <span className="font-lato" style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>

          <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0 }}>
            Distance does not change our standards.
          </p>
        </div>

        {/* RIGHT — two overlapping images (DisciplineStandards pattern) */}
        <div className="br-images" style={{ flexShrink: 0, width: "541px", height: "655px", position: "relative" }}>
          {/* Top-right image */}
          <div className="br-img1" style={{ position: "absolute", left: "151px", top: 0, width: "390px", height: "403px", overflow: "hidden" }}>
            <Image src="/assets/images/common/common.png" alt="Beyond Rishikesh" fill sizes="390px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div className="br-img2" style={{ position: "absolute", left: 0, top: "252px", width: "390px", height: "403px", overflow: "hidden" }}>
            <Image src="/assets/images/common/common.png" alt="Global delivery" fill sizes="390px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
