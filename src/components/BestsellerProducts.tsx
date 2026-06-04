"use client";


import Image from "next/image";
import Link from "next/link";

const products = [
  { id: 1,  img: "/images/about-sacred-1.png",     name: "Lorem Ipsum", price: "$230.00", original: "$250.00" },
  { id: 2,  img: "/images/about-sacred-2.png",     name: "Lorem Ipsum", price: "$120.00", original: "$130.00" },
  { id: 3,  img: "/images/about-founding-1.png",   name: "Lorem Ipsum", price: "$180.00", original: "$200.00" },
  { id: 4,  img: "/images/about-founding-2.png",   name: "Lorem Ipsum", price: "$280.00", original: "$300.00" },
  { id: 5,  img: "/images/about-p02.png",          name: "Lorem Ipsum", price: "$200.00", original: "$220.00" },
  { id: 6,  img: "/images/about-principle-3.png",  name: "Lorem Ipsum", price: "$240.00", original: "$250.00" },
  { id: 7,  img: "/images/about-p04.png",          name: "Lorem Ipsum", price: "$140.00", original: "$150.00" },
  { id: 8,  img: "/images/about-p01-3021a5.png",   name: "Lorem Ipsum", price: "$160.00", original: "$170.00" },
];

export default function BestsellerProducts() {
  return (
    <section style={{ background: "#FEF9F2", padding: "70px 70px 80px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <h2
          className="font-prata"
          style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}
        >
          Bestseller Products
        </h2>
        <Link
          href="#"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            paddingBottom: "6px", borderBottom: "1px solid #44403C",
            textDecoration: "none",
          }}
          className="group/viewall"
        >
          <span
            className="font-lato group-hover/viewall:text-[#BB5A28] transition-colors"
            style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", color: "#44403C" }}
          >
            VIEW ALL
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover/viewall:stroke-[#BB5A28] transition-colors" stroke="#44403C" strokeWidth="1.5">
            <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
        {products.map((p) => (
          <div key={p.id} className="group/card" style={{ cursor: "pointer" }}>

            {/* Image */}
            <div style={{ position: "relative", height: "370px", overflow: "hidden", marginBottom: "12px" }}>
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="25vw"
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                className="group-hover/card:scale-105"
              />

              {/* Hover overlay — heart + add to cart */}
              <div
                className="absolute bottom-0 left-0 right-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{ display: "flex", alignItems: "stretch", height: "48px" }}
              >
                {/* Heart */}
                <button
                  style={{
                    width: "50px", flexShrink: 0,
                    background: "white",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#552912" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>

                {/* Add to cart */}
                <button
                  style={{
                    flex: 1,
                    background: "#552912",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    className="font-lato text-white"
                    style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em" }}
                  >
                    ADD TO CART
                  </span>
                </button>
              </div>
            </div>

            {/* Info */}
            <p
              className="font-prata"
              style={{ fontSize: "16px", lineHeight: "140%", color: "#0B0404", margin: "0 0 6px 0" }}
            >
              {p.name}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                className="font-lato"
                style={{ fontSize: "15px", fontWeight: 500, color: "#0B0404" }}
              >
                {p.price}
              </span>
              <span
                className="font-lato"
                style={{ fontSize: "13px", fontWeight: 400, color: "#A8A29E", textDecoration: "line-through" }}
              >
                {p.original}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
