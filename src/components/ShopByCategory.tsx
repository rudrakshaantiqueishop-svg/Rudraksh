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
    <section className="px-[70px] pt-[72px] pb-20 flex flex-col gap-9">
      <div className="flex justify-between items-center">
        <h2 className="font-prata text-[36px] font-normal leading-[1.29] tracking-[-0.02em] text-dark">
          Explore Our Sacred Collections
        </h2>
        <a href="#" className="inline-flex items-center gap-1.5 text-brown font-lato text-[13px] font-bold tracking-[0.8px] pb-1 border-b border-brown hover:opacity-70 transition-opacity">
          EXPLORE PRODUCTS
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>

      <div className="flex gap-[15px]">
        {categories.map((cat) => (
          <div key={cat.name} className="flex-1 flex flex-col gap-3.5 cursor-pointer group">
            <div className="relative h-[276px] overflow-hidden">
              <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
            </div>
            <p className="font-prata text-xl font-normal text-center text-dark">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
