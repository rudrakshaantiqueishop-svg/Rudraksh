import Link from "next/link";
import { getCategories } from "@/lib/products";
import CategoryGrid from "@/components/CategoryGrid";

export default async function ShopByCategory() {
  const categories = await getCategories();

  const categoriesWithConsultancy = [
    ...categories,
    {
      id: "consultancy",
      name: "Consultancy",
      slug: "/consultation", // This will be handled specially in CategoryGrid to use absolute URL
      image: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790540006/rudraksh/home/consultancy-hero.webp"
    }
  ];

  return (
    <section className="h-px-section py-[40px] lg:py-[72px]" style={{ background: "#FEF9F2" }}>


      <CategoryGrid categories={categoriesWithConsultancy} />
    </section>
  );
}
