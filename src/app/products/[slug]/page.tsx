import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProductBySlug, getSimilarProducts } from "@/lib/products";
import ProductDetailMain from "@/components/products/detail/ProductDetailMain";

const ProductReviews = dynamic(() => import("@/components/products/detail/ProductReviews"));
const TraditionalSupport = dynamic(() => import("@/components/products/detail/TraditionalSupport"));
const IsThisRightForYou = dynamic(() => import("@/components/products/detail/IsThisRightForYou"));
const AuthenticityCertification = dynamic(() => import("@/components/products/detail/AuthenticityCertification"));
const OriginSourcing = dynamic(() => import("@/components/products/detail/OriginSourcing"));
const HowToWearCare = dynamic(() => import("@/components/products/detail/HowToWearCare"));
const NeedGuidance = dynamic(() => import("@/components/products/detail/NeedGuidance"));
const ExpertRecommendedCombinations = dynamic(() => import("@/components/products/detail/ExpertRecommendedCombinations"));
const ProductFAQ = dynamic(() => import("@/components/products/detail/ProductFAQ"));
const SimilarProducts = dynamic(() => import("@/components/products/detail/SimilarProducts"));

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
      <ProductReviews reviews={product.reviews} productId={product.id} slug={product.slug} />
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
