import Image from "next/image";

const PrincipleCard = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div style={{
    background: "#FFFFFF",
    border: "1px solid #E7E5E4",
    padding: "28px",
    height: "284px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 className="font-prata" style={{ fontSize: "30px", lineHeight: "140%", color: "#0B0404", margin: 0, width: "296px" }}>
          {title}
        </h3>
        <span className="font-prata" style={{ fontSize: "24px", color: "#BB5A28", flexShrink: 0 }}>
          {num}
        </span>
      </div>
      <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
        {desc}
      </p>
    </div>
  </div>
);

const FeatureImage = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ position: "relative", height: "284px", overflow: "hidden" }}>
    <Image src={src} alt={alt} fill sizes="411px" style={{ objectFit: "cover" }} />
  </div>
);

export default function Principles() {
  return (
    <section style={{
      position: "relative",
      background: "linear-gradient(180deg, #FEF9F2 0%, #FFF5E6 100%)",
      overflow: "hidden",
    }}>
      {/* Decorative: top-left plant */}
      <div style={{ position: "absolute", left: "-28px", top: "-68px", width: "545px", height: "302px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/about/principle-line.svg" alt="" fill sizes="545px" />
      </div>
      {/* Decorative: top-right plant 2 */}
      <div style={{ position: "absolute", left: "1033px", top: 0, width: "632px", height: "391px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/common/plant 2.svg" alt="" fill sizes="632px" />
      </div>
      {/* Decorative: big plant left side */}
      <div style={{ position: "absolute", left: "-120px", top: "336px", width: "580px", height: "734px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/common/big_plant.svg" alt="" fill sizes="580px" />
      </div>
      {/* Decorative: line bottom */}
      <div style={{ position: "absolute", left: "-22px", top: "1245px", width: "571px", height: "354px", pointerEvents: "none", zIndex: 0 }}>
        <Image src="/assets/images/common/Line-bottom.svg" alt="" fill sizes="571px" />
      </div>

      {/* Main content */}
      <div style={{ padding: "100px 70px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: "72px", alignItems: "flex-start" }}>

          {/* Left: title */}
          <div style={{ width: "386px", flexShrink: 0 }}>
            <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              The Principles We Work By
            </h2>
          </div>

          {/* Right: two-column card grid */}
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Column 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "411px" }}>
              <PrincipleCard num="01" title="Authenticity Before Appearance" desc="If a bead cannot be verified, it is not listed." />
              <FeatureImage src="/assets/images/about/about-p01-3021a5.png" alt="Authenticity" />
              <PrincipleCard num="03" title="Guidance Before Recommendation" desc="Advice comes before selection." />
              <FeatureImage src="/assets/images/about/about-principle-3.png" alt="Guidance" />
            </div>
            {/* Column 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "411px" }}>
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
