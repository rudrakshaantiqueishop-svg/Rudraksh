"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Category = { id: string; name: string; slug: string; image: string };

const VISIBLE_COUNT = 5;

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? categories : categories.slice(0, VISIBLE_COUNT);

  return (
    <>
      <div
        className="flex lg:grid lg:grid-cols-5 gap-3 lg:gap-[15px] overflow-x-auto no-scrollbar pb-2 lg:pb-0 lg:overflow-x-visible"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {visible.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/category/${cat.slug}`}
            className="flex flex-col gap-3 cursor-pointer group flex-shrink-0 lg:flex-shrink w-[180px] lg:w-full"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden h-[200px] lg:h-[276px]">
              <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 767px) 180px, 20vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
            </div>
            <p className="font-prata text-base lg:text-xl font-normal text-center text-dark">{cat.name}</p>
          </Link>
        ))}
      </div>

      {categories.length > VISIBLE_COUNT && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="font-lato text-sm font-bold tracking-[0.5px] text-dark border-b border-dark pb-1"
          >
            {showAll ? "VIEW LESS" : "VIEW MORE"}
          </button>
        </div>
      )}
    </>
  );
}
