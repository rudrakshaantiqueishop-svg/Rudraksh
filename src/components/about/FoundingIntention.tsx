import Image from "next/image";
import { StarIcon } from "./shared";

export default function FoundingIntention() {
  return (
    <section style={{ background: "#FEF9F2", padding: "100px 70px", display: "flex", gap: "64px", alignItems: "flex-start" }}>
      <div style={{ flex: "0 0 50%", maxWidth: "50%", display: "flex", flexDirection: "column", gap: "28px" }}>
        <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: 1.35, letterSpacing: "-0.02em", color: "#0B0404" }}>
          Our Founding Intention
        </h2>
        <p className="font-lato" style={{ fontSize: "15px", color: "#44403C", lineHeight: 1.75 }}>
          Rudraksha Antiquie was created to restore process and accountability. Our approach is simple:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {["Verify before offering", "Guide before recommending", "Explain before promising", "Present facts without exaggeration"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <StarIcon />
              <span className="font-lato" style={{ fontSize: "15px", fontWeight: 700, color: "#44403C" }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="font-lato" style={{ fontSize: "15px", color: "#44403C", lineHeight: 1.75, fontStyle: "italic", borderLeft: "2px solid #BB5A28", paddingLeft: "16px" }}>
          We do not believe sacred objects should be sold through pressure. They should be offered with context.
        </p>
      </div>

      <div style={{ flex: "0 0 50%", maxWidth: "50%", position: "relative", height: "520px" }}>
        <div style={{ position: "absolute", top: "32px", right: 0, width: "370px", height: "460px", border: "3px solid #552912", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "340px", height: "260px", overflow: "hidden", zIndex: 1 }}>
          <Image src="/images/about-founding-1.png" alt="Founding intention" fill sizes="50vw" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "340px", height: "280px", overflow: "hidden", zIndex: 1 }}>
          <Image src="/images/about-founding-2.png" alt="Founding tradition" fill sizes="50vw" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
