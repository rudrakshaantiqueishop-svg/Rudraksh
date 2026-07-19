"use client";

import { useState, useActionState } from "react";
import { createSubcategory, updateSubcategory } from "@/app/actions/admin-categories";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[()']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SubForForm = {
  id: string;
  name: string;
  slug: string;
  image: string;
  group: string | null;
  sortOrder: number;
};

export default function SubcategoryForm({
  categoryId,
  subcategory,
  onDone,
}: {
  categoryId: string;
  subcategory?: SubForForm;
  onDone?: () => void;
}) {
  const action = subcategory ? updateSubcategory.bind(null, subcategory.id) : createSubcategory;
  const [state, formAction] = useActionState(action, undefined);
  const [slug, setSlug] = useState(subcategory?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!subcategory?.slug);

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-lg border border-[#E7DFD6] bg-white p-4">
      <input type="hidden" name="categoryId" value={categoryId} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          defaultValue={subcategory?.name}
          required
          onChange={(e) => { if (!slugTouched) setSlug(toSlug(e.target.value)); }}
          errors={state?.errors?.name}
        />
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`sub-slug-${subcategory?.id ?? "new"}`}>Slug</Label>
          <Input
            id={`sub-slug-${subcategory?.id ?? "new"}`}
            name="slug"
            value={slug}
            required
            onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
          />
          {state?.errors?.slug?.map((m) => <span key={m} className="font-lato text-[13px] text-destructive">{m}</span>)}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField label="Image URL" name="image" defaultValue={subcategory?.image} required errors={state?.errors?.image} />
        <FormField label="Group (optional)" name="group" defaultValue={subcategory?.group ?? ""} errors={state?.errors?.group} />
        <FormField label="Sort Order" name="sortOrder" type="number" defaultValue={subcategory?.sortOrder ?? 0} required errors={state?.errors?.sortOrder} />
      </div>
      {state?.message && <p className="font-lato text-sm text-destructive">{state.message}</p>}
      <div className="flex gap-2">
        <SubmitButton>{subcategory ? "Save" : "Add Subcategory"}</SubmitButton>
        {onDone && (
          <button type="button" onClick={onDone} className="font-lato text-sm text-gray-text underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
