import Image from "next/image";

const PrincipleCard = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="prin-card" style={{
    background: "#FFFFFF",
    border: "1px solid #E7E5E4",
    padding: "28px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 className="font-prata" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", lineHeight: "140%", color: "#0B0404", margin: 0 }}>
          {title}
        </h3>
        <span className="font-prata" style={{ fontSize: "24px", color: "#BB5A28", flexShrink: 0, marginLeft: "12px" }}>
          {num}
        </span>
      </div>
      <p className="font-lato" style={{ fontSize: "15px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
        {desc}
      </p>
    </div>
  </div>
);

const FeatureImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="prin-feat-img" style={{ position: "relative", overflow: "hidden" }}>
    <Image src={src} alt={alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 411px" style={{ objectFit: "cover" }} />
  </div>
);

export default function Principles() {
  return (
    <section className="prin-section" style={{
      position: "relative",
      background: "linear-gradient(180deg, #FEF9F2 0%, #FFF5E6 100%)",
      overflow: "hidden",
    }}>
      {/* Decorative — hidden on mobile via CSS */}
      <div className="prin-deco-tl" style={{ position: "absolute", left: "-28px", top: "-68px", width: "545px", height: "302px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/about/principle-line.svg" alt="" fill sizes="545px" />
      </div>
      <div className="prin-deco-tr" style={{ position: "absolute", left: "1033px", top: 0, width: "632px", height: "391px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/common/plant 2.svg" alt="" fill sizes="632px" />
      </div>
      <div className="prin-deco-bl" style={{ position: "absolute", left: "-120px", top: "336px", width: "580px", height: "734px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/common/big_plant.svg" alt="" fill sizes="580px" />
      </div>
      <div className="prin-deco-bot" style={{ position: "absolute", left: "-22px", top: "1245px", width: "571px", height: "354px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/common/Line-bottom.svg" alt="" fill sizes="571px" />
      </div>

      {/* Main content */}
      <div className="prin-content" style={{ position: "relative", zIndex: 1 }}>
        <div className="prin-outer">

          {/* Left: title */}
          <div className="prin-title-col">
            <h2 className="font-prata" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              The Principles We Work By
            </h2>
          </div>

          {/* Right: two-column card grid */}
          <div className="prin-grid">
            {/* Column 1 */}
            <div className="prin-col">
              <PrincipleCard num="01" title="Authenticity Before Appearance" desc="If a bead cannot be verified, it is not listed." />
              <FeatureImage src="/assets/images/about/about-p01-3021a5.png" alt="Authenticity" />
              <PrincipleCard num="03" title="Guidance Before Recommendation" desc="Advice comes before selection." />
              <FeatureImage src="/assets/images/about/about-principle-3.png" alt="Guidance" />
            </div>
            {/* Column 2 */}
            <div className="prin-col">
              <PrincipleCard num="02" title="Transparency Over Claims" desc="We explain what a product supports — and what it does not guarantee." />
              <FeatureImage src="/assets/images/about/about-p02.png" alt="Transparency" />
              <PrincipleCard num="04" title="Choice Without Pressure" desc="Nothing is positioned as urgent or compulsory." />
              <FeatureImage src="/assets/images/about/about-p04.png" alt="Choice" />
              <PrincipleCard num="05" title="Tradition with Verification" desc="We honour traditional knowledge while applying modern scientific validation." />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
