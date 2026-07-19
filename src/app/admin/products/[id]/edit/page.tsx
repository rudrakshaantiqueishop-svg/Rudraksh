import { notFound } from "next/navigation";
import { getCategories, getCollections, getAllSubcategories } from "@/lib/products";
import { getProductForAdmin } from "@/lib/admin-products";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/dal";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [product, categories, subcategories, collections] = await Promise.all([
    getProductForAdmin(id),
    getCategories(),
    getAllSubcategories(),
    getCollections(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">Edit Product</h1>
      <ProductForm product={product} categories={categories} subcategories={subcategories} collections={collections} />
    </div>
  );
}
