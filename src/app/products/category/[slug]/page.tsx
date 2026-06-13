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
import ProductListing from "@/components/products/ProductListing";
import ExploreDesigns from "@/components/products/ExploreDesigns";
import VerificationChecklist from "@/components/products/VerificationChecklist";
import CategoryFitCheck from "@/components/products/CategoryFitCheck";
import JourneyHighlights from "@/components/products/JourneyHighlights";
import GetMoreInsights from "@/components/products/GetMoreInsights";
import ProductsFAQ from "@/components/products/ProductsFAQ";
import BlogStillUnsure from "@/components/blog/BlogStillUnsure";

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
      <ExploreDesigns />
      <VerificationChecklist pageContent={pageContent} />
      <CategoryFitCheck pageContent={pageContent} />
      <JourneyHighlights />
      <GetMoreInsights />
      <ProductsFAQ />
      <BlogStillUnsure />
    </div>
  );
}
