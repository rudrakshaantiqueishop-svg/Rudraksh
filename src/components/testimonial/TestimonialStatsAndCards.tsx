"use client";
import Image from "next/image";
import { useState } from "react";

/* ── Stats data ── */
const stats = [
  { value: "5,000+", label: "Verified Customers" },
  { value: "40+",    label: "Countries Served" },
  { value: "1,200+", label: "Consultations Completed" },
  { value: "4.8 ★",  label: "Average Customer Rating" },
];

/* ── Testimonials data ── */
const testimonials = [
  { name: "Riya Shah",      location: "Mumbai",    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { name: "James Holloway", location: "London",    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { name: "Ananya Krishnan", location: "Bangalore",quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { name: "Marco Ferretti", location: "Milan",     quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { name: "Fatima Al-Rashid",location: "Dubai",    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { name: "David Chen",     location: "Singapore", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
];

/*
 * Connector SVG — pixel-perfect from Figma globalVars:
 *   Left circle:  cx=5.5  cy=5.5  r=5.5  (layout_CBV1AQ: x:0,  y:0, 11×11)
 *   Line:         x1=9 y1=7 → x2=57 y2=7  (layout_6QM22B: x:9, y:7, w:48, h:0)
 *   Right circle: cx=60.5 cy=5.5 r=5.5    (layout_CQFQ9G: x:55, y:0, 11×11)
 *   Fill: #A8A29E (fill_SULK9S)
 */
function Connector() {
  return (
    <svg width="66" height="11" viewBox="0 0 66 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5.5" cy="5.5" r="5.5" fill="#A8A29E" />
      <line x1="9" y1="7" x2="57" y2="7" stroke="#A8A29E" strokeWidth="1" />
      <circle cx="60.5" cy="5.5" r="5.5" fill="#A8A29E" />
    </svg>
  );
}

/*
 * Divider between cards — 24px wide (Figma gap = 441-417 = 24px).
 * Connectors are 66px wide centered in the 24px gap (overflow visible),
 * so they extend 21px into each adjacent card — matching Figma positions
 * x:396→462 (card boundary at 417/441).
 * top:10px / bottom:10px match Figma y:10 and y:349 (card height 370).
 */
function CardDivider() {
  return (
    <div className="tsc-card-divider">
      <div className="tsc-connector-top">
        <Connector />
      </div>
      <div className="tsc-connector-bottom">
        <Connector />
      </div>
    </div>
  );
}

export default function TestimonialStatsAndCards() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < testimonials.length;
  const cards = testimonials.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="tsc-wrapper">

      {/* ── Section 1: Stats ── */}
      <section className="tsc-stats-section">
        <div className="tsc-stats-inner">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "center" }}>
            <h2 className="font-prata tsc-heading">
              Built on Trust and Long-Term Relationships
            </h2>
            <p className="font-lato tsc-subhead">
              Trust is not built through claims, but through consistent experiences.
            </p>
          </div>
          <div className="tsc-stats-row">
            {stats.map((s) => (
              <div key={s.label} className="tsc-stat">
                <span className="font-prata tsc-stat-value">{s.value}</span>
                <span className="font-lato tsc-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Client Stories ── */}
      {/* layout_HKQ3CU: column, gap 48px, padding 100px 70px */}
      <section className="tsc-stories-section">

        {/* Header row — layout_RDFDWL: row, alignItems center, gap 16px */}
        <div className="tsc-stories-header">
          {/* Title: Prata 36px, lineHeight 129%, letterSpacing -2%, #0B0404 */}
          <h2 className="font-prata tsc-stories-title">Client Stories</h2>

          {/* Nav arrows — layout_RW28YK: row, gap 16px */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {/* Left: 48×48, borderRadius 24px, border rgba(204,178,106,0.4) */}
            <button
              onClick={() => canPrev && setStartIndex(startIndex - 1)}
              aria-label="Previous"
              style={{
                width: "48px", height: "48px", borderRadius: "24px",
                border: "1px solid rgba(204,178,106,0.4)",
                background: "transparent", cursor: canPrev ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: canPrev ? 1 : 0.35, transition: "opacity 0.2s",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 10H3.333M8.333 5l-5 5 5 5" stroke="#0B0404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Right: 48×48, borderRadius 24px, fill #552912 */}
            <button
              onClick={() => canNext && setStartIndex(startIndex + 1)}
              aria-label="Next"
              style={{
                width: "48px", height: "48px", borderRadius: "24px",
                border: "none", background: "#552912",
                cursor: canNext ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: canNext ? 1 : 0.4, transition: "opacity 0.2s",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.333 10h13.334M11.667 5l5 5-5 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards row with connectors */}
        {/* Group 1000001478: 1299×370, 3 cards at x:0/441/882, gap 24px */}
        <div className="tsc-cards-row">
          {cards.map((t, i) => (
            <>
              {/* Card — layout_JVPMJB: column, gap 10px, padding 30px */}
              {/* fill_134OQE #FFFFFF, border fill_GEO6E7 rgba(204,178,106,0.4) */}
              <div key={t.name} className="tsc-story-card">
                {/* layout_L1N222: column, center, gap 16px */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  {/* Avatar: 100×100, borderRadius 100px */}
                  <div style={{ width: "100px", height: "100px", borderRadius: "100px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                    <Image
                      src="/assets/images/testimonial/client-avatar.png"
                      alt={t.name}
                      fill
                      sizes="100px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  {/* Name + Location */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                    <p className="font-prata" style={{ fontSize: "24px", lineHeight: "28px", color: "#552912", margin: 0, textAlign: "center" }}>
                      {t.name}
                    </p>
                    <p className="font-lato" style={{ fontSize: "16px", lineHeight: "140%", color: "#BB5A28", margin: 0, textAlign: "center" }}>
                      {t.location}
                    </p>
                  </div>
                </div>
                {/* Quote — style_H7HFU1: Lato 16px, 150% lh, CENTER, #44403C, width 357 */}
                <p className="font-lato tsc-story-quote">{t.quote}</p>
              </div>

              {/* Connector divider — positioned between cards */}
              {i < cards.length - 1 && <CardDivider key={`div-${i}`} />}
            </>
          ))}
        </div>

      </section>
    </div>
  );
}
