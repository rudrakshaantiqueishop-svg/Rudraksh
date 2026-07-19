import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { getCategoryForAdmin } from "@/lib/admin-categories";
import CategoryForm from "@/components/admin/CategoryForm";
import SubcategoryManager from "@/components/admin/SubcategoryManager";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const category = await getCategoryForAdmin(id);
  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Link href="/admin/categories" className="flex items-center gap-1.5 font-lato text-sm text-gray-text hover:text-dark">
          <ArrowLeft size={16} /> Back to Categories
        </Link>
        <h1 className="font-prata text-2xl text-dark">Edit Category</h1>
      </div>

      <CategoryForm
        category={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          image: category.image,
          sortOrder: category.sortOrder,
          pageContent: category.pageContent,
        }}
      />

      <hr className="border-[#E7DFD6]" />

      <SubcategoryManager categoryId={category.id} subcategories={category.subcategories} />
    </div>
  );
}
