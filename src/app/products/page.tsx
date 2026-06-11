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

export default function ProductsPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ProductsHero />
      <CategoryIntro />
      <ProductListing />
      <ExploreDesigns />
      <VerificationChecklist />
      <CategoryFitCheck />
      <JourneyHighlights />
      <GetMoreInsights />
      <ProductsFAQ />
      <BlogStillUnsure />
    </div>
  );
}
