"use client";

import { useState, useActionState } from "react";
import { createCategory, updateCategory } from "@/app/actions/admin-categories";
import TextAreaField from "@/components/admin/TextAreaField";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { CategoryPageContent } from "@/lib/product-utils";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CategoryForForm = {
  id: string;
  name: string;
  slug: string;
  image: string;
  sortOrder: number;
  pageContent: unknown;
};

export default function CategoryForm({ category }: { category?: CategoryForForm }) {
  const action = category ? updateCategory.bind(null, category.id) : createCategory;
  const [state, formAction] = useActionState(action, undefined);
  const pc = (category?.pageContent as Partial<CategoryPageContent> | undefined) ?? undefined;

  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!category?.slug);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Name"
            name="name"
            defaultValue={category?.name}
            required
            onChange={(e) => { if (!slugTouched) setSlug(toSlug(e.target.value)); }}
            errors={state?.errors?.name}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              required
              placeholder="auto-generated-from-name"
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            />
            <p className="font-lato text-xs text-gray-text">/products/category/<em>{slug || "slug"}</em></p>
            {state?.errors?.slug?.map((m) => <span key={m} className="font-lato text-[13px] text-destructive">{m}</span>)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Image URL" name="image" defaultValue={category?.image} required errors={state?.errors?.image} />
          <FormField label="Sort Order" name="sortOrder" type="number" defaultValue={category?.sortOrder ?? 0} required errors={state?.errors?.sortOrder} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Landing Page Content</h2>
        <p className="font-lato text-xs text-gray-text">
          Shown on the category landing page. Checklist, fit-check, and explore-designs sections keep sensible defaults you can refine later.
        </p>
        <FormField label="Hero Title" name="heroTitle" defaultValue={pc?.heroTitle} required errors={state?.errors?.heroTitle} />
        <TextAreaField label="Hero Subtitle" name="heroSubtitle" defaultValue={pc?.heroSubtitle ?? ""} required errors={state?.errors?.heroSubtitle} />
        <FormField label="Intro Heading" name="introHeading" defaultValue={pc?.introHeading} required errors={state?.errors?.introHeading} />
        <TextAreaField label="Intro Description" name="introDescription" defaultValue={pc?.introDescription ?? ""} required errors={state?.errors?.introDescription} />
      </section>

      {state?.message && <p className="font-lato text-sm text-destructive">{state.message}</p>}
      <SubmitButton>{category ? "Save Changes" : "Create Category"}</SubmitButton>
    </form>
  );
}
