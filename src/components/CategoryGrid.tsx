"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Category = { id: string; name: string; slug: string; image: string };

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pages, setPages] = useState(1);

  const calculatePages = useCallback(() => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      const numPages = Math.round(scrollWidth / containerWidth);
      setPages(Math.max(1, numPages));
    }
  }, []);

  useEffect(() => {
    calculatePages();
    window.addEventListener("resize", calculatePages);
    return () => window.removeEventListener("resize", calculatePages);
  }, [calculatePages, categories]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.clientWidth;
      
      let newIndex = Math.round(scrollLeft / containerWidth);
      if (newIndex >= pages) newIndex = pages - 1;
      
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center gap-2 lg:gap-4 w-full overflow-hidden">
        <h2 className="font-prata text-[18px] sm:text-[22px] lg:text-[36px] font-normal leading-tight tracking-[-0.02em] text-dark truncate">
          Explore Our Sacred Collections
        </h2>
        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-[#E7DFD6] flex items-center justify-center text-dark hover:bg-black/5 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-brown flex items-center justify-center text-white hover:bg-[#431f0d] transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 lg:gap-[15px] overflow-x-auto no-scrollbar pb-2 lg:pb-0 scroll-smooth"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.slug.startsWith("/") ? cat.slug : `/products/category/${cat.slug}`}
            className="flex flex-col gap-3 cursor-pointer group flex-shrink-0 w-[220px] sm:w-[240px] lg:w-[calc(20%-12px)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden h-[260px] sm:h-[280px] lg:h-[276px] rounded-sm">
              <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 767px) 240px, 20vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
            </div>
            <p className="font-prata text-base lg:text-xl font-normal text-center text-dark">{cat.name}</p>
          </Link>
        ))}
      </div>

      {/* Dots indicator (mobile only) */}
      {pages > 1 && (
        <div className="flex lg:hidden justify-center items-center gap-1.5 mt-2">
          {Array.from({ length: pages }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === activeIndex ? "bg-[#BB5A28]" : "bg-black/20"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
