import Image from "next/image";
import type { CategoryPageContent } from "@/lib/product-utils";

export default function ProductsHero({
  pageContent,
  bannerImage,
}: {
  pageContent: CategoryPageContent;
  bannerImage?: string | null;
}) {
  const isGemstones =
    pageContent.heroTitle?.toLowerCase().includes("gemstone") ||
    pageContent.introHeading?.toLowerCase().includes("gemstone");

  const defaultBanner = isGemstones
    ? "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790155995/rudraksh/products/gemstones/gemstones-hero.webp"
    : "/assets/images/common/comman banner.png";

  const bannerSrc = bannerImage || pageContent.heroBanner || defaultBanner;

  return (
    <section className="ph-section">
      <Image
        src={bannerSrc}
        alt={pageContent.heroTitle}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,2,0.4)" }} />

      <div className="ph-content">
        <h1 className="font-prata ph-heading">
          {pageContent.heroTitle}
        </h1>
        <p className="font-lato ph-body">
          {pageContent.heroSubtitle}
        </p>
      </div>
    </section>
  );
}
