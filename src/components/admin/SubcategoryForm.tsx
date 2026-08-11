"use client";

import { useState, useActionState } from "react";
import Image from "next/image";
import { createSubcategory, updateSubcategory } from "@/app/actions/admin-categories";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";
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
};

export default function SubcategoryForm({
  categoryId,
  subcategory,
  groupSuggestions = [],
  onDone,
}: {
  categoryId: string;
  subcategory?: SubForForm;
  groupSuggestions?: string[];
  onDone?: () => void;
}) {
  const action = subcategory ? updateSubcategory.bind(null, subcategory.id) : createSubcategory;
  const [state, formAction] = useActionState(action, undefined);

  const fieldId = subcategory?.id ?? "new";
  const [name, setName] = useState(subcategory?.name ?? "");
  const [slug, setSlug] = useState(subcategory?.slug ?? "");
  // Existing subcategories keep their link when renamed; only new ones follow the name.
  const [slugEdited, setSlugEdited] = useState(!!subcategory);
  const [showSlug, setShowSlug] = useState(false);
  const [image, setImage] = useState(subcategory?.image ?? "");

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEdited) setSlug(toSlug(value));
  };

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-lg border border-[#E7DFD6] bg-white p-4 font-lato">
      <input type="hidden" name="categoryId" value={categoryId} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          value={name}
          required
          placeholder="e.g. 5 Mukhi Rudraksha"
          onChange={(e) => handleNameChange(e.target.value)}
          errors={state?.errors?.name}
        />

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`sub-group-${fieldId}`}>Group heading (optional)</Label>
          <Input
            id={`sub-group-${fieldId}`}
            name="group"
            defaultValue={subcategory?.group ?? ""}
            list={`sub-group-options-${fieldId}`}
            placeholder="e.g. Rudraksha Bracelets"
          />
          <datalist id={`sub-group-options-${fieldId}`}>
            {groupSuggestions.map((g) => (
              <option key={g} value={g} />
            ))}
          </datalist>
          <p className="text-xs text-gray-text">
            Used to bunch related types together on the category page. Leave blank if not needed.
          </p>
          {state?.errors?.group?.map((m) => (
            <span key={m} className="text-[13px] text-destructive">{m}</span>
          ))}
        </div>
      </div>

      {/* Derived from the name; revealed only if the admin wants to override it. */}
      <input type="hidden" name="slug" value={slug} />
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-gray-text">
          Page link: <span className="text-dark">/{slug || "sub-category-name"}</span>
          {!showSlug && (
            <button
              type="button"
              onClick={() => setShowSlug(true)}
              className="ml-2 text-[#BB5A28] underline underline-offset-2"
            >
              Change
            </button>
          )}
        </p>
        {showSlug && (
          <Input
            aria-label="Page link"
            value={slug}
            onChange={(e) => {
              setSlug(toSlug(e.target.value));
              setSlugEdited(true);
            }}
            className="max-w-sm"
          />
        )}
        {state?.errors?.slug?.map((m) => (
          <span key={m} className="text-[13px] text-destructive">{m}</span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Image</Label>
        <input type="hidden" name="image" value={image} />
        {!image ? (
          <div className="flex flex-col items-start gap-2">
            <CloudinaryUploadButton onUpload={(url) => setImage(url)} label="Upload Image" />
            <span className="text-xs text-stone-400">Shown on the category page tile for this type.</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-28 overflow-hidden rounded-md border border-stone-200 bg-stone-100">
              <Image src={image} alt="Subcategory image preview" fill className="object-cover" unoptimized />
            </div>
            <CloudinaryUploadButton onUpload={(url) => setImage(url)} label="Change" />
            <button
              type="button"
              onClick={() => setImage("")}
              className="text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
        {state?.errors?.image?.map((m) => (
          <span key={m} className="text-[13px] text-destructive">{m}</span>
        ))}
      </div>

      {state?.message && <p className="text-sm text-destructive">{state.message}</p>}

      <div className="flex items-center gap-4">
        <SubmitButton>{subcategory ? "Save" : "Add Subcategory"}</SubmitButton>
        {onDone && (
          <button type="button" onClick={onDone} className="text-sm text-gray-text underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
