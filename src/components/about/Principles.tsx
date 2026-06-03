import Image from "next/image";

const PrincipleCard = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <h3 className="font-prata" style={{ fontSize: "18px", color: "#0B0404", lineHeight: 1.35, maxWidth: "200px" }}>{title}</h3>
      <span className="font-lato" style={{ fontSize: "32px", fontWeight: 700, color: "rgba(187,90,40,0.15)", lineHeight: 1, flexShrink: 0 }}>{num}</span>
    </div>
    <p className="font-lato" style={{ fontSize: "13px", color: "#44403C", lineHeight: 1.6 }}>{desc}</p>
  </div>
);

export default function Principles() {
  return (
    <section style={{ position: "relative", padding: "100px 70px", background: "linear-gradient(180deg, #FEF9F2 0%, #FFF5E6 100%)", overflow: "hidden" }}>
      {/* Decorative leaf patterns */}
      <div style={{ position: "absolute", top: 0, left: 0, opacity: 0.08, pointerEvents: "none" }}>
        <svg width="400" height="500" viewBox="0 0 400 500" fill="none">
          <path d="M50 400 Q100 100 300 50 Q200 200 150 400Z" stroke="#BB5A28" strokeWidth="1.5" fill="none" />
          <path d="M80 420 Q150 150 350 80 Q250 230 180 420Z" stroke="#BB5A28" strokeWidth="1" fill="none" />
          <path d="M120 440 Q180 180 380 100 Q290 260 210 440Z" stroke="#552912" strokeWidth="0.8" fill="none" />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.08, pointerEvents: "none", transform: "rotate(180deg)" }}>
        <svg width="350" height="450" viewBox="0 0 400 500" fill="none">
          <path d="M50 400 Q100 100 300 50 Q200 200 150 400Z" stroke="#BB5A28" strokeWidth="1.5" fill="none" />
          <path d="M80 420 Q150 150 350 80 Q250 230 180 420Z" stroke="#BB5A28" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: 1.35, letterSpacing: "-0.02em", color: "#0B0404", marginBottom: "56px" }}>
        The Principles We Work By
      </h2>

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <PrincipleCard num="01" title="Authenticity Before Appearance" desc="If a bead cannot be verified, it is not listed. Every piece earns its place through examination, not through aesthetics." />
          <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
            <Image src="/images/about-p01-3021a5.png" alt="Authenticity" fill sizes="50vw" style={{ objectFit: "cover" }} />
          </div>
          <PrincipleCard num="03" title="Guidance Before Recommendation" desc="Advice comes before selection. We understand the purpose first, then suggest accordingly." />
          <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
            <Image src="/images/about-principle-3.png" alt="Guidance" fill sizes="50vw" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Right column — offset down */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", marginTop: "80px" }}>
          <PrincipleCard num="02" title="Transparency Over Claims" desc="We explain what a product supports — and what it does not guarantee. No exaggeration. No false promises." />
          <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
            <Image src="/images/about-p02.png" alt="Transparency" fill sizes="50vw" style={{ objectFit: "cover" }} />
          </div>
          <PrincipleCard num="04" title="Choice Without Pressure" desc="Nothing is positioned as urgent or compulsory. Every decision is left entirely to the individual." />
          <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
            <Image src="/images/about-p04.png" alt="Choice" fill sizes="50vw" style={{ objectFit: "cover" }} />
          </div>
          <PrincipleCard num="05" title="Tradition with Verification" desc="We honour traditional knowledge while applying modern scientific validation. Both can coexist without contradiction." />
        </div>
      </div>
    </section>
  );
}
