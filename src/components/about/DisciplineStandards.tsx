import Image from "next/image";
import { StarIcon } from "./shared";

export default function DisciplineStandards() {
  return (
    <section style={{ background: "#FEF9F2", padding: "0 70px 100px", display: "flex", gap: "64px", alignItems: "flex-start" }}>
      <div style={{ flexShrink: 0, width: "420px", height: "540px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "300px", height: "240px", overflow: "hidden" }}>
          <Image src="/images/about-principle-1.png" alt="Discipline" fill sizes="50vw" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "320px", height: "360px", overflow: "hidden" }}>
          <Image src="/images/about-principle-2.png" alt="Standards" fill sizes="50vw" style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "28px", paddingTop: "40px" }}>
        <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: 1.35, letterSpacing: "-0.02em", color: "#0B0404" }}>
          Discipline Shapes Standards
        </h2>
        <p className="font-lato" style={{ fontSize: "15px", color: "#44403C", lineHeight: 1.75 }}>
          Being based in Rishikesh influences how we operate. Not because it is globally recognised — but because it reinforces restraint. Tradition here is practiced quietly. That quiet practice informs our standards:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {["Careful sourcing", "Structured verification", "Responsible communication"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <StarIcon />
              <span className="font-lato" style={{ fontSize: "15px", fontWeight: 700, color: "#44403C" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
