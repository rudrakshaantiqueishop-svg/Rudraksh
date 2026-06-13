import Link from "next/link";
import { getCategories } from "@/lib/products";
import CategoryGrid from "@/components/CategoryGrid";

export default async function ShopByCategory() {
  const categories = await getCategories();

  return (
    <section className="h-px-section py-[60px] lg:py-[72px]" style={{ background: "#FEF9F2" }}>
      <div className="sbc-header flex justify-between items-start gap-3 mb-8">
        <h2 className="font-prata title-fluid font-normal leading-[1.29] tracking-[-0.02em] text-dark">
          Explore Our Sacred Collections
        </h2>
        <Link href="/products" className="inline-flex items-center gap-1.5 text-brown font-lato text-[13px] font-bold tracking-[0.8px] pb-1 border-b border-brown hover:opacity-70 transition-opacity shrink-0 mt-1">
          EXPLORE PRODUCTS
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </Link>
      </div>

      <CategoryGrid categories={categories} />
    </section>
  );
}
