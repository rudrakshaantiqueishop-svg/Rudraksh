import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";

type SubcategoryCard = {
  id: string;
  name: string;
  slug: string;
  image: string;
  group: string | null;
  _count: { products: number };
};

// Groups subcategories by their optional `group` heading, preserving order.
function groupSubcategories(subs: SubcategoryCard[]): { group: string | null; items: SubcategoryCard[] }[] {
  const groups: { group: string | null; items: SubcategoryCard[] }[] = [];
  for (const sub of subs) {
    const key = sub.group ?? null;
    let bucket = groups.find((g) => g.group === key);
    if (!bucket) {
      bucket = { group: key, items: [] };
      groups.push(bucket);
    }
    bucket.items.push(sub);
  }
  return groups;
}

export default function SubcategoryGrid({
  categorySlug,
  categoryName,
  subcategories,
}: {
  categorySlug: string;
  categoryName: string;
  subcategories: SubcategoryCard[];
}) {
  if (subcategories.length === 0) return null;
  const groups = groupSubcategories(subcategories);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="mb-2 text-center font-prata text-[30px] leading-tight text-dark">
        Explore {categoryName}
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-center font-lato text-[15px] text-gray-text">
        Choose a type to browse verified products, each cared for in the traditional way.
      </p>

      <div className="flex flex-col gap-12">
        {groups.map((g) => (
          <div key={g.group ?? "_"}>
            {g.group && (
              <h3 className="mb-6 border-b border-[#E7DFD6] pb-2 font-prata text-xl text-dark">{g.group}</h3>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {g.items.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products/category/${categorySlug}/${sub.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-[#F0E8DD]">
                    <SmartImage
                      src={sub.image}
                      alt={sub.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-prata text-[15px] leading-snug text-dark group-hover:text-[#BB5A28]">
                      {sub.name}
                    </span>
                    <span className="font-lato text-xs text-gray-text">
                      {sub._count.products} {sub._count.products === 1 ? "product" : "products"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
