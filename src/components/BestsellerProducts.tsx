"use client";

import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { getMainImage } from "@/lib/product-utils";
import type { ProductImageLite } from "@/lib/product-utils";

type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  images: ProductImageLite[];
};

const ProductCard = ({ p }: { p: Product }) => {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const image = getMainImage(p.images);

  return (
    <Link href={`/products/${p.slug}`} className="group/card cursor-pointer block">
      <div className="relative overflow-hidden mb-3" style={{ height: "370px" }}>
        {image && <Image src={image.url} alt={image.alt} fill sizes="25vw" style={{ objectFit: "cover", transition: "transform 0.4s ease" }} className="group-hover/card:scale-105" />}
        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-stretch" style={{ height: "48px" }}>
          <button onClick={(e) => e.stopPropagation()} style={{ width: "50px", flexShrink: 0, background: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#552912" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addItem({
                id: p.id,
                productId: p.id,
                slug: p.slug,
                name: p.name,
                image: image?.url ?? "",
                unitPriceCents: p.priceCents,
              });
            }}
            style={{ flex: 1, background: "#552912", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <span className="font-lato text-white" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em" }}>ADD TO CART</span>
          </button>
        </div>
      </div>
      <p className="font-prata" style={{ fontSize: "15px", lineHeight: "140%", color: "#0B0404", margin: "0 0 5px 0" }}>{p.name}</p>
      <div className="flex items-center gap-2">
        <span className="font-lato" style={{ fontSize: "14px", fontWeight: 500, color: "#0B0404" }}>{formatPrice(p.priceCents)}</span>
        {p.compareAtPriceCents != null && (
          <span className="font-lato" style={{ fontSize: "12px", color: "#A8A29E", textDecoration: "line-through" }}>{formatPrice(p.compareAtPriceCents)}</span>
        )}
      </div>
    </Link>
  );
};

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
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
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
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
}
