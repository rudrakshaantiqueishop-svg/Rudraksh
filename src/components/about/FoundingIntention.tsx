import Image from "next/image";

export default function FoundingIntention() {
  return (
    <section className="fi-section" style={{ background: "#FEF9F2" }}>
      <div className="fi-row">

        {/* Left column – text */}
        <div className="fi-text" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "23px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 className="font-prata" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                Our Founding Intention
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
                Rudraksha Antiquie was created to restore process and accountability. Our approach is simple:
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Verify before offering", "Guide before recommending", "Explain before promising", "Present facts without exaggeration"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Image src="/assets/icons/Star 1.svg" alt="Star" width={18} height={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>

            <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
              We do not believe sacred objects should be sold through pressure. They should be offered with context.
            </p>
          </div>
        </div>

        {/* Right column – overlapping images */}
        <div className="fi-images" style={{ flexShrink: 0, position: "relative" }}>
          {/* Decorative gradient border rectangle */}
          <div className="fi-deco" style={{
            position: "absolute",
            left: "15.33%", top: "15.27%",
            width: "69.5%", height: "69.45%",
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            zIndex: 0,
          }} />
          {/* Top-right image */}
          <div className="fi-img-top" style={{ position: "absolute", left: "20.83%", top: 0, width: "79.16%", height: "46.9%", overflow: "hidden", zIndex: 1 }}>
            <Image src="/assets/images/about/about-founding-1.png" alt="Founding tradition" fill sizes="(max-width: 767px) 100vw, 475px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div className="fi-img-bot" style={{ position: "absolute", left: 0, top: "53.09%", width: "79.16%", height: "46.9%", overflow: "hidden", zIndex: 1 }}>
            <Image src="/assets/images/about/about-founding-2.png" alt="Founding intention" fill sizes="(max-width: 767px) 100vw, 475px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
