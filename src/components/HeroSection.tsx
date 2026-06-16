import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(500px, 80vw, 780px)" }}>

      {/* Background image */}
      <Image
        src="/assets/images/home/hero-main.png"
        alt="Rudraksha necklace"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(85,41,18,0.3)" }} />

      {/* ── Text content — responsive position ── */}
      <div
        className="absolute flex flex-col left-5 right-5 bottom-8 md:left-10 lg:left-12 lg:bottom-[100px] lg:max-w-[460px] xl:left-16 xl:bottom-[140px] xl:max-w-[686px] lg:right-auto z-10"
        style={{ gap: "clamp(24px, 3vw, 40px)" }}
      >
        {/* Title + body */}
        <div className="flex flex-col" style={{ gap: "clamp(12px, 1.5vw, 16px)" }}>
          <h1
            className="font-prata text-white"
            style={{ fontSize: "clamp(40px, 8vw, 72px)", lineHeight: "115%", letterSpacing: "-0.02em", margin: 0 }}
          >
            Authenticity Meets Ancient Wisdom
          </h1>
          <p
            className="font-lato text-white"
            style={{ fontSize: "clamp(15px, 4vw, 18px)", lineHeight: "160%", margin: 0, opacity: 0.95 }}
          >
            Rudraksha and gemstones selected, verified, and prepared through time-honoured
            Vedic practices to support balance, clarity, and inner alignment.
          </p>
        </div>

        {/* SHOP NOW */}
        <div
          className="flex items-center w-fit"
          style={{ gap: "4px", paddingBottom: "8px", borderBottom: "1px solid white" }}
        >
          <span className="font-lato text-white" style={{ fontSize: "clamp(14px, 3vw, 16px)", fontWeight: 600, lineHeight: "150%", letterSpacing: "0.05em" }}>
            SHOP NOW
          </span>
          <Image src="/assets/icons/icon-shopnow-arrow.svg" alt="" width={20} height={20} />
        </div>
      </div>

      {/* ── Responsive Annotation Group — hidden on mobile ── */}
      <div className="hidden lg:block absolute pointer-events-none lg:scale-[0.65] xl:scale-100 origin-left transition-transform" style={{ left: "clamp(52%, 58vw, 58%)", top: "42%" }}>
        
        {/* Circle positioned below the dot */}
        <div className="absolute rounded-full border-2  border-white" style={{ left: "-105px", top: "0px", width: "211px", height: "211px", opacity: 0.6 }} />
        
        {/* The dot */}
        <div className="absolute rounded-full bg-white" style={{ left: "-5px", top: "-5px", width: "11px", height: "11px" }} />
        
        {/* The line connecting dot to text */}
        <div className="absolute bg-white" style={{ left: "0px", top: "0px", width: "150px", height: "1px" }} />
        
        {/* The text block */}
        <div className="absolute flex flex-col pointer-events-auto" style={{ left: "150px", top: "-52px", width: "250px", gap: "16px" }}>
           <div style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}>
             <span className="font-prata text-white" style={{ fontSize: "clamp(24px, 2vw, 30px)", lineHeight: "140%", letterSpacing: "-0.02em" }}>
               New Necklace
             </span>
           </div>
           <p className="font-lato text-white" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", lineHeight: "150%", margin: 0, maxWidth: "200px" }}>
             Discover handcrafted necklaces that complement your unique personality.
           </p>
        </div>

      </div>

      {/* ── Responsive Nav arrows — hidden on small screens ── */}
      <div className="hidden lg:flex absolute gap-4 pointer-events-auto" style={{ right: "8%", bottom: "64px" }}>
        <button className="flex items-center justify-center hover:bg-white/10 transition-colors" style={{ width: "64px", height: "64px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.6)" }}>
          <Image src="/assets/icons/icon-arrow-left.svg" alt="Previous" width={32} height={32} />
        </button>
        <button className="flex items-center justify-center hover:bg-white/30 transition-colors" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <Image src="/assets/icons/icon-arrow-right.svg" alt="Next" width={32} height={32} />
        </button>
      </div>

    </section>
  );
}
