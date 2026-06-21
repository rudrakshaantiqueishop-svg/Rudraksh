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
      image: "/assets/images/about/still-have-questions.png"
    }
  ];

  return (
    <section className="h-px-section py-[60px] lg:py-[72px]" style={{ background: "#FEF9F2" }}>


      <CategoryGrid categories={categoriesWithConsultancy} />
    </section>
  );
}
