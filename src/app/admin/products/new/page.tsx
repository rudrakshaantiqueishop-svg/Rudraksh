import { getCategories, getCollections, getAllSubcategories } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/dal";

export default async function NewProductPage() {
  await requireAdmin();
  const [categories, subcategories, collections] = await Promise.all([
    getCategories(),
    getAllSubcategories(),
    getCollections(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">New Product</h1>
      <ProductForm categories={categories} subcategories={subcategories} collections={collections} />
    </div>
  );
}
