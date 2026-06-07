export default function WhatWeMeanByEnergisation() {
  return (
    <section className="section-pad bg-[#FEF9F2] relative overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Brown gradient box */}
        <div className="relative z-10 flex justify-center items-center overflow-hidden p-6 md:p-10 min-h-[260px]" style={{
          background: "linear-gradient(90deg, #552912 0%, #BB5A28 100%)",
          boxShadow: "0 0 0 3px #CCB26A",
        }}>
          {/* Gold border outline */}
          <div style={{ position: "absolute", inset: 0, outline: "3px solid #CCB26A", outlineOffset: "-3px", pointerEvents: "none", zIndex: 2 }} />

          {/* Text content */}
          <div className="relative z-20 text-center flex flex-col gap-5 max-w-[1000px] w-full">
            <h2 className="font-prata title-fluid" style={{
              lineHeight: "140%", letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #EAB308 0%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              What We Mean by Energisation
            </h2>
            <p className="font-lato text-[15px] md:text-[16px]" style={{ lineHeight: "180%", color: "#FFFFFF", textAlign: "center" }}>
              Energisation refers to the traditional preparation of a verified Rudraksha or gemstone through intention, ritual, and respectful handling.<br className="hidden md:block" />
              {" "}It is not a modification of the object.<br className="hidden md:block" />
              {" "}It does not change its physical properties.<br className="hidden md:block" />
              {" "}It is a preparatory process rooted in tradition and mindfulness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
