import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { listCategoriesForAdmin } from "@/lib/admin-categories";
import CategoryTable from "@/components/admin/CategoryTable";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await listCategoriesForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-prata text-2xl sm:text-3xl text-dark font-normal">Categories</h1>
          <p className="mt-1 font-lato text-sm text-gray-text">
            Organize product categories, subcategories, and homepage display hierarchy.
          </p>
        </div>
        <Link href="/admin/categories/new" className={cn(buttonVariants(), "gap-2 shadow-xs")}>
          <Plus size={16} strokeWidth={1.5} />
          New Category
        </Link>
      </div>

      <CategoryTable initialCategories={categories} />
    </div>
  );
}
