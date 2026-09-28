import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import CategoryDisabledView from "@/components/products/CategoryDisabledView";
import { getCategoryWithSubcategories, getPageContent, getCategories } from "@/lib/products";
import ProductsHero from "@/components/products/ProductsHero";
import CategoryIntro from "@/components/products/CategoryIntro";
import SubcategoryGrid from "@/components/products/SubcategoryGrid";
import SubcategoryProductListing from "@/components/products/SubcategoryProductListing";
import { computeFacets, filterProducts, parseFilters, getPriceBounds } from "@/lib/product-utils";

const VerificationChecklist = dynamic(() => import("@/components/products/VerificationChecklist"));
const CategoryFitCheck = dynamic(() => import("@/components/products/CategoryFitCheck"));
const JourneyHighlights = dynamic(() => import("@/components/products/JourneyHighlights"));
const GetMoreInsights = dynamic(() => import("@/components/products/GetMoreInsights"));
const ProductsFAQ = dynamic(() => import("@/components/products/ProductsFAQ"));
const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug: rawSlug } = await params;
  const sp = await searchParams;
  const slug = decodeURIComponent(rawSlug).replace(/\s+/g, '-');
  const category = await getCategoryWithSubcategories(slug);

  if (!category) {
    notFound();
  }

  if (category.isActive === false) {
    const allCategories = await getCategories();
    const activeAlternatives = allCategories.filter((c) => c.slug !== category.slug && (c.isActive ?? true));
    return (
      <CategoryDisabledView
        categoryName={category.name}
        categoryImage={category.image}
        otherCategories={activeAlternatives}
      />
    );
  }

  const pageContent = getPageContent(category);
  // Use the DB displayType to decide: PRODUCT_LISTING = direct listing, everything else = subcategory grid.
  const isDirectListing = category.displayType === "PRODUCT_LISTING" ||
    (category.subcategories && category.subcategories.length === 0);

  // Only fetch these if we need to render the direct product listing
  const allProducts = isDirectListing
    ? await import("@/lib/products").then(m => m.getProductsByCategory(category.slug))
    : [];

  const filters = parseFilters(sp);
  const facets = computeFacets(allProducts);
  const filtered = filterProducts(allProducts, filters);
  const priceBounds = getPriceBounds(allProducts);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ProductsHero pageContent={pageContent} />
      <CategoryIntro pageContent={pageContent} fallbackImage={category.image} />
      {isDirectListing ? (
        <SubcategoryProductListing
          products={filtered}
          facets={facets}
          priceBounds={priceBounds}
        />
      ) : (
        <SubcategoryGrid
          categorySlug={category.slug}
          categoryName={category.name}
          subcategories={category.subcategories}
        />
      )}
      <VerificationChecklist pageContent={pageContent} />
      <CategoryFitCheck pageContent={pageContent} />
      <JourneyHighlights />
      <GetMoreInsights categoryId={category.id} />
      <ProductsFAQ />
      <BlogStillUnsure />
    </div>
  );
}
