"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Pencil, ArrowUp, ArrowDown } from "lucide-react";
import { moveCategoryUp, moveCategoryDown, deleteCategory } from "@/app/actions/admin-categories";
import DeleteButton from "@/components/admin/DeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryTableProps {
  initialCategories: Array<{
    id: string;
    name: string;
    slug: string;
    sortOrder: number;
    _count: {
      subcategories: number;
      products: number;
    };
  }>;
}

export default function CategoryTable({ initialCategories }: CategoryTableProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleMoveUp = (id: string, index: number) => {
    if (index === 0) return;

    // Optimistically swap the elements in array
    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;

    // Swap the sortOrder values for instant UI feedback
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

    // Optimistically swap the elements in array
    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;

    // Swap the sortOrder values for instant UI feedback
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
    <div className="border border-border">
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
          {categories.map((c, index) => (
            <TableRow key={c.id}>
              <TableCell className="font-lato text-dark">{c.name}</TableCell>
              <TableCell className="font-lato text-gray-text">/{c.slug}</TableCell>
              <TableCell>{c._count.subcategories}</TableCell>
              <TableCell>{c._count.products}</TableCell>
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
  );
}
