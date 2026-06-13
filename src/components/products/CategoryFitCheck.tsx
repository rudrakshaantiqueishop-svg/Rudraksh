import Image from "next/image";
import type { CategoryPageContent } from "@/lib/product-utils";

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3.33 10L7.5 14.17L16.67 5" stroke="#552912" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4.38 4.38L15.62 15.62M15.62 4.38L4.38 15.62" stroke="#BB5A28" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CategoryFitCheck({ pageContent }: { pageContent: CategoryPageContent }) {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column", gap: "48px" }}>

      {/* Header */}
      <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0B0404", textAlign: "center", margin: 0 }}>
        Is This Category Right For You?
      </h2>

      {/* Three-column row */}
      <div className="cs-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(24px, 4vw, 80px)" }}>

        {/* Left — right for you */}
        <div className="cs-panel-left" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <span className="font-lato" style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>
            {pageContent.fitCheckRightLabel}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {pageContent.fitCheckRightItems.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckIcon />
                <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "160%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center — image with gradient border */}
        <div className="cs-center" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "100%", maxWidth: "360px", aspectRatio: "1", padding: "5.5%",
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
            backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box",
          }}>
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
              <Image src={pageContent.fitCheckImage} alt="Category fit check" fill sizes="(max-width: 1023px) 90vw, 320px" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* Right — not right for you */}
        <div className="cs-panel-right" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <span className="font-lato" style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", color: "#44403C" }}>
            {pageContent.fitCheckWrongLabel}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {pageContent.fitCheckWrongItems.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CrossIcon />
                <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "160%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
