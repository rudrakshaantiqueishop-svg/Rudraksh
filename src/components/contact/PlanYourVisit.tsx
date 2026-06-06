import Image from "next/image";

const bullets = [
  "Dedicated time for discussion",
  "Proper product preparation",
  "Personalised guidance",
  "Uninterrupted consultation",
];

export default function PlanYourVisit() {
  return (
    <section className="pyv-section section-pad" style={{ background: "#FEF9F2" }}>
      <div className="pyv-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0", height: "550px" }}>

        {/* LEFT — overlapping images (mirrors FoundingIntention right column) */}
        <div className="pyv-images" style={{ flexShrink: 0, width: "600px", height: "550px", position: "relative" }}>
          {/* Decorative gradient border */}
          <div className="pyv-deco" style={{
            position: "absolute",
            left: "92px", top: "84px",
            width: "417px", height: "382px",
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            zIndex: 0,
          }} />
          {/* Top-right image */}
          <div className="pyv-img1" style={{ position: "absolute", left: "125px", top: 0, width: "475px", height: "258px", overflow: "hidden", zIndex: 1 }}>
            <Image src="/assets/images/common/common.png" alt="Plan your visit" fill sizes="475px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div className="pyv-img2" style={{ position: "absolute", left: 0, top: "292px", width: "475px", height: "258px", overflow: "hidden", zIndex: 1 }}>
            <Image src="/assets/images/common/common.png" alt="Store visit" fill sizes="475px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* RIGHT — text */}
        <div className="pyv-text" style={{ flex: 1, minWidth: 0, paddingLeft: "64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2 className="font-prata" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                Plan Your Visit
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0 }}>
                For detailed product consultations or bulk inquiries, we recommend booking an appointment in advance. This ensures:
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

            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0 }}>
              We believe sacred objects deserve time — not rushed decisions.
            </p>

            <a
              href="#"
              className="font-lato"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                color: "#0B0404", fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", paddingBottom: "6px",
                borderBottom: "1px solid #0B0404", width: "fit-content",
              }}
            >
              BOOK AN APPOINTMENT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
