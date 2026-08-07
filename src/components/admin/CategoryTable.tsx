"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Pencil, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { moveCategoryUp, moveCategoryDown, deleteCategory, toggleCategoryActive } from "@/app/actions/admin-categories";
import DeleteButton from "@/components/admin/DeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive?: boolean;
  _count: {
    subcategories: number;
    products: number;
  };
}

interface CategoryTableProps {
  initialCategories: CategoryItem[];
}

export default function CategoryTable({ initialCategories }: CategoryTableProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleToggleActive = (id: string, currentIsActive: boolean = true) => {
    const nextActive = !currentIsActive;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: nextActive } : c))
    );

    startTransition(async () => {
      try {
        await toggleCategoryActive(id, currentIsActive);
      } catch (err) {
        console.error("Failed to toggle category active status:", err);
        setCategories(initialCategories);
      }
    });
  };

  const handleMoveUp = (id: string, index: number) => {
    if (index === 0) return;

    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;

    const tempOrder = updated[index].sortOrder;
    updated[index].sortOrder = updated[index - 1].sortOrder;
    updated[index - 1].sortOrder = tempOrder;

    setCategories(updated);

    startTransition(async () => {
      try {
        await moveCategoryUp(id);
      } catch (err) {
        console.error("Failed to move category up:", err);
        setCategories(initialCategories);
      }
    });
  };

  const handleMoveDown = (id: string, index: number) => {
    if (index === categories.length - 1) return;

    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;

    const tempOrder = updated[index].sortOrder;
    updated[index].sortOrder = updated[index + 1].sortOrder;
    updated[index + 1].sortOrder = tempOrder;

    setCategories(updated);

    startTransition(async () => {
      try {
        await moveCategoryDown(id);
      } catch (err) {
        console.error("Failed to move category down:", err);
        setCategories(initialCategories);
      }
    });
  };

  return (
    <div className="border border-border rounded-lg bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Subcategories</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="w-[120px] text-center">Visibility</TableHead>
            <TableHead className="w-[100px]">Order</TableHead>
            <TableHead className="text-right w-[140px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((c, index) => {
            const active = c.isActive ?? true;
            return (
              <TableRow key={c.id} className={!active ? "bg-stone-50/60 opacity-80" : ""}>
                <TableCell className="font-lato font-medium text-dark flex items-center gap-2">
                  <span>{c.name}</span>
                </TableCell>
                <TableCell className="font-lato text-gray-text text-sm">/{c.slug}</TableCell>
                <TableCell>{c._count.subcategories}</TableCell>
                <TableCell>{c._count.products}</TableCell>

                {/* Hide / Unhide Visibility Toggle Icon Button */}
                <TableCell className="text-center">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(c.id, active)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      active
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                    }`}
                    title={active ? "Click to hide category" : "Click to unhide category"}
                  >
                    {active ? <Eye size={14} /> : <EyeOff size={14} />}
                    {active ? "Visible" : "Hidden"}
                  </button>
                </TableCell>

                <TableCell className="font-lato text-dark">
                  <div className="flex items-center gap-2">
                    <span className="min-w-[20px]">{c.sortOrder}</span>
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleMoveUp(c.id, index)}
                        disabled={index === 0 || isPending}
                        className="p-0.5 hover:bg-stone-200/50 rounded transition-colors text-gray-text hover:text-dark disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Move up"
                      >
                        <ArrowUp size={14} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => handleMoveDown(c.id, index)}
                        disabled={index === categories.length - 1 || isPending}
                        className="p-0.5 hover:bg-stone-200/50 rounded transition-colors text-gray-text hover:text-dark disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Move down"
                      >
                        <ArrowDown size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-3">
                    {/* Hide / Show Icon Action */}
                    <button
                      type="button"
                      onClick={() => handleToggleActive(c.id, active)}
                      className={`p-1.5 rounded transition-colors ${
                        active ? "text-emerald-600 hover:bg-emerald-50" : "text-stone-400 hover:bg-stone-100"
                      }`}
                      title={active ? "Hide category" : "Unhide category"}
                    >
                      {active ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>

                    <Link
                      href={`/admin/categories/${c.id}/edit`}
                      aria-label="Edit"
                      className="text-gray-text transition-colors hover:text-dark p-1.5 hover:bg-stone-100 rounded"
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
