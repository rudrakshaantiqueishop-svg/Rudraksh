"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Collection = { id: string; name: string; slug: string; icon: string };

export default function ShopByPurposeCarousel({ collections }: { collections: Collection[] }) {
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
  }, [calculatePages, collections]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.clientWidth;
      
      // Calculate which page we are on based on scroll position
      let newIndex = Math.round(scrollLeft / containerWidth);
      if (newIndex >= pages) newIndex = pages - 1;
      
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-0">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex lg:grid lg:grid-cols-8 gap-6 lg:gap-0 overflow-x-auto no-scrollbar pb-2 lg:pb-0 lg:overflow-x-visible scroll-smooth" 
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/products/collection/${c.slug}`}
            className="group/purpose flex flex-col items-center gap-3 no-underline flex-shrink-0 lg:flex-shrink"
            style={{ scrollSnapAlign: "start", minWidth: "80px", textDecoration: "none" }}
          >
            {/* Icon */}
            <div className="flex items-center justify-center" style={{ width: "clamp(52px,8vw,80px)", height: "clamp(52px,8vw,80px)" }}>
              <Image
                src={c.icon}
                alt={c.name}
                width={72}
                height={72}
                style={{ objectFit: "contain" }}
                className="group-hover/purpose:opacity-70 transition-opacity duration-200"
              />
            </div>
            {/* Label */}
            <span
              className="font-lato group-hover/purpose:text-[#BB5A28] transition-colors duration-200"
              style={{ fontSize: "clamp(11px,1.3vw,16px)", fontWeight: 400, lineHeight: "150%", color: "#44403C", textAlign: "center" }}
            >
              {c.name}
            </span>
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
