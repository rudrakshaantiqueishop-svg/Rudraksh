"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, LayoutGrid, List, SlidersHorizontal, ChevronUp, ChevronDown, Check, X } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { getMainImage, getPriceBounds } from "@/lib/product-utils";
import type { ProductImageLite } from "@/lib/product-utils";
import ProductCard from "@/components/ui/ProductCard";

type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  ratingCount: number;
  createdAt: Date | string;
  sizes: { label: string }[];
  images: ProductImageLite[];
};

type CategoryOption = {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
};

type SizeCount = { label: string; count: number };

type SortOption = "popularity" | "price-asc" | "price-desc" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  popularity: "SORT BY POPULARITY",
  "price-asc": "PRICE: LOW TO HIGH",
  "price-desc": "PRICE: HIGH TO LOW",
  newest: "NEWEST FIRST",
};

export default function ProductListing({
  products,
  categories,
  currentCategorySlug,
  categoryName,
  sizeCounts,
}: {
  products: Product[];
  categories: CategoryOption[];
  currentCategorySlug: string;
  categoryName: string;
  sizeCounts: SizeCount[];
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const priceBounds = useMemo(() => getPriceBounds(products), [products]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([priceBounds.min, priceBounds.max]);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const sizeMatch = selectedSizes.length === 0 || p.sizes.some((s) => selectedSizes.includes(s.label));
      const priceMatch = p.priceCents >= priceRange[0] && p.priceCents <= priceRange[1];
      return sizeMatch && priceMatch;
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popularity":
      default:
        sorted.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
    }
    return sorted;
  }, [products, selectedSizes, priceRange, sortBy]);

  const toggleSize = (label: string) => {
    setSelectedSizes((prev) => (prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]));
  };

  const isFiltered = selectedSizes.length > 0 || priceRange[0] !== priceBounds.min || priceRange[1] !== priceBounds.max;

  const clearFilters = () => {
    setSelectedSizes([]);
    setPriceRange([priceBounds.min, priceBounds.max]);
  };

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      {/* Breadcrumb */}
      <div className="font-lato text-xs tracking-[0.5px] uppercase text-gray-text mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brown transition-colors">
          Home
        </Link>
        <span>›</span>
        <span className="text-dark font-semibold">{categoryName}</span>
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
          <span className="font-lato text-sm text-gray-text">
            {products.length === 0
              ? "No products found"
              : visibleProducts.length === 0
                ? "No products match the selected filters"
                : `Showing 1–${visibleProducts.length} of ${products.length} results`}
          </span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="relative flex items-center justify-center gap-2 bg-brown text-white font-lato text-xs sm:text-sm font-medium tracking-[0.5px] whitespace-nowrap px-4 sm:px-5 py-2.5 flex-1 sm:flex-initial"
          >
            <SlidersHorizontal size={15} />
            FILTER
            {isFiltered && (
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#BB5A28] border-2 border-[#FEF9F2]" />
            )}
          </button>

          <div className="relative flex-1 sm:flex-initial">
            <button
              onClick={() => setIsSortOpen((v) => !v)}
              className="flex items-center justify-center gap-2 border border-[#E7DFD6] font-lato text-xs sm:text-sm font-medium text-dark whitespace-nowrap px-4 sm:px-5 py-2.5 w-full"
            >
              {SORT_LABELS[sortBy]}
              <ChevronDown size={15} />
            </button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-[101]" onClick={() => setIsSortOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-[102] bg-white border border-[#E7DFD6] min-w-full sm:min-w-[220px] shadow-md">
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`flex items-center justify-between gap-2 w-full text-left font-lato text-xs sm:text-sm whitespace-nowrap px-4 sm:px-5 py-2.5 hover:bg-[#FEF9F2] transition-colors ${
                        sortBy === option ? "text-brown font-semibold" : "text-dark"
                      }`}
                    >
                      {SORT_LABELS[option]}
                      {sortBy === option && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {visibleProducts.map((p) => {
          const image = getMainImage(p.images);
          return (
            <ProductCard key={p.id} product={p} imageClassName="aspect-square" />
          );
        })}
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
          <div className="flex items-center gap-4">
            {isFiltered && (
              <button onClick={clearFilters} className="font-lato text-xs font-bold tracking-[0.5px] text-brown underline">
                CLEAR ALL
              </button>
            )}
            <button onClick={() => setIsFilterOpen(false)} aria-label="Close filters" className="text-dark">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-lato text-base font-semibold text-dark m-0">Categories</h3>
            <ChevronUp size={16} className="text-dark" />
          </div>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => {
              const checked = cat.slug === currentCategorySlug;
              return (
                <Link key={cat.id} href={`/products/category/${cat.slug}`} className="flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                        checked ? "bg-brown border-brown" : "border-[#D6CFC4]"
                      }`}
                    >
                      {checked && <Check size={12} className="text-white" strokeWidth={3} />}
                    </span>
                    <span className="font-lato text-sm text-gray-text">{cat.name}</span>
                  </span>
                  <span className="font-lato text-sm text-gray-text">({cat._count.products})</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        {priceBounds.max > priceBounds.min && (
          <div className="flex flex-col gap-4 pt-7 border-t border-[#E7DFD6]">
            <div className="flex items-center justify-between">
              <h3 className="font-lato text-base font-semibold text-dark m-0">Price Range</h3>
              <ChevronUp size={16} className="text-dark" />
            </div>
            <p className="font-lato text-sm text-gray-text m-0">
              Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </p>
            <div className="relative h-1 bg-[#E7DFD6] rounded-full mt-1">
              <div
                className="absolute h-1 bg-brown rounded-full"
                style={{
                  left: `${((priceRange[0] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                  right: `${100 - ((priceRange[1] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceRange[0]}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), priceRange[1]);
                  setPriceRange([val, priceRange[1]]);
                }}
                className="range-thumb absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none"
              />
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceRange[1]}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), priceRange[0]);
                  setPriceRange([priceRange[0], val]);
                }}
                className="range-thumb absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none"
              />
            </div>
          </div>
        )}

        {/* Size */}
        {sizeCounts.length > 0 && (
          <div className="flex flex-col gap-4 pt-7 border-t border-[#E7DFD6]">
            <div className="flex items-center justify-between">
              <h3 className="font-lato text-base font-semibold text-dark m-0">Size</h3>
              <ChevronUp size={16} className="text-dark" />
            </div>
            <div className="flex flex-col gap-3">
              {sizeCounts.map((sz) => {
                const checked = selectedSizes.includes(sz.label);
                return (
                  <label key={sz.label} className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                          checked ? "bg-brown border-brown" : "border-[#D6CFC4]"
                        }`}
                      >
                        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
                      </span>
                      <input type="checkbox" checked={checked} onChange={() => toggleSize(sz.label)} className="hidden" />
                      <span className="font-lato text-sm text-gray-text">{sz.label}</span>
                    </span>
                    <span className="font-lato text-sm text-gray-text">({sz.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}
