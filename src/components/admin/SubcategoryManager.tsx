"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import SubcategoryForm from "@/components/admin/SubcategoryForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteSubcategory } from "@/app/actions/admin-categories";

type Sub = {
  id: string;
  name: string;
  slug: string;
  image: string;
  group: string | null;
  sortOrder: number;
  _count: { products: number };
};

export default function SubcategoryManager({
  categoryId,
  subcategories,
}: {
  categoryId: string;
  subcategories: Sub[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-prata text-xl text-dark">Subcategories ({subcategories.length})</h2>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 font-lato text-sm text-[#BB5A28]"
          >
            <Plus size={16} /> Add Subcategory
          </button>
        )}
      </div>

      {adding && (
        <SubcategoryForm categoryId={categoryId} onDone={() => setAdding(false)} />
      )}

      <div className="flex flex-col divide-y divide-[#E7DFD6] rounded-lg border border-[#E7DFD6] bg-white">
        {subcategories.length === 0 && (
          <p className="p-4 font-lato text-sm text-gray-text">No subcategories yet.</p>
        )}
        {subcategories.map((sub) =>
          editingId === sub.id ? (
            <div key={sub.id} className="p-3">
              <SubcategoryForm categoryId={categoryId} subcategory={sub} onDone={() => setEditingId(null)} />
            </div>
          ) : (
            <div key={sub.id} className="flex items-center justify-between gap-4 p-3">
              <div className="flex flex-col">
                <span className="font-lato text-sm text-dark">
                  {sub.group ? `${sub.group} › ` : ""}
                  {sub.name}
                </span>
                <span className="font-lato text-xs text-gray-text">
                  /{sub.slug} · {sub._count.products} products
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditingId(sub.id)}
                  aria-label="Edit"
                  className="text-gray-text transition-colors hover:text-dark"
                >
                  <Pencil size={16} strokeWidth={1.5} />
                </button>
                <DeleteButton
                  action={deleteSubcategory.bind(null, sub.id)}
                  confirmText={`Delete "${sub.name}"? Products in it will keep the parent category but lose this type.`}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
