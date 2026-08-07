import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryDisabledView from "@/components/products/CategoryDisabledView";
import { getSubcategoryBySlug, getProductsBySubcategory, getCategories } from "@/lib/products";
import { computeFacets, filterProducts, parseFilters, getPriceBounds } from "@/lib/product-utils";
import SubcategoryProductListing from "@/components/products/SubcategoryProductListing";

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; sub: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug, sub } = await params;
  const sp = await searchParams;

  const subcategory = await getSubcategoryBySlug(slug, sub);
  if (!subcategory) {
    notFound();
  }

  if (subcategory.category.isActive === false) {
    const allCategories = await getCategories();
    const activeAlternatives = allCategories.filter((c) => c.slug !== slug && (c.isActive ?? true));
    return (
      <CategoryDisabledView
        categoryName={subcategory.category.name}
        categoryImage={subcategory.category.image}
        otherCategories={activeAlternatives}
      />
    );
  }

  const allProducts = await getProductsBySubcategory(slug, sub);
  const filters = parseFilters(sp);
  const facets = computeFacets(allProducts);
  const filtered = filterProducts(allProducts, filters);
  const priceBounds = getPriceBounds(allProducts);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      {/* Breadcrumb + hero */}
      <div className="mx-auto w-full max-w-[1280px] px-3 pt-8 sm:px-6">
        <nav className="font-lato text-xs text-gray-text">
          <Link href="/" className="hover:text-dark">Home</Link>
          {" › "}
          <Link href={`/products/category/${slug}`} className="hover:text-dark">
            {subcategory.category.name}
          </Link>
          {" › "}
          <span className="text-dark">{subcategory.name}</span>
        </nav>
        <h1 className="mt-4 font-prata text-[30px] leading-tight text-dark">{subcategory.name}</h1>
        {subcategory.group && (
          <p className="mt-1 font-lato text-sm text-gray-text">{subcategory.group}</p>
        )}
      </div>

      <SubcategoryProductListing products={filtered} facets={facets} priceBounds={priceBounds} />
    </div>
  );
}
