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
      {/* Minimized Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {categories.map((c, index) => {
          const active = c.isActive ?? true;
          return (
            <Card
              key={c.id}
              className={`p-3.5 flex items-center justify-between gap-3 bg-white transition-all duration-200 hover:border-amber-900/30 ${
                !active ? "bg-stone-50/80 opacity-80 border-dashed" : ""
              }`}
            >
              {/* Left Info: Title, slug, counts */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-prata text-base font-medium text-dark truncate m-0">
                    {c.name}
                  </h3>
                  <span className="font-lato text-xs text-stone-400 font-medium truncate">/{c.slug}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-lato text-[11px] text-stone-500">
                  <span>{c._count.subcategories} subcats</span>
                  <span>•</span>
                  <span>{c._count.products} prods</span>
                  <span>•</span>
                  <span className="font-semibold text-stone-700">#{index + 1}</span>
                </div>
              </div>

              {/* Right Action Icons: Reorder, Visibility, Edit, Delete */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Order Up/Down Icons */}
                <div className="flex items-center bg-stone-100/90 rounded-md p-0.5 border border-stone-200/70">
                  <button
                    type="button"
                    onClick={() => handleMove(c.id, index, -1)}
                    disabled={index === 0 || isPending}
                    className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                    title="Move up"
                    aria-label="Move up"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(c.id, index, 1)}
                    disabled={index === categories.length - 1 || isPending}
                    className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                    title="Move down"
                    aria-label="Move down"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>

                {/* Visibility Toggle Icon */}
                <button
                  type="button"
                  onClick={() => handleToggleActive(c.id, active)}
                  className={`p-1.5 rounded-md border transition-colors ${
                    active ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                  }`}
                  title={active ? "Visible (Click to hide)" : "Hidden (Click to show)"}
                  aria-label={active ? "Hide category" : "Show category"}
                >
                  {active ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>

                {/* Edit Icon */}
                <Link
                  href={`/admin/categories/${c.id}/edit`}
                  className="p-1.5 rounded-md border border-stone-200 bg-white text-brown hover:bg-stone-100 transition-colors flex items-center justify-center"
                  title="Edit category"
                  aria-label="Edit category"
                >
                  <Pencil size={15} />
                </Link>

                {/* Delete Icon */}
                <div className="p-1.5 rounded-md border border-stone-200 bg-white hover:bg-red-50 hover:border-red-200 transition-colors flex items-center justify-center">
                  <DeleteButton
                    action={deleteCategory.bind(null, c.id)}
                    confirmText={
                      c._count.products > 0
                        ? `"${c.name}" has ${c._count.products} products and cannot be deleted.`
                        : `Delete "${c.name}"?`
                    }
                  />
                </div>
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
