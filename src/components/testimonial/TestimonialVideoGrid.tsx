"use client";
import Image from "next/image";
import { useState } from "react";

const videos = [
  { name: "Jalen Kyle", location: "Mumbai",    videoId: "dQw4w9WgXcQ" },
  { name: "Jalen Kyle", location: "Mumbai",    videoId: "dQw4w9WgXcQ" },
  { name: "Jalen Kyle", location: "Mumbai",    videoId: "dQw4w9WgXcQ" },
  { name: "Jalen Kyle", location: "Mumbai",    videoId: "dQw4w9WgXcQ" },
  { name: "Jalen Kyle", location: "Bangalore", videoId: "dQw4w9WgXcQ" },
  { name: "Jalen Kyle", location: "Delhi",     videoId: "dQw4w9WgXcQ" },
];

function VideoCard({ name, location, videoId }: { name: string; location: string; videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="tvg-card">
      {playing ? (
        /* YouTube iframe — autoplay on click */
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <>
          {/* Thumbnail */}
          <Image
            src="/assets/images/testimonial/client-avatar.png"
            alt={name}
            fill
            sizes="(max-width: 767px) 50vw, 25vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          {/* Bottom gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)",
          }} />
          {/* Bottom row: name/location left, play button right */}
          <div style={{
            position: "absolute", bottom: "16px", left: "16px", right: "16px",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span className="font-prata" style={{ fontSize: "16px", lineHeight: "120%", color: "#FFFFFF" }}>
                {name}
              </span>
              <span className="font-lato" style={{ fontSize: "13px", lineHeight: "140%", color: "rgba(255,255,255,0.75)" }}>
                {location}
              </span>
            </div>
            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(85,41,18,0.85)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}
            >
              {/* Play triangle */}
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M1 1.5L11 7L1 12.5V1.5Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Pause button overlay when playing */}
      {playing && (
        <button
          onClick={() => setPlaying(false)}
          aria-label="Stop video"
          style={{
            position: "absolute", bottom: "16px", right: "16px",
            width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(85,41,18,0.85)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 10,
          }}
        >
          {/* Pause bars */}
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="1" width="3.5" height="12" rx="1" fill="#FFFFFF" />
            <rect x="7.5" y="1" width="3.5" height="12" rx="1" fill="#FFFFFF" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function TestimonialVideoGrid() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < videos.length;

  const visible = videos.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="tvg-section">
      {/* Header */}
      <div className="tvg-header">
        <h2 className="font-prata tvg-title">Hear Directly from Our Customers</h2>
        <p className="font-lato tvg-subtitle">Real conversations often explain more than written reviews.</p>
      </div>

      {/* Video cards row */}
      <div className="tvg-cards-row">
        {visible.map((v, i) => (
          <VideoCard key={startIndex + i} name={v.name} location={v.location} videoId={v.videoId} />
        ))}
      </div>

      {/* Navigation arrows — centered below */}
      <div className="tvg-nav">
        <button
          onClick={() => canPrev && setStartIndex(startIndex - 1)}
          aria-label="Previous"
          style={{
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1px solid rgba(204,178,106,0.4)",
            background: "transparent", cursor: canPrev ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: canPrev ? 1 : 0.35, transition: "opacity 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M16.667 10H3.333M8.333 5l-5 5 5 5" stroke="#0B0404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => canNext && setStartIndex(startIndex + 1)}
          aria-label="Next"
          style={{
            width: "40px", height: "40px", borderRadius: "50%",
            border: "none", background: "#552912",
            cursor: canNext ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: canNext ? 1 : 0.4, transition: "opacity 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M3.333 10h13.334M11.667 5l5 5-5 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
