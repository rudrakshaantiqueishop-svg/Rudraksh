import Image from "next/image";
import type { CategoryPageContent } from "@/lib/product-utils";

export default function ProductsHero({ pageContent }: { pageContent: CategoryPageContent }) {
  return (
    <section className="ph-section">
      <Image
        src="/assets/images/common/comman banner.png"
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
