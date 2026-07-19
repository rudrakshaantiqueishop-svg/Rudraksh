import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { listCategoriesForAdmin } from "@/lib/admin-categories";
import { deleteCategory } from "@/app/actions/admin-categories";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await listCategoriesForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-prata text-2xl text-dark">Categories</h1>
        <Link href="/admin/categories/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus size={16} strokeWidth={1.5} />
          New Category
        </Link>
      </div>

      <div className="rounded-lg border border-[#E7DFD6] bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Subcategories</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-lato text-dark">{c.name}</TableCell>
                <TableCell className="font-lato text-gray-text">/{c.slug}</TableCell>
                <TableCell>{c._count.subcategories}</TableCell>
                <TableCell>{c._count.products}</TableCell>
                <TableCell>{c.sortOrder}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/categories/${c.id}/edit`}
                      aria-label="Edit"
                      className="text-gray-text transition-colors hover:text-dark"
                    >
                      <Pencil size={18} strokeWidth={1.5} />
                    </Link>
                    <DeleteButton
                      action={deleteCategory.bind(null, c.id)}
                      confirmText={
                        c._count.products > 0
                          ? `"${c.name}" has ${c._count.products} products and cannot be deleted until they are moved or removed.`
                          : `Delete "${c.name}" and its subcategories?`
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
