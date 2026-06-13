import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategoriesWithProductCounts,
  getPageContent,
  getSizeCounts,
} from "@/lib/products";
import ProductsHero from "@/components/products/ProductsHero";
import CategoryIntro from "@/components/products/CategoryIntro";

const ProductListing = dynamic(() => import("@/components/products/ProductListing"));
const ExploreDesigns = dynamic(() => import("@/components/products/ExploreDesigns"));
const VerificationChecklist = dynamic(() => import("@/components/products/VerificationChecklist"));
const CategoryFitCheck = dynamic(() => import("@/components/products/CategoryFitCheck"));
const JourneyHighlights = dynamic(() => import("@/components/products/JourneyHighlights"));
const GetMoreInsights = dynamic(() => import("@/components/products/GetMoreInsights"));
const ProductsFAQ = dynamic(() => import("@/components/products/ProductsFAQ"));
const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    getProductsByCategory(slug),
    getCategoriesWithProductCounts(),
  ]);

  const pageContent = getPageContent(category);
  const sizeCounts = getSizeCounts(products);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ProductsHero pageContent={pageContent} />
      <CategoryIntro pageContent={pageContent} />
      <ProductListing
        products={products}
        categories={categories}
        currentCategorySlug={category.slug}
        categoryName={category.name}
        sizeCounts={sizeCounts}
      />
      <ExploreDesigns pageContent={pageContent} />
      <VerificationChecklist pageContent={pageContent} />
      <CategoryFitCheck pageContent={pageContent} />
      <JourneyHighlights />
      <GetMoreInsights />
      <ProductsFAQ />
      <BlogStillUnsure />
    </div>
  );
}
