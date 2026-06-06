import Image from "next/image";

const bullets = [
  "The material is natural and unaltered",
  "Its structure is accurately identified",
  "Its origin and form are honestly represented",
  "Its verification is documented, not assumed",
];

export default function WhatAuthenticityMeans() {
  return (
    <section style={{ background: "#FEF9F2", padding: "100px 70px" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "550px" }}>

        {/* Left column — two overlapping images with decorative border */}
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
            <Image
              src="/assets/images/common/common.png"
              alt="Rudraksha beads"
              fill
              sizes="475px"
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Bottom-left image */}
          <div style={{ position: "absolute", left: 0, top: "292px", width: "475px", height: "258px", overflow: "hidden", zIndex: 1 }}>
            <Image
              src="/assets/images/common/common.png"
              alt="Gemstone mala"
              fill
              sizes="475px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right column — text content */}
        <div style={{ flex: 1, minWidth: 0, paddingLeft: "64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "23px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                What Authenticity Really Means
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
                For us, authenticity is not just about whether a Rudraksha or gemstone is &ldquo;real.&rdquo; It means:
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
              Authenticity is a process, not a label.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
