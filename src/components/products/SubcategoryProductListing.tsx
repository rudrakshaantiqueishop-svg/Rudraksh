"use client";

import { useCallback, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import ProductCard, { type BaseProduct } from "@/components/ui/ProductCard";
import { useCurrency } from "@/components/CurrencyProvider";
import type { Facet } from "@/lib/product-utils";

type ListProduct = BaseProduct & {
  ratingCount: number;
  createdAt: Date | string;
};

// Facet keys that behave as multi-select lists in the URL (comma-joined).
const LIST_KEYS = ["mukhi", "origin", "gemstoneType", "planet", "zodiac", "chakra", "purpose"] as const;

export default function SubcategoryProductListing({
  products,
  facets,
  priceBounds,
}: {
  products: ListProduct[];
  facets: Facet[];
  priceBounds: { min: number; max: number };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { formatPrice } = useCurrency();

  const params = new URLSearchParams(searchParams.toString());

  const pushParams = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      startTransition(() => router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
    },
    [pathname, router]
  );

  const selectedFor = (key: string) => (params.get(key)?.split(",").filter(Boolean) ?? []);

  const toggleListValue = (key: string, value: string) => {
    const current = selectedFor(key);
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    const p = new URLSearchParams(params.toString());
    if (next.length) p.set(key, next.join(","));
    else p.delete(key);
    pushParams(p);
  };

  const toggleBool = (key: string) => {
    const p = new URLSearchParams(params.toString());
    if (p.get(key) === "1") p.delete(key);
    else p.set(key, "1");
    pushParams(p);
  };

  const setPrice = (key: "minPrice" | "maxPrice", value: string) => {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    pushParams(p);
  };

  const clearAll = () => startTransition(() => router.push(pathname, { scroll: false }));

  const activeCount =
    LIST_KEYS.reduce((n, k) => n + selectedFor(k).length, 0) +
    ["certified", "energized", "inStock"].filter((k) => params.get(k) === "1").length +
    (params.get("minPrice") ? 1 : 0) +
    (params.get("maxPrice") ? 1 : 0);

  const Sidebar = (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-prata text-lg text-dark">Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="font-lato text-xs text-[#BB5A28] underline">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-2">
        <span className="font-lato text-sm font-semibold text-dark">Price ({formatPrice(0).replace(/[\d.,\s]/g, "")})</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder={String(Math.floor(priceBounds.min / 100))}
            defaultValue={params.get("minPrice") ?? ""}
            onBlur={(e) => setPrice("minPrice", e.target.value)}
            className="w-full rounded border border-[#E7DFD6] bg-white px-2 py-1.5 font-lato text-sm"
          />
          <span className="text-gray-text">–</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder={String(Math.ceil(priceBounds.max / 100))}
            defaultValue={params.get("maxPrice") ?? ""}
            onBlur={(e) => setPrice("maxPrice", e.target.value)}
            className="w-full rounded border border-[#E7DFD6] bg-white px-2 py-1.5 font-lato text-sm"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-2">
        {(
          [
            ["certified", "Lab Certified"],
            ["energized", "Energized"],
            ["inStock", "In Stock Only"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex cursor-pointer items-center gap-2 font-lato text-sm text-dark">
            <input type="checkbox" checked={params.get(key) === "1"} onChange={() => toggleBool(key)} />
            {label}
          </label>
        ))}
      </div>

      {/* Attribute facets */}
      {facets.map((facet) => (
        <div key={facet.key} className="flex flex-col gap-2">
          <span className="font-lato text-sm font-semibold text-dark">{facet.label}</span>
          <div className="flex max-h-52 flex-col gap-1.5 overflow-y-auto pr-1">
            {facet.options.map((opt) => {
              const checked = selectedFor(facet.key).includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center justify-between gap-2 font-lato text-sm text-dark"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleListValue(facet.key, opt.value)}
                    />
                    {opt.label}
                  </span>
                  <span className="text-xs text-gray-text">{opt.count}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="mx-auto w-full max-w-[1280px] px-3 py-10 sm:px-6">
      {/* Mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen((o) => !o)}
          className="flex items-center gap-2 rounded border border-[#E7DFD6] px-3 py-2 font-lato text-sm text-dark"
        >
          <SlidersHorizontal size={16} /> Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <span className="font-lato text-sm text-gray-text">{products.length} results</span>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">{Sidebar}</aside>

        {/* Mobile drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-[#FEF9F2] p-5">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mb-4 flex items-center gap-1 font-lato text-sm text-dark"
              >
                <X size={16} /> Close
              </button>
              {Sidebar}
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1">
          <div className="mb-4 hidden items-center justify-between lg:flex">
            <span className="font-lato text-sm text-gray-text">{products.length} results</span>
            {isPending && <span className="font-lato text-xs text-gray-text">Updating…</span>}
          </div>
          {products.length === 0 ? (
            <p className="py-16 text-center font-lato text-gray-text">
              No products match these filters.{" "}
              <button onClick={clearAll} className="text-[#BB5A28] underline">
                Clear filters
              </button>
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-2.5 gap-y-8 sm:gap-x-4 md:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
