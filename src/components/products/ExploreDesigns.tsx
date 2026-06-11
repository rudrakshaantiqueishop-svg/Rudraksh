import Image from "next/image";

const designs = [
  {
    title: "Loose Beads",
    description: "For traditional threading or personal customization.",
    image: "/assets/images/home/beads.png",
  },
  {
    title: "Silver Capped",
    description: "A protective silver cap for durability and daily wear.",
    image: "/assets/images/products/category-bracelets.png",
  },
  {
    title: "Silver Chain",
    description: "Minimal, ready-to-wear designs with a refined finish.",
    image: "/assets/images/products/category-necklace.png",
  },
  {
    title: "Rudraksha Chain",
    description: "Traditionally strung chains for regular spiritual use.",
    image: "/assets/images/products/Product Highlight.png",
  },
];

export default function ExploreDesigns() {
  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="font-prata text-3xl lg:text-[34px] font-normal text-dark m-0">
          Explore Our Designs
        </h2>
        <p className="font-lato text-sm text-gray-text m-0">
          Rudraksha beads are available in multiple forms depending on how you prefer to wear them.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {designs.map((d, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden bg-[#F0E8DD]">
              <Image
                src={d.image}
                alt={d.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-center">
              <h3 className="font-prata text-xl font-normal text-dark m-0">{d.title}</h3>
              <p className="font-lato text-sm text-gray-text m-0">{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
