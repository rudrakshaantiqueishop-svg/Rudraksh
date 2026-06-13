import { notFound } from "next/navigation";
import { getProductBySlug, getSimilarProducts } from "@/lib/products";
import ProductDetailMain from "@/components/products/detail/ProductDetailMain";
import ProductReviews from "@/components/products/detail/ProductReviews";
import TraditionalSupport from "@/components/products/detail/TraditionalSupport";
import IsThisRightForYou from "@/components/products/detail/IsThisRightForYou";
import AuthenticityCertification from "@/components/products/detail/AuthenticityCertification";
import OriginSourcing from "@/components/products/detail/OriginSourcing";
import HowToWearCare from "@/components/products/detail/HowToWearCare";
import NeedGuidance from "@/components/products/detail/NeedGuidance";
import ExpertRecommendedCombinations from "@/components/products/detail/ExpertRecommendedCombinations";
import ProductFAQ from "@/components/products/detail/ProductFAQ";
import SimilarProducts from "@/components/products/detail/SimilarProducts";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(product.categoryId, product.id, 4);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ProductDetailMain product={product} />
      <ProductReviews reviews={product.reviews} />
      <TraditionalSupport />
      <IsThisRightForYou />
      <AuthenticityCertification />
      <OriginSourcing />
      <HowToWearCare />
      <NeedGuidance />
      <ExpertRecommendedCombinations />
      <ProductFAQ />
      <SimilarProducts products={similarProducts} categorySlug={product.category.slug} />
    </div>
  );
}
