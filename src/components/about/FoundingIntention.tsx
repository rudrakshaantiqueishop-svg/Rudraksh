import Image from "next/image";
import { StarIcon } from "./shared";

export default function FoundingIntention() {
  return (
    <section style={{ background: "#FEF9F2", padding: "100px 70px" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "550px" }}>

        {/* Left column */}
        <div style={{ flex: 1, minWidth: 0, paddingRight: "64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "23px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                Our Founding Intention
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
                Rudraksha Antiquie was created to restore process and accountability. Our approach is simple:
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Verify before offering", "Guide before recommending", "Explain before promising", "Present facts without exaggeration"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <StarIcon />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>

            <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
              We do not believe sacred objects should be sold through pressure. They should be offered with context.
            </p>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flexShrink: 0, width: "600px", height: "550px", position: "relative" }}>
          {/* Decorative gradient border rectangle */}
          <div style={{
            position: "absolute",
            left: "92px",
            top: "84px",
            width: "417px",
            height: "382px",
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            zIndex: 0,
          }} />
          {/* Top-right image */}
          <div style={{ position: "absolute", left: "125px", top: 0, width: "475px", height: "258px", overflow: "hidden", zIndex: 1 }}>
            <Image src="/images/about-founding-1.png" alt="Founding tradition" fill sizes="475px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div style={{ position: "absolute", left: 0, top: "292px", width: "475px", height: "258px", overflow: "hidden", zIndex: 1 }}>
            <Image src="/images/about-founding-2.png" alt="Founding intention" fill sizes="475px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
