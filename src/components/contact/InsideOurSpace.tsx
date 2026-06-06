"use client";

import { useRef } from "react";
import Image from "next/image";

const images = [
  "/assets/images/common/common.png",
  "/assets/images/common/common.png",
  "/assets/images/common/common.png",
  "/assets/images/common/common.png",
  "/assets/images/common/common.png",
  "/assets/images/common/common.png",
];

export default function InsideOurSpace() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section className="ios-section section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* Header row */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="font-prata" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "130%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
          Inside Our Space
        </h2>
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid #C4B8A8", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#0B0404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            style={{ width: "48px", height: "48px", borderRadius: "50%", border: "none", background: "#552912", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable image strip */}
      <div
        ref={scrollRef}
        className="ios-scroll no-scrollbar"
        style={{ display: "flex", flexDirection: "row", gap: "20px", overflowX: "auto", scrollSnapType: "x mandatory" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="ios-img"
            style={{ flexShrink: 0, width: "301px", height: "451px", position: "relative", overflow: "hidden", scrollSnapAlign: "start" }}
          >
            <Image
              src={src}
              alt={`Inside our space ${i + 1}`}
              fill
              sizes="301px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

    </section>
  );
}
