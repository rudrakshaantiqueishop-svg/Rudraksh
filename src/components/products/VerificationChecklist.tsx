import Image from "next/image";
import type { CategoryPageContent } from "@/lib/product-utils";

export default function VerificationChecklist({ pageContent }: { pageContent: CategoryPageContent }) {
  return (
    <section className="fi-section" style={{ background: "#FEF9F2" }}>
      <div className="fi-row">

        {/* Left column – text */}
        <div className="fi-text" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "23px" }}>

            <h2 className="font-prata" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              {pageContent.checklistHeading}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {pageContent.checklist.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Image src="/assets/icons/Star 1.svg" alt="Star" width={18} height={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="/authenticity"
              className="inline-flex items-center gap-1.5 text-brown font-lato text-[13px] font-bold tracking-[0.8px] pb-1 border-b border-brown hover:opacity-70 transition-opacity w-fit"
            >
              VIEW OUR AUTHENTICITY &amp; CERTIFICATION PROCESS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
          </div>
        </div>

        {/* Right column – overlapping images */}
        <div className="fi-images" style={{ flexShrink: 0, position: "relative" }}>
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
          <div className="fi-img-top" style={{ position: "absolute", left: "20.83%", top: 0, width: "79.16%", height: "46.9%", overflow: "hidden", zIndex: 1 }}>
            <Image src={pageContent.checklistImages[0]} alt="Verification process" fill sizes="(max-width: 767px) 100vw, 475px" style={{ objectFit: "cover" }} />
          </div>
          <div className="fi-img-bot" style={{ position: "absolute", left: 0, top: "53.09%", width: "79.16%", height: "46.9%", overflow: "hidden", zIndex: 1 }}>
            <Image src={pageContent.checklistImages[1]} alt="Verification process" fill sizes="(max-width: 767px) 100vw, 475px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
