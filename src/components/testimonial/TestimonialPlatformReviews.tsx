"use client";
import Image from "next/image";
import { useState } from "react";

const reviews = [
  {
    name: "John Doe",
    quote: "Cras tincidunt, sapien eget scelerisque tincidunt, est urna aliquet ex, a pretium elit nulla a lacus.",
    avatar: "/assets/images/testimonial/client-avatar.png",
  },
  {
    name: "John Doe",
    quote: "Cras tincidunt, sapien eget scelerisque tincidunt, est urna aliquet ex, a pretium elit nulla a lacus.",
    avatar: "/assets/images/testimonial/client-avatar.png",
  },
  {
    name: "John Doe",
    quote: "Cras tincidunt, sapien eget scelerisque tincidunt, est urna aliquet ex, a pretium elit nulla a lacus.",
    avatar: "/assets/images/testimonial/client-avatar.png",
  },
  {
    name: "John Doe",
    quote: "Cras tincidunt, sapien eget scelerisque tincidunt, est urna aliquet ex, a pretium elit nulla a lacus.",
    avatar: "/assets/images/testimonial/client-avatar.png",
  },
  {
    name: "John Doe",
    quote: "Cras tincidunt, sapien eget scelerisque tincidunt, est urna aliquet ex, a pretium elit nulla a lacus.",
    avatar: "/assets/images/testimonial/client-avatar.png",
  },
  {
    name: "John Doe",
    quote: "Cras tincidunt, sapien eget scelerisque tincidunt, est urna aliquet ex, a pretium elit nulla a lacus.",
    avatar: "/assets/images/testimonial/client-avatar.png",
  },
];

function ReviewCard({ name, quote, avatar, isMiddle }: typeof reviews[0] & { isMiddle: boolean }) {
  const accentColor = isMiddle ? "#552912" : "#D26E3A";

  return (
    <div className="tpr-card" style={{ marginLeft: isMiddle ? "-48px" : "0" }}>
      <div className="tpr-media">
        <div className="tpr-accent" style={{ backgroundColor: accentColor }} />
        <div className="tpr-avatar">
          <Image src={avatar} alt={name} fill sizes="82px" style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div className="tpr-content">
        <span className="font-prata tpr-name">{name}</span>
        <p className="font-lato tpr-quote-text">{quote}</p>
      </div>
      <span className="tpr-quotemark">&rdquo;</span>
    </div>
  );
}

export default function TestimonialPlatformReviews() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < reviews.length;
  const visible = reviews.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="tpr-section">
      {/* Left column */}
      <div className="tpr-left">
        <h2 className="font-prata tpr-title">Verified Reviews from Independent Platforms</h2>
        <p className="font-lato tpr-body">
          These reviews reflect real interactions — including consultations, purchases, and store visits.
        </p>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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

      {/* Right column — stacked cards, overflow visible for middle-card shift */}
      <div className="tpr-right">
        {visible.map((r, i) => (
          <ReviewCard key={startIndex + i} {...r} isMiddle={i === 1} />
        ))}
      </div>
    </section>
  );
}
