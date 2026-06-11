"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, LayoutGrid, List, SlidersHorizontal, ChevronUp, ChevronDown, Check, X } from "lucide-react";

const categories = [
  { label: "Lorem Ipsum", count: 120, checked: true },
  { label: "Lorem Ipsum", count: 240, checked: false },
  { label: "Lorem Ipsum", count: 175, checked: false },
  { label: "Lorem Ipsum", count: 120, checked: false },
];

const sizes = [
  { label: "<18mm", count: 120 },
  { label: "<20mm", count: 240 },
  { label: "<24mm", count: 175 },
  { label: "<28mm", count: 120 },
];

const products = [
  { name: "Lorem Ipsum", price: 120, oldPrice: 130, image: "/assets/images/products/category-bracelets.png" },
  { name: "Lorem Ipsum", price: 230, oldPrice: 250, image: "/assets/images/products/category-necklace.png" },
  { name: "Lorem Ipsum", price: 180, oldPrice: 200, image: "/assets/images/products/category-rings.png" },
  { name: "Lorem Ipsum", price: 150, oldPrice: 175, image: "/assets/images/products/category-charms.png" },
  { name: "Lorem Ipsum", price: 95, oldPrice: 120, image: "/assets/images/products/category-earrings.png" },
];

export default function ProductListing() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      {/* Breadcrumb */}
      <div className="font-lato text-xs tracking-[0.5px] uppercase text-gray-text mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brown transition-colors">
          Home
        </Link>
        <span>›</span>
        <span className="text-dark font-semibold">Rudraksha Beads</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 bg-brown text-white">
            <LayoutGrid size={15} />
          </div>
          <div className="flex items-center justify-center w-8 h-8 border border-[#E7DFD6] text-gray-text">
            <List size={15} />
          </div>
          <span className="font-lato text-sm text-gray-text">Showing 1–10 of 60 results</span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center justify-center gap-2 bg-brown text-white font-lato text-xs sm:text-sm font-medium tracking-[0.5px] whitespace-nowrap px-4 sm:px-5 py-2.5 flex-1 sm:flex-initial"
          >
            <SlidersHorizontal size={15} />
            FILTER
          </button>
          <button className="flex items-center justify-center gap-2 border border-[#E7DFD6] font-lato text-xs sm:text-sm font-medium text-dark whitespace-nowrap px-4 sm:px-5 py-2.5 flex-1 sm:flex-initial">
            SORT BY POPULARITY
            <ChevronDown size={15} />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {products.map((p, i) => (
          <div key={i} className="flex flex-col gap-3 group">
            <div className="relative aspect-square overflow-hidden bg-[#F0E8DD]">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={16} className="text-dark" />
              </button>
              <button className="absolute bottom-3 left-3 right-3 bg-brown text-white font-lato text-xs font-bold tracking-[0.8px] py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                ADD TO CART
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-lato text-sm text-dark m-0">{p.name}</p>
              <p className="font-lato text-sm m-0 flex items-center gap-2">
                <span className="font-bold text-dark">${p.price.toFixed(2)}</span>
                <span className="text-gray-text line-through">${p.oldPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter backdrop */}
      <div
        onClick={() => setIsFilterOpen(false)}
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Filter drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-[101] w-[85%] max-w-[320px] bg-[#FEF9F2] overflow-y-auto p-6 flex flex-col gap-7 transition-transform duration-300 ease-in-out ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-prata text-xl text-dark m-0">Filters</h2>
          <button onClick={() => setIsFilterOpen(false)} aria-label="Close filters" className="text-dark">
            <X size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-lato text-base font-semibold text-dark m-0">Categories</h3>
            <ChevronUp size={16} className="text-dark" />
          </div>
          <div className="flex flex-col gap-3">
            {categories.map((cat, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2.5">
                  <span
                    className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                      cat.checked ? "bg-brown border-brown" : "border-[#D6CFC4]"
                    }`}
                  >
                    {cat.checked && <Check size={12} className="text-white" strokeWidth={3} />}
                  </span>
                  <span className="font-lato text-sm text-gray-text">{cat.label}</span>
                </span>
                <span className="font-lato text-sm text-gray-text">({cat.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-4 pt-7 border-t border-[#E7DFD6]">
          <div className="flex items-center justify-between">
            <h3 className="font-lato text-base font-semibold text-dark m-0">Price Range</h3>
            <ChevronUp size={16} className="text-dark" />
          </div>
          <p className="font-lato text-sm text-gray-text m-0">Price: $0 - $2000</p>
          <div className="relative h-1 bg-[#E7DFD6] rounded-full mt-1">
            <div className="absolute inset-0 bg-brown rounded-full" />
            <div className="absolute -top-1.5 left-0 w-4 h-4 bg-brown rounded-full border-2 border-[#FEF9F2]" />
            <div className="absolute -top-1.5 right-0 w-4 h-4 bg-brown rounded-full border-2 border-[#FEF9F2]" />
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-4 pt-7 border-t border-[#E7DFD6]">
          <div className="flex items-center justify-between">
            <h3 className="font-lato text-base font-semibold text-dark m-0">Size</h3>
            <ChevronUp size={16} className="text-dark" />
          </div>
          <div className="flex flex-col gap-3">
            {sizes.map((sz, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2.5">
                  <span className="w-4 h-4 border border-[#D6CFC4] shrink-0" />
                  <span className="font-lato text-sm text-gray-text">{sz.label}</span>
                </span>
                <span className="font-lato text-sm text-gray-text">({sz.count})</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
