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

export default function GetInspired() {
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start + VISIBLE < products.length;
  const visible = products.slice(start, start + VISIBLE);

  return (
    <section style={{ background: "#FEF9F2", padding: "70px 70px 80px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <h2
          className="font-prata"
          style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
        >
          Get Inspired
        </h2>

        {/* Nav arrows */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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

      {/* Cards row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {visible.map((p) => (
          <div key={p.id} className="group/card" style={{ cursor: "pointer" }}>

            {/* Image area */}
            <div style={{ position: "relative", height: "451px", overflow: "hidden", marginBottom: "12px" }}>
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="25vw"
                style={{ objectFit: "cover", transition: "transform 0.4s ease", filter: "blur(2.5px)", transform: "scale(1.05)" }}
                className="group-hover/card:scale-110"
              />

              {/* Small thumbnail — top-left inset */}
              <div style={{
                position: "absolute", top: "10px", left: "10px",
                width: "76px", height: "76px",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.85)",
                zIndex: 2,
              }}>
                <Image
                  src={p.img}
                  alt=""
                  fill
                  sizes="76px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Hover overlay — heart + add to cart */}
              <div
                className="absolute bottom-0 left-0 right-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{ display: "flex", alignItems: "stretch", height: "48px", zIndex: 3 }}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "50px", flexShrink: 0, background: "white",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#552912" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: 1, background: "#552912", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span className="font-lato text-white" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em" }}>
                    ADD TO CART
                  </span>
                </button>
              </div>
            </div>

            {/* Info */}
            <p className="font-prata" style={{ fontSize: "16px", lineHeight: "140%", color: "#0B0404", margin: "0 0 6px 0" }}>
              {p.name}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="font-lato" style={{ fontSize: "15px", fontWeight: 500, color: "#0B0404" }}>{p.price}</span>
              <span className="font-lato" style={{ fontSize: "13px", color: "#A8A29E", textDecoration: "line-through" }}>{p.original}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
