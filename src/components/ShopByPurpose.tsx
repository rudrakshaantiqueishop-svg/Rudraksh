import { getCollections } from "@/lib/products";
import ShopByPurposeCarousel from "./ShopByPurposeCarousel";

export default async function ShopByPurpose() {
  const collections = await getCollections();

  return (
    <section className="h-px-section py-[40px] lg:py-[80px]" style={{ background: "#FEF9F2", borderTop: "1px solid rgba(0,0,0,0.06)" }}>

      {/* Title */}
      <h2
        className="font-prata"
        style={{ fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: "0 0 56px 0" }}
      >
        Shop By Purpose
      </h2>

      <ShopByPurposeCarousel collections={collections} />

    </section>
  );
}
