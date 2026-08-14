"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Pencil, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { moveCategoryUp, moveCategoryDown, deleteCategory, toggleCategoryActive } from "@/app/actions/admin-categories";
import DeleteButton from "@/components/admin/DeleteButton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const handleMove = (id: string, index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= categories.length) return;

    const updated = [...categories];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setCategories(updated);

    startTransition(async () => {
      try {
        await (direction === -1 ? moveCategoryUp(id) : moveCategoryDown(id));
      } catch (err) {
        console.error("Failed to reorder category:", err);
        setCategories(initialCategories);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Card Layout with Shadcn Card & Badge */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {categories.map((c, index) => {
          const active = c.isActive ?? true;
          return (
            <Card
              key={c.id}
              className={`p-5 flex flex-col justify-between gap-4 bg-white transition-all duration-200 hover:border-amber-900/30 hover:shadow-md ${
                !active ? "bg-stone-50/80 opacity-85 border-dashed" : ""
              }`}
            >
              {/* Header: Title, Slug & Visibility Badge */}
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3.5">
                <div>
                  <h3 className="font-prata text-base sm:text-lg font-medium text-dark leading-snug">
                    {c.name}
                  </h3>
                  <span className="font-lato text-xs text-stone-500 font-medium">/{c.slug}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleActive(c.id, active)}
                  className="shrink-0 transition-transform active:scale-95"
                >
                  <Badge variant={active ? "success" : "amber"} className="cursor-pointer gap-1 py-1">
                    {active ? <Eye size={13} /> : <EyeOff size={13} />}
                    {active ? "Visible" : "Hidden"}
                  </Badge>
                </button>
              </div>

              {/* Counts & Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 font-lato text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {c._count.subcategories} {c._count.subcategories === 1 ? "subcategory" : "subcategories"}
                  </Badge>
                  <Badge variant="outline">
                    {c._count.products} products
                  </Badge>
                </div>

                <div className="flex items-center gap-1.5 bg-stone-100/90 rounded-lg px-2 py-1 border border-stone-200/70">
                  <span className="font-semibold text-stone-600">Order #{index + 1}</span>
                  <button
                    onClick={() => handleMove(c.id, index, -1)}
                    disabled={index === 0 || isPending}
                    className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => handleMove(c.id, index, 1)}
                    disabled={index === categories.length - 1 || isPending}
                    className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-end gap-3 border-t border-stone-100 pt-3.5">
                <Link
                  href={`/admin/categories/${c.id}/edit`}
                  className="flex items-center gap-1 text-xs font-semibold text-brown hover:underline"
                >
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton
                  action={deleteCategory.bind(null, c.id)}
                  confirmText={
                    c._count.products > 0
                      ? `"${c.name}" has ${c._count.products} products and cannot be deleted.`
                      : `Delete "${c.name}"?`
                  }
                />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Page Link</TableHead>
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

                  <TableCell className="text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(c.id, active)}
                      className="cursor-pointer transition-transform active:scale-95"
                    >
                      <Badge variant={active ? "success" : "amber"} className="gap-1.5 py-1">
                        {active ? <Eye size={13} /> : <EyeOff size={13} />}
                        {active ? "Visible" : "Hidden"}
                      </Badge>
                    </button>
                  </TableCell>

                  <TableCell className="font-lato text-dark">
                    <div className="flex items-center gap-2">
                      <span className="min-w-[20px] text-sm text-gray-text">{index + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleMove(c.id, index, -1)}
                          disabled={index === 0 || isPending}
                          className="p-0.5 hover:bg-stone-200/50 rounded transition-colors text-gray-text hover:text-dark disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move up"
                        >
                          <ArrowUp size={14} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => handleMove(c.id, index, 1)}
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
                        className="text-brown font-semibold text-xs hover:underline flex items-center gap-1"
                      >
                        <Pencil size={14} /> Edit
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
    </div>
  );
}
