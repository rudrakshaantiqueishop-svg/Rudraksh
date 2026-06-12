"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const products = [
  { name: "Lorem Ipsum", price: "$200.00", original: "$220.00", image: "/assets/images/products/category-bracelets.png" },
  { name: "Lorem Ipsum", price: "$240.00", original: "$250.00", image: "/assets/images/products/category-necklace.png" },
  { name: "Lorem Ipsum", price: "$140.00", original: "$150.00", image: "/assets/images/products/category-rings.png" },
  { name: "Lorem Ipsum", price: "$160.00", original: "$170.00", image: "/assets/images/products/category-charms.png" },
];

export default function SimilarProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h2 className="font-prata text-2xl lg:text-3xl text-dark m-0">Similar Products</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-[#E7DFD6] flex items-center justify-center text-dark"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-brown flex items-center justify-center text-white"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
        {products.map((p, i) => (
          <Link
            key={i}
            href="/products/4-mukhi-regular-rudraksha"
            className="flex flex-col gap-3 group flex-shrink-0 w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={p.image} alt={p.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-lato text-sm text-dark m-0">{p.name}</p>
              <p className="font-lato text-sm m-0 flex items-center gap-2">
                <span className="font-bold text-dark">{p.price}</span>
                <span className="text-gray-text line-through">{p.original}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
