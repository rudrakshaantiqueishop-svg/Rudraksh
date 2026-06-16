import { notFound } from "next/navigation";
import { getCategories, getCollections } from "@/lib/products";
import { getProductForAdmin } from "@/lib/admin-products";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories, collections] = await Promise.all([
    getProductForAdmin(id),
    getCategories(),
    getCollections(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">Edit Product</h1>
      <ProductForm product={product} categories={categories} collections={collections} />
    </div>
  );
}
