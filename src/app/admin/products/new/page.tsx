import { getCategories, getCollections } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/dal";

export default async function NewProductPage() {
  await requireAdmin();
  const [categories, collections] = await Promise.all([getCategories(), getCollections()]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">New Product</h1>
      <ProductForm categories={categories} collections={collections} />
    </div>
  );
}
