"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const videos = [
  { thumb: "/assets/images/home/beads.png", youtubeId: "dQw4w9WgXcQ" },
  { thumb: "/assets/images/home/beads.png", youtubeId: "dQw4w9WgXcQ" },
  { thumb: "/assets/images/home/beads.png", youtubeId: "dQw4w9WgXcQ" },
  { thumb: "/assets/images/home/beads.png", youtubeId: "dQw4w9WgXcQ" },
];

export default function ExperiencesSharedByCustomers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section className="esc-section section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* Header row */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="font-prata" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "130%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
          Experiences Shared by Customers
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

      {/* Scrollable video strip */}
      <div
        ref={scrollRef}
        className="esc-scroll no-scrollbar"
        style={{ display: "flex", flex: 1, flexDirection: "row", gap: "40px", overflowX: "auto", scrollSnapType: "x mandatory" }}
      >
        {videos.map((video, i) => (
          <div
            key={i}
            className="esc-video"
            style={{ flex: 1, minWidth: "301px", height: "451px", position: "relative", overflow: "hidden", scrollSnapAlign: "start", background: "#0B0404" }}
          >
            {playingIndex === i ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                title={`Customer experience video ${i + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <>
                <Image
                  src={video.thumb}
                  alt={`Customer experience ${i + 1}`}
                  fill
                  sizes="301px"
                  style={{ objectFit: "cover" }}
                />
                <button
                  onClick={() => setPlayingIndex(i)}
                  aria-label="Play video"
                  style={{
                    position: "absolute", top: "16px", left: "16px",
                    width: "48px", height: "48px",
                    border: "1px solid rgba(255,255,255,0.8)",
                    background: "rgba(0,0,0,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
