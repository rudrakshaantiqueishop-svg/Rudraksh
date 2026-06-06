"use client";

import Image from "next/image";
import Link from "next/link";

type Product = { id: number; img: string; name: string; price: string; original: string };

const ProductCard = ({ p }: { p: Product }) => (
  <div className="group/card cursor-pointer">
    <div className="relative overflow-hidden mb-3" style={{ height: "370px" }}>
      <Image src={p.img} alt={p.name} fill sizes="25vw" style={{ objectFit: "cover", transition: "transform 0.4s ease" }} className="group-hover/card:scale-105" />
      <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-stretch" style={{ height: "48px" }}>
        <button onClick={(e) => e.stopPropagation()} style={{ width: "50px", flexShrink: 0, background: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#552912" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button onClick={(e) => e.stopPropagation()} style={{ flex: 1, background: "#552912", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="font-lato text-white" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em" }}>ADD TO CART</span>
        </button>
      </div>
    </div>
    <p className="font-prata" style={{ fontSize: "15px", lineHeight: "140%", color: "#0B0404", margin: "0 0 5px 0" }}>{p.name}</p>
    <div className="flex items-center gap-2">
      <span className="font-lato" style={{ fontSize: "14px", fontWeight: 500, color: "#0B0404" }}>{p.price}</span>
      <span className="font-lato" style={{ fontSize: "12px", color: "#A8A29E", textDecoration: "line-through" }}>{p.original}</span>
    </div>
  </div>
);

const products: Product[] = [
  { id: 1,  img: "/assets/images/about/about-sacred-1.png",     name: "Lorem Ipsum", price: "$230.00", original: "$250.00" },
  { id: 2,  img: "/assets/images/about/about-sacred-2.png",     name: "Lorem Ipsum", price: "$120.00", original: "$130.00" },
  { id: 3,  img: "/assets/images/about/about-founding-1.png",   name: "Lorem Ipsum", price: "$180.00", original: "$200.00" },
  { id: 4,  img: "/assets/images/about/about-founding-2.png",   name: "Lorem Ipsum", price: "$280.00", original: "$300.00" },
  { id: 5,  img: "/assets/images/about/about-p02.png",          name: "Lorem Ipsum", price: "$200.00", original: "$220.00" },
  { id: 6,  img: "/assets/images/about/about-principle-3.png",  name: "Lorem Ipsum", price: "$240.00", original: "$250.00" },
  { id: 7,  img: "/assets/images/about/about-p04.png",          name: "Lorem Ipsum", price: "$140.00", original: "$150.00" },
  { id: 8,  img: "/assets/images/about/about-p01-3021a5.png",   name: "Lorem Ipsum", price: "$160.00", original: "$170.00" },
];

export default function BestsellerProducts() {
  return (
    <section className="h-px-section py-[60px] lg:py-[80px]" style={{ background: "#FEF9F2" }}>

      {/* Header */}
      <div className="flex flex-col items-start gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between lg:mb-10">
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
            style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "0.05em", color: "#44403C" }}
          >
            VIEW ALL
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover/viewall:stroke-[#BB5A28] transition-colors" stroke="#44403C" strokeWidth="1.5">
            <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Desktop: 4×2 grid | Mobile: 2 horizontally scrollable rows */}

      {/* Desktop grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>

      {/* Mobile: 2 scroll rows */}
      <div className="flex flex-col gap-4 lg:hidden">
        {[products.slice(0, 4), products.slice(4, 8)].map((row, ri) => (
          <div
            key={ri}
            className="flex gap-3 overflow-x-auto no-scrollbar pb-2"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {row.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0"
                style={{ width: "301px", scrollSnapAlign: "start" }}
              >
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
}
