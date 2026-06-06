import Image from "next/image";

const checkItems = [
  "100% authentic and certified products",
  "Energised with care and intention",
  "Ethical and responsible sourcing",
  "Transparent guidance and education",
  "Personal consultation available",
  "Ongoing post-purchase support",
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#552912" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WhyChooseUs() {
  return (
    <section className="section-pad" style={{ background: "#FEF9F2" }}>
      <div className="wcu-row flex flex-col lg:flex-row items-start gap-0">

        {/* ── Left: overlapping images + border rect ── */}
        <div className="wcu-images w-full lg:w-[540px] lg:flex-shrink-0 relative mt-10 lg:mt-0 h-[105vw] md:h-[70vw] lg:h-[570px] order-last lg:order-first">

          {/* Decorative border rectangle — behind images */}
          <div style={{
            position: "absolute",
            left: "15%",
            top: "15%",
            width: "70%",
            height: "70%",
            border: "3px solid #BB5A28",
            zIndex: 0,
          }} />

          {/* Image 1 — top-left (bracelets) */}
          <div style={{
            position: "absolute", left: 0, top: 0,
            width: "60%", height: "60%",
            overflow: "hidden", zIndex: 1,
          }}>
            <Image
              src="/assets/images/about/about-sacred-2.png"
              alt="Gemstone bracelets"
              fill
              sizes="(max-width: 1024px) 50vw, 310px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Image 2 — bottom-right (hand with bracelet) */}
          <div style={{
            position: "absolute", right: 0, bottom: 0,
            width: "60%", height: "60%",
            overflow: "hidden", zIndex: 2,
          }}>
            <Image
              src="/assets/images/about/who-we-are.png"
              alt="Rudraksha bracelet"
              fill
              sizes="(max-width: 1024px) 60vw, 328px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── Right: text content ── */}
        <div className="wcu-content flex-1 flex flex-col gap-6 lg:pl-16 order-first lg:order-last">

          <h2
            className="font-prata"
            style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
          >
            Why Choose Us?
          </h2>

          <p
            className="font-lato"
            style={{ fontSize: "16px", lineHeight: "170%", color: "#44403C", margin: 0 }}
          >
            Rooted in ancient Vedic wisdom, our work brings together traditional spiritual practices and
            modern standards of authenticity. Each Rudraksha and gemstone is chosen with care, tested
            for genuineness, and prepared with intention — ensuring you receive pieces that are true,
            pure, and meaningful.
          </p>

          {/* Checkmark list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {checkItems.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <CheckIcon />
                <span
                  className="font-lato"
                  style={{ fontSize: "15px", fontWeight: 400, lineHeight: "150%", color: "#44403C" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
