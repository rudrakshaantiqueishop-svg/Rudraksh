import Image from "next/image";

const categories = [
  { name: "Necklace", image: "/images/category-necklace.png" },
  { name: "Earrings", image: "/images/category-earrings.png" },
  { name: "Bracelets", image: "/images/category-bracelets.png" },
  { name: "Rings", image: "/images/category-rings.png" },
  { name: "Charms", image: "/images/category-charms.png" },
];

export default function ShopByCategory() {
  return (
    <section className="h-px-section py-[60px] lg:py-[72px]" style={{ background: "#FEF9F2" }}>
      <div className="sbc-header flex justify-between items-start gap-3 mb-8">
        <h2 className="font-prata title-fluid font-normal leading-[1.29] tracking-[-0.02em] text-dark">
          Explore Our Sacred Collections
        </h2>
        <a href="#" className="inline-flex items-center gap-1.5 text-brown font-lato text-[13px] font-bold tracking-[0.8px] pb-1 border-b border-brown hover:opacity-70 transition-opacity shrink-0 mt-1">
          EXPLORE PRODUCTS
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>

      {/* Mobile: horizontal scroll | Desktop: 5-col grid */}
      <div
        className="flex lg:grid lg:grid-cols-5 gap-3 lg:gap-[15px] overflow-x-auto no-scrollbar pb-2 lg:pb-0 lg:overflow-x-visible"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col gap-3 cursor-pointer group flex-shrink-0 lg:flex-shrink w-[180px] lg:w-full"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden h-[200px] lg:h-[276px]">
              <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
            </div>
            <p className="font-prata text-base lg:text-xl font-normal text-center text-dark">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
