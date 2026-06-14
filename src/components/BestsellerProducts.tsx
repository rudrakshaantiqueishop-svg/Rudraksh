"use client";

import Link from "next/link";

import type { ProductImageLite } from "@/lib/product-utils";

type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  images: ProductImageLite[];
};

import ProductCard from "@/components/ui/ProductCard";

export default function BestsellerProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

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
          href="/products"
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
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Mobile: 2 scroll rows */}
      <div className="flex flex-col gap-4 lg:hidden">
        {[products.slice(0, 4), products.slice(4, 8)].filter((row) => row.length > 0).map((row, ri) => (
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
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
}
