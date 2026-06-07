import Image from "next/image";

export default function WhyEnergisationExists() {
  return (
    <section className="section-pad bg-[#FEF9F2]">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-[1440px] mx-auto gap-12 lg:gap-16">

        {/* Left column – text */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 className="font-prata title-fluid" style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
                Why Energisation Exists
              </h2>
              <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
                Traditionally, sacred objects were not treated as commodities.{"\n"}They were prepared before being worn or used, allowing the individual to begin their practice with clarity and respect. Energisation exists to:
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Mark the beginning of use", "Encourage intention and mindfulness", "Honour traditional practices"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ flexShrink: 0, width: "8px", height: "8px", borderRadius: "50%", background: "#BB5A28" }} />
                  <span className="font-lato" style={{ fontSize: "16px", fontWeight: 500, color: "#44403C" }}>{item}</span>
                </div>
              ))}
            </div>

            <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
              It is meant to support awareness—not replace personal effort or belief.
            </p>

          </div>
        </div>

        {/* Right column – images */}
        <div className="relative w-full max-w-[541px] aspect-[541/655] shrink-0">
          {/* Top-right image */}
          <div className="absolute right-0 top-0 w-[72%] h-[61%] overflow-hidden">
            <Image src="/assets/images/products/category-necklace.png" alt="Energised mala" fill sizes="(max-width: 768px) 100vw, 390px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div className="absolute left-0 bottom-0 w-[72%] h-[61%] overflow-hidden">
            <Image src="/assets/images/home/beads.png" alt="Rudraksha beads" fill sizes="(max-width: 768px) 100vw, 390px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
