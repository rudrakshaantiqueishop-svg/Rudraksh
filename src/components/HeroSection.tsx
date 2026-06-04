import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "780px" }}>

      {/* Background image */}
      <Image
        src="/images/hero-main.png"
        alt="Rudraksha necklace"
        fill
        className="object-cover"
        priority
      />
      {/* Dark tinted overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(85,41,18,0.3)" }} />

      {/* ── Left text block ── */}
      <div
        className="absolute flex flex-col"
        style={{ left: "64px", top: "394.5px", width: "686px", gap: "40px" }}
      >
        {/* Title + body */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          <h1
            className="font-prata text-white"
            style={{ fontSize: "72px", lineHeight: "125%", letterSpacing: "-0.02em", margin: 0 }}
          >
            Authenticity Meets Ancient Wisdom
          </h1>
          <p
            className="font-lato text-white"
            style={{ fontSize: "18px", lineHeight: "150%", margin: 0 }}
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
          <span className="font-lato text-white" style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%" }}>
            SHOP NOW
          </span>
          <Image src="/images/icon-shopnow-arrow.svg" alt="" width={24} height={24} />
        </div>
      </div>

      {/* ── Right annotation ── */}
      <div
        className="absolute flex flex-col"
        style={{ left: "1035px", top: "326px", gap: "16px" }}
      >
        <div style={{ paddingBottom: "16px", borderBottom: "1px solid white" }}>
          <span
            className="font-prata text-white"
            style={{ fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em" }}
          >
            New Necklace
          </span>
        </div>
        <p
          className="font-lato text-white"
          style={{ fontSize: "16px", lineHeight: "150%", margin: 0, maxWidth: "200px" }}
        >
          Discover handcrafted necklaces that complement your unique personality.
        </p>
      </div>

      {/* ── Circle spotlight + connector ── */}
      {/* Outer circle (Ellipse 2066) */}
      <div
        className="absolute pointer-events-none"
        style={{ left: "784px", top: "383px", width: "211px", height: "211px", opacity: 0.6 }}
      >
        <svg width="211" height="211" viewBox="0 0 211 211" fill="none">
          <circle cx="105.5" cy="105.5" r="105" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* Dot (Ellipse 2067) */}
      <div
        className="absolute pointer-events-none rounded-full bg-white"
        style={{ left: "884px", top: "378px", width: "11px", height: "11px" }}
      />

      {/* Horizontal connector line (Vector 192) */}
      <div
        className="absolute pointer-events-none"
        style={{ left: "887px", top: "383px", width: "151.5px", height: "1px", background: "white" }}
      />

      {/* ── Navigation buttons ── */}
      {/* Left arrow button (Ellipse 2069) */}
      <button
        className="absolute flex items-center justify-center"
        style={{
          left: "1092px", top: "652px", width: "64px", height: "64px",
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        <Image src="/images/icon-arrow-left.svg" alt="Previous" width={32} height={32} />
      </button>

      {/* Right arrow button (Ellipse 2068) */}
      <button
        className="absolute flex items-center justify-center"
        style={{
          left: "1172px", top: "652px", width: "64px", height: "64px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        <Image src="/images/icon-arrow-right.svg" alt="Next" width={32} height={32} />
      </button>

    </section>
  );
}
