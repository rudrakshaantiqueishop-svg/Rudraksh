import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProductBySlug, getSimilarProducts } from "@/lib/products";
import ProductDetailMain from "@/components/products/detail/ProductDetailMain";

const ProductReviews = dynamic(
  () => import("@/components/products/detail/ProductReviews"),
);
const TraditionalSupport = dynamic(
  () => import("@/components/products/detail/TraditionalSupport"),
);
const IsThisRightForYou = dynamic(
  () => import("@/components/products/detail/IsThisRightForYou"),
);
const AuthenticityCertification = dynamic(
  () => import("@/components/products/detail/AuthenticityCertification"),
);
const OriginSourcing = dynamic(
  () => import("@/components/products/detail/OriginSourcing"),
);
const HowToWearCare = dynamic(
  () => import("@/components/products/detail/HowToWearCare"),
);
const NeedGuidance = dynamic(
  () => import("@/components/products/detail/NeedGuidance"),
);
const ExpertRecommendedCombinations = dynamic(
  () => import("@/components/products/detail/ExpertRecommendedCombinations"),
);
const ProductFAQ = dynamic(
  () => import("@/components/products/detail/ProductFAQ"),
);
const SimilarProducts = dynamic(
  () => import("@/components/products/detail/SimilarProducts"),
);

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_BASE_URL)
      return process.env.NEXT_PUBLIC_BASE_URL;
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  };
  const baseUrl = getBaseUrl();
  const imageUrl = product.images[0]?.url || "/assets/images/og-default.webp";
  const absoluteImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${baseUrl}${imageUrl}`;

  return {
    title: product.name,
    description: product.description.substring(0, 160) + "...",
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160) + "...",
      url: `${baseUrl}/products/${product.slug}`,
      images: [
        { url: absoluteImageUrl, width: 800, height: 800, alt: product.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description.substring(0, 160) + "...",
      images: [absoluteImageUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(
    product.categoryId,
    product.id,
    4,
  );

  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_BASE_URL)
      return process.env.NEXT_PUBLIC_BASE_URL;
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  };
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`,
    ),
    description: product.description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.priceCents / 100,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stockCount > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (
          product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
          product.reviews.length
        ).toFixed(1),
        reviewCount: product.reviews.length,
      },
    }),
  };

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailMain product={product} />
      <ProductReviews
        reviews={product.reviews}
        productId={product.id}
        slug={product.slug}
      />
      <TraditionalSupport />
      <IsThisRightForYou />
      <AuthenticityCertification />
      <OriginSourcing />
      <HowToWearCare />
      <NeedGuidance />
      <ExpertRecommendedCombinations />
      <ProductFAQ />
      <SimilarProducts
        products={similarProducts}
        categorySlug={product.category.slug}
      />
    </div>
  );
}
