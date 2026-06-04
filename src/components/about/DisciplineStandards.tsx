import Image from "next/image";
import { StarIcon } from "./shared";

export default function DisciplineStandards() {
  return (
    <section style={{ background: "#FEF9F2", padding: "100px 70px" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "655px" }}>

        {/* Left column – images */}
        <div style={{ flexShrink: 0, width: "541px", height: "655px", position: "relative" }}>
          {/* Top-right image */}
          <div style={{ position: "absolute", left: "151px", top: 0, width: "390px", height: "403px", overflow: "hidden" }}>
            <Image src="/images/about-principle-1.png" alt="Discipline" fill sizes="390px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div style={{ position: "absolute", left: 0, top: "252px", width: "390px", height: "403px", overflow: "hidden" }}>
            <Image src="/images/about-principle-2.png" alt="Standards" fill sizes="390px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Right column – text */}
        <div style={{ flex: 1, minWidth: 0, paddingLeft: "64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                Discipline Shapes Standards
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
                Being based in Rishikesh influences how we operate. Not because it is globally recognised —{"\n"}but because it reinforces restraint. Tradition here is practiced quietly. That quiet practice informs our standards:
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Careful sourcing", "Structured verification", "Responsible communication"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <StarIcon />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
