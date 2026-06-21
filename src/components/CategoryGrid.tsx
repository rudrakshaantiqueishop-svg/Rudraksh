"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Category = { id: string; name: string; slug: string; image: string };

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="sbc-header flex justify-between items-center gap-3">
        <h2 className="font-prata title-fluid font-normal leading-[1.29] tracking-[-0.02em] text-dark">
          Explore Our Sacred Collections
        </h2>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-[#E7DFD6] flex items-center justify-center text-dark hover:bg-black/5 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-brown flex items-center justify-center text-white hover:bg-[#431f0d] transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 lg:gap-[15px] overflow-x-auto no-scrollbar pb-2 lg:pb-0 scroll-smooth"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.slug.startsWith("/") ? cat.slug : `/products/category/${cat.slug}`}
            className="flex flex-col gap-3 cursor-pointer group flex-shrink-0 w-[180px] lg:w-[calc(20%-12px)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden h-[200px] lg:h-[276px] rounded-sm">
              <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 767px) 180px, 20vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
            </div>
            <p className="font-prata text-base lg:text-xl font-normal text-center text-dark">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
