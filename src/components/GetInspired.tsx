"use client";
import Image from "next/image";
import { useState } from "react";

const products = [
  { id: 1, img: "/images/about-sacred-1.png",   name: "Lorem Ipsum", price: "$230.00", original: "$250.00" },
  { id: 2, img: "/images/about-sacred-2.png",   name: "Lorem Ipsum", price: "$120.00", original: "$140.00" },
  { id: 3, img: "/images/about-founding-1.png", name: "Lorem Ipsum", price: "$180.00", original: "$200.00" },
  { id: 4, img: "/images/about-founding-2.png", name: "Lorem Ipsum", price: "$280.00", original: "$300.00" },
  { id: 5, img: "/images/about-p02.png",        name: "Lorem Ipsum", price: "$200.00", original: "$220.00" },
  { id: 6, img: "/images/about-p04.png",        name: "Lorem Ipsum", price: "$140.00", original: "$160.00" },
];

const VISIBLE = 4;

const ProductCard = ({ p, className, style }: { p: any, className?: string, style?: React.CSSProperties }) => (
  <div className={`group/card cursor-pointer ${className || ""}`} style={style}>
    {/* Image area */}
    <div className="relative overflow-hidden mb-3 h-[451px]">
      <Image
        src={p.img}
        alt={p.name}
        fill
        sizes="(max-width: 1024px) 301px, 25vw"
        style={{ objectFit: "cover", transition: "transform 0.4s ease", filter: "blur(2.5px)", transform: "scale(1.05)" }}
        className="group-hover/card:scale-110"
      />
      {/* Small thumbnail — top-left inset */}
      <div style={{
        position: "absolute", top: "10px", left: "10px",
        width: "76px", height: "76px", overflow: "hidden",
        border: "2px solid rgba(255,255,255,0.85)", zIndex: 2,
      }}>
        <Image src={p.img} alt="" fill sizes="76px" style={{ objectFit: "cover" }} />
      </div>
      {/* Hover overlay — heart + add to cart */}
      <div
        className="absolute bottom-0 left-0 right-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-stretch"
        style={{ height: "48px", zIndex: 3 }}
      >
        <button
          onClick={(e) => e.stopPropagation()}
          style={{ width: "50px", flexShrink: 0, background: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#552912" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          style={{ flex: 1, background: "#552912", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span className="font-lato text-white" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em" }}>ADD TO CART</span>
        </button>
      </div>
    </div>
    {/* Info */}
    <p className="font-prata" style={{ fontSize: "16px", lineHeight: "140%", color: "#0B0404", margin: "0 0 6px 0" }}>{p.name}</p>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span className="font-lato" style={{ fontSize: "15px", fontWeight: 500, color: "#0B0404" }}>{p.price}</span>
      <span className="font-lato" style={{ fontSize: "13px", color: "#A8A29E", textDecoration: "line-through" }}>{p.original}</span>
    </div>
  </div>
);

export default function GetInspired() {
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start + VISIBLE < products.length;
  const visible = products.slice(start, start + VISIBLE);

  return (
    <section className="h-px-section py-[60px] lg:py-[80px]" style={{ background: "#FEF9F2" }}>

      {/* Header */}
      <div className="flex flex-col items-start gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between lg:mb-[32px]">
        <h2
          className="font-prata text-3xl lg:text-[36px]"
          style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
        >
          Get Inspired
        </h2>

        {/* Nav arrows (desktop only since mobile is scrollable) */}
        <div className="hidden lg:flex gap-[12px] items-center">
          <button
            onClick={() => canPrev && setStart(start - 1)}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.18)",
              background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: canPrev ? "pointer" : "not-allowed",
              opacity: canPrev ? 1 : 0.4,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#44403C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            onClick={() => canNext && setStart(start + 1)}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "#552912",
              border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: canNext ? "pointer" : "not-allowed",
              opacity: canNext ? 1 : 0.5,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Cards row */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-5">
        {visible.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {/* Mobile Cards (Scrollable) */}
      <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-4 pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {products.map((p) => (
          <ProductCard key={p.id} p={p} className="flex-shrink-0 w-[301px]" style={{ scrollSnapAlign: "start" }} />
        ))}
      </div>

    </section>
  );
}
