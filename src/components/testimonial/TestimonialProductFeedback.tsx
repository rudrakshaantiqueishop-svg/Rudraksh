"use client";
import Image from "next/image";
import { useState } from "react";

const reviews = [
  {
    category: "5 MUKHI RUDRAKSHA",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Riya Shah",
    location: "Mumbai",
    rating: 5,
  },
  {
    category: "7 MUKHI RUDRAKSHA BRACELET",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Riya Shah",
    location: "Mumbai",
    rating: 5,
  },
  {
    category: "GEMSTONES",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Riya Shah",
    location: "Mumbai",
    rating: 5,
  },
  {
    category: "INDRAKSHI MALA",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Riya Shah",
    location: "Delhi",
    rating: 5,
  },
  {
    category: "9 MUKHI RUDRAKSHA",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "James Holloway",
    location: "London",
    rating: 5,
  },
  {
    category: "PANCHMUKHI MALA",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Ananya Krishnan",
    location: "Bangalore",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.33L9.79 5.73L14.67 6.11L11.05 9.27L12.18 14.04L8 11.47L3.82 14.04L4.95 9.27L1.33 6.11L6.21 5.73L8 1.33Z"
            fill={i < count ? "#BB5A28" : "#E7E5E4"}
            stroke={i < count ? "#BB5A28" : "#E7E5E4"}
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ category, quote, name, location, rating }: typeof reviews[0]) {
  return (
    <div className="tpf-card">
      {/* Avatar */}
      <div style={{
        width: "60px", height: "60px", borderRadius: "50%",
        overflow: "hidden", position: "relative", flexShrink: 0,
      }}>
        <Image
          src="/assets/images/testimonial/client-avatar.png"
          alt={name}
          fill
          sizes="60px"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Category badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#BB5A28", flexShrink: 0,
        }} />
        <span className="font-lato" style={{
          fontSize: "12px", lineHeight: "140%",
          letterSpacing: "0.08em", color: "#BB5A28",
          textTransform: "uppercase" as const,
        }}>
          {category}
        </span>
      </div>

      {/* Quote */}
      <p className="font-lato tpf-quote">{quote}</p>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #E7E5E4", margin: 0 }} />

      {/* Name + Stars + Location */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="font-prata" style={{ fontSize: "18px", lineHeight: "130%", color: "#0B0404" }}>
            {name}
          </span>
          <Stars count={rating} />
        </div>
        <span className="font-lato" style={{ fontSize: "13px", lineHeight: "140%", color: "#BB5A28" }}>
          {location}
        </span>
      </div>
    </div>
  );
}

export default function TestimonialProductFeedback() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < reviews.length;

  const visible = reviews.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="tpf-section">
      {/* Header row: title left, arrows right */}
      <div className="tpf-header">
        <h2 className="font-prata tpf-title">Feedback on Specific Rudraksha &amp; Gemstones</h2>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexShrink: 0 }}>
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
      </div>

      {/* Cards row */}
      <div className="tpf-cards-row">
        {visible.map((r, i) => (
          <ReviewCard key={startIndex + i} {...r} />
        ))}
      </div>
    </section>
  );
}
