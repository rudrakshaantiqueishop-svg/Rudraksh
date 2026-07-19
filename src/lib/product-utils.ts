export type ProductImageLite = { url: string; alt: string; role: string };

export function getMainImage(images: ProductImageLite[]): ProductImageLite | undefined {
  return images.find((i) => i.role === "MAIN") ?? images[0];
}

export type ExploreDesignItem = {
  title: string;
  description: string;
  image: string;
};

export type CategoryPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  introHeading: string;
  introDescription: string;
  introImage: string;
  checklistHeading: string;
  checklist: string[];
  checklistImages: [string, string];
  fitCheckRightLabel: string;
  fitCheckRightItems: string[];
  fitCheckWrongLabel: string;
  fitCheckWrongItems: string[];
  fitCheckImage: string;
  exploreDesigns: {
    heading: string;
    description: string;
    items: ExploreDesignItem[];
  };
};

export function getPageContent(category: { pageContent: unknown }): CategoryPageContent {
  return category.pageContent as CategoryPageContent;
}

export function getSizeCounts(products: { sizes: { label: string }[] }[]): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    for (const s of p.sizes) {
      counts.set(s.label, (counts.get(s.label) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries()).map(([label, count]) => ({ label, count }));
}

export function getPriceBounds(products: { priceCents: number }[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };
  let min = products[0].priceCents;
  let max = products[0].priceCents;
  for (const p of products) {
    if (p.priceCents < min) min = p.priceCents;
    if (p.priceCents > max) max = p.priceCents;
  }
  return { min, max };
}

// ---------------------------------------------------------------------
// Filter attributes ("Pro Tip" facets)
// ---------------------------------------------------------------------

// Minimal product shape the facet/filter helpers operate on. Kept loose so it
// works with both DB rows and admin/list projections.
export type FacetProduct = {
  priceCents: number;
  stockCount: number;
  mukhi: number | null;
  origin: string | null;
  gemstoneType: string | null;
  certified: boolean;
  energized: boolean;
  zodiac: string | null;
  planet: string | null;
  chakra: string | null;
  sizeMm: number | null;
  collections?: { slug: string; name: string }[];
};

export type ProductFilters = {
  minPriceCents?: number;
  maxPriceCents?: number;
  mukhi?: string[];
  origin?: string[];
  gemstoneType?: string[];
  planet?: string[];
  chakra?: string[];
  zodiac?: string[];
  purpose?: string[]; // collection slugs
  certified?: boolean;
  energized?: boolean;
  inStock?: boolean;
};

// A single facet group rendered in the sidebar.
export type Facet = {
  key: keyof ProductFilters;
  label: string;
  options: { value: string; label: string; count: number }[];
};

function tally(
  products: FacetProduct[],
  get: (p: FacetProduct) => (string | null)[] | string | null
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of products) {
    const raw = get(p);
    const values = Array.isArray(raw) ? raw : [raw];
    for (const v of values) {
      if (v == null || v === "") continue;
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
  }
  return counts;
}

function toOptions(counts: Map<string, number>, labelFn?: (v: string) => string) {
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
    .map(([value, count]) => ({ value, label: labelFn ? labelFn(value) : value, count }));
}

// Builds the sidebar facets present in a set of products (only non-empty
// attribute groups appear — e.g. `mukhi` shows only for Rudraksha).
export function computeFacets(products: FacetProduct[]): Facet[] {
  const facets: Facet[] = [];

  const mukhi = tally(products, (p) => (p.mukhi != null ? String(p.mukhi) : null));
  if (mukhi.size > 0)
    facets.push({ key: "mukhi", label: "Mukhi", options: toOptions(mukhi, (v) => `${v} Mukhi`) });

  const gem = tally(products, (p) => p.gemstoneType);
  if (gem.size > 0) facets.push({ key: "gemstoneType", label: "Gemstone", options: toOptions(gem) });

  const origin = tally(products, (p) => p.origin);
  if (origin.size > 0) facets.push({ key: "origin", label: "Origin", options: toOptions(origin) });

  const purpose = tally(products, (p) => (p.collections ?? []).map((c) => c.slug));
  if (purpose.size > 0) {
    const nameBySlug = new Map<string, string>();
    for (const p of products) for (const c of p.collections ?? []) nameBySlug.set(c.slug, c.name);
    facets.push({
      key: "purpose",
      label: "Purpose",
      options: toOptions(purpose, (v) => nameBySlug.get(v) ?? v),
    });
  }

  const planet = tally(products, (p) => p.planet);
  if (planet.size > 0) facets.push({ key: "planet", label: "Planet", options: toOptions(planet) });

  const zodiac = tally(products, (p) => p.zodiac);
  if (zodiac.size > 0) facets.push({ key: "zodiac", label: "Zodiac", options: toOptions(zodiac) });

  const chakra = tally(products, (p) => p.chakra);
  if (chakra.size > 0) facets.push({ key: "chakra", label: "Chakra", options: toOptions(chakra) });

  return facets;
}

export function filterProducts<T extends FacetProduct>(products: T[], f: ProductFilters): T[] {
  return products.filter((p) => {
    if (f.minPriceCents != null && p.priceCents < f.minPriceCents) return false;
    if (f.maxPriceCents != null && p.priceCents > f.maxPriceCents) return false;
    if (f.certified && !p.certified) return false;
    if (f.energized && !p.energized) return false;
    if (f.inStock && p.stockCount <= 0) return false;
    if (f.mukhi?.length && !(p.mukhi != null && f.mukhi.includes(String(p.mukhi)))) return false;
    if (f.origin?.length && !(p.origin && f.origin.includes(p.origin))) return false;
    if (f.gemstoneType?.length && !(p.gemstoneType && f.gemstoneType.includes(p.gemstoneType))) return false;
    if (f.planet?.length && !(p.planet && f.planet.includes(p.planet))) return false;
    if (f.zodiac?.length && !(p.zodiac && f.zodiac.includes(p.zodiac))) return false;
    if (f.chakra?.length && !(p.chakra && f.chakra.includes(p.chakra))) return false;
    if (f.purpose?.length) {
      const slugs = (p.collections ?? []).map((c) => c.slug);
      if (!f.purpose.some((v) => slugs.includes(v))) return false;
    }
    return true;
  });
}

// Parse URL search params (string | string[]) into a ProductFilters object.
export function parseFilters(sp: Record<string, string | string[] | undefined>): ProductFilters {
  const arr = (v: string | string[] | undefined): string[] | undefined => {
    if (v == null) return undefined;
    const list = (Array.isArray(v) ? v : v.split(",")).map((s) => s.trim()).filter(Boolean);
    return list.length ? list : undefined;
  };
  const num = (v: string | string[] | undefined): number | undefined => {
    const s = Array.isArray(v) ? v[0] : v;
    if (s == null || s === "") return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  };
  const minR = num(sp.minPrice);
  const maxR = num(sp.maxPrice);
  return {
    minPriceCents: minR != null ? minR * 100 : undefined,
    maxPriceCents: maxR != null ? maxR * 100 : undefined,
    mukhi: arr(sp.mukhi),
    origin: arr(sp.origin),
    gemstoneType: arr(sp.gemstoneType),
    planet: arr(sp.planet),
    chakra: arr(sp.chakra),
    zodiac: arr(sp.zodiac),
    purpose: arr(sp.purpose),
    certified: sp.certified === "1" || sp.certified === "true",
    energized: sp.energized === "1" || sp.energized === "true",
    inStock: sp.inStock === "1" || sp.inStock === "true",
  };
}
