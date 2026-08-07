import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import CategoryDisabledView from "@/components/products/CategoryDisabledView";
import { getCategoryWithSubcategories, getPageContent, getCategories } from "@/lib/products";
import ProductsHero from "@/components/products/ProductsHero";
import CategoryIntro from "@/components/products/CategoryIntro";
import SubcategoryGrid from "@/components/products/SubcategoryGrid";

const VerificationChecklist = dynamic(() => import("@/components/products/VerificationChecklist"));
const CategoryFitCheck = dynamic(() => import("@/components/products/CategoryFitCheck"));
const JourneyHighlights = dynamic(() => import("@/components/products/JourneyHighlights"));
const GetMoreInsights = dynamic(() => import("@/components/products/GetMoreInsights"));
const ProductsFAQ = dynamic(() => import("@/components/products/ProductsFAQ"));
const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ProductsHero pageContent={pageContent} />
      <CategoryIntro pageContent={pageContent} />
      <SubcategoryGrid
        categorySlug={category.slug}
        categoryName={category.name}
        subcategories={category.subcategories}
      />
      <VerificationChecklist pageContent={pageContent} />
      <CategoryFitCheck pageContent={pageContent} />
      <JourneyHighlights />
      <GetMoreInsights categoryId={category.id} />
      <ProductsFAQ />
      <BlogStillUnsure />
    </div>
  );
}
