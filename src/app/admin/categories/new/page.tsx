import { requireAdmin } from "@/lib/dal";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function NewCategoryPage() {
  await requireAdmin();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">New Category</h1>
      <CategoryForm />
    </div>
  );
}
