import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[780px] overflow-hidden">
      <Image src="/images/hero-image.png" alt="Rudraksha jewelry" fill className="object-cover object-[center_20%]" priority />
      <div className="absolute inset-0 bg-[rgba(20,10,5,0.28)]" />

      {/* Decorative circle */}
      <div className="absolute pointer-events-none" style={{ left: "calc(54.4% - 105px)", top: "calc(49.1% - 105px)", width: 211, height: 211 }}>
        <svg viewBox="0 0 211 211" fill="none" className="w-full h-full">
          <circle cx="105.5" cy="105.5" r="104.5" stroke="white" strokeOpacity="0.6" strokeWidth="1"/>
        </svg>
        <div className="absolute top-0 right-[-175px] flex items-center">
          <div className="w-[7px] h-[7px] rounded-full bg-white flex-shrink-0" />
          <div className="w-[168px] h-px bg-white/55" />
        </div>
      </div>

      {/* Left text */}
      <div className="absolute bottom-20 left-16 flex flex-col gap-[18px] max-w-[720px]">
        <h1 className="font-prata text-[72px] font-normal leading-[1.18] tracking-[-0.02em] text-white">
          Authenticity Meets Ancient Wisdom
        </h1>
        <p className="font-lato text-[18px] leading-[1.6] text-white/88 max-w-[460px]">
          Rudraksha and gemstones selected, verified, and prepared through time-honoured Vedic practices to support balance, clarity, and inner alignment.
        </p>
        <a href="#" className="inline-flex items-center gap-1.5 text-white font-lato text-sm font-bold tracking-[1.2px] pb-1.5 border-b border-white/65 w-fit mt-1 hover:opacity-75 transition-opacity">
          SHOP NOW
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>

      {/* Right badge */}
      <div className="absolute flex flex-col gap-3 max-w-[210px] text-right" style={{ top: "36%", right: 64 }}>
        <span className="font-prata text-2xl text-white pb-2.5 border-b border-white/45 block tracking-[-0.01em]">New Necklace</span>
        <p className="font-lato text-sm text-white/78 leading-[1.6]">Discover handcrafted necklaces that complement your unique personality.</p>
      </div>

      {/* Arrows */}
      <div className="absolute bottom-[72px] right-16 flex gap-3">
        {["M15 18l-6-6 6-6", "M9 18l6-6-6-6"].map((d, i) => (
          <button key={i} className="w-12 h-12 rounded-full border border-white/45 flex items-center justify-center text-white hover:bg-white/15 hover:border-white/70 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={d}/></svg>
          </button>
        ))}
      </div>
    </section>
  );
}
