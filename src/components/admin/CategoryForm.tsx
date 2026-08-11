"use client";

import { useState, useActionState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { createCategory, updateCategory } from "@/app/actions/admin-categories";
import TextAreaField from "@/components/admin/TextAreaField";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { defaultCopy } from "@/lib/category-content";
import type { CategoryPageContent } from "@/lib/product-utils";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[()']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CategoryForForm = {
  id: string;
  name: string;
  slug: string;
  image: string;
  isActive?: boolean;
  pageContent: unknown;
};

export default function CategoryForm({ category }: { category?: CategoryForForm }) {
  const action = category ? updateCategory.bind(null, category.id) : createCategory;
  const [state, formAction] = useActionState(action, undefined);
  const pc = (category?.pageContent as Partial<CategoryPageContent> | undefined) ?? undefined;

  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  // An existing category keeps its link when renamed — the URL is already
  // public. Only a new category tracks the name automatically.
  const [slugEdited, setSlugEdited] = useState(!!category);
  const [showSlug, setShowSlug] = useState(false);
  const [image, setImage] = useState(category?.image ?? "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [showCopy, setShowCopy] = useState(false);

  // What the landing page will say if the copy fields are left blank.
  const suggested = defaultCopy(name);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEdited) setSlug(toSlug(value));
  };

  return (
    <form action={formAction} className="flex flex-col gap-8 bg-white p-6 rounded-lg border shadow-sm font-lato">
      <section className="flex flex-col gap-5">
        <div>
          <h2 className="font-prata text-xl text-dark">Category Details</h2>
          <p className="mt-1 text-xs text-gray-text">
            Just a name and a picture is enough to get started — everything else is filled in for you.
          </p>
        </div>

        <FormField
          label="Category Name"
          name="name"
          value={name}
          required
          placeholder="e.g. Rudraksha"
          onChange={(e) => handleNameChange(e.target.value)}
          errors={state?.errors?.name}
        />

        {/* The URL is derived from the name; only shown when the admin asks for it. */}
        <input type="hidden" name="slug" value={slug} />
        <div className="flex flex-col gap-1.5 -mt-2">
          <p className="text-xs text-gray-text">
            Page link: <span className="text-dark">/products/category/{slug || "category-name"}</span>
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
              placeholder="auto-generated-from-name"
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
          <Label>Category Image</Label>
          <input type="hidden" name="image" value={image} />

          {!image ? (
            <div className="flex flex-col items-start gap-2">
              <CloudinaryUploadButton onUpload={(url) => setImage(url)} label="Upload Image" />
              <span className="text-xs text-stone-400">Click to upload a high-quality image for this category.</span>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <div className="relative h-40 w-56 overflow-hidden rounded-lg border border-stone-200 bg-stone-100 shadow-sm">
                <Image src={image} alt="Category Image Preview" fill className="object-cover" unoptimized />
              </div>
              <div className="flex items-center gap-3">
                <CloudinaryUploadButton onUpload={(url) => setImage(url)} label="Change Image" />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {state?.errors?.image?.map((m) => (
            <span key={m} className="text-[13px] text-destructive">{m}</span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brown focus:ring-brown cursor-pointer"
          />
          <Label htmlFor="isActive" className="cursor-pointer text-sm text-dark">
            Show this category on the website
          </Label>
        </div>

        <p className="rounded-md bg-stone-50 px-3 py-2 text-xs text-gray-text">
          The position of this category on the site is set with the up/down arrows on the Categories
          list — new categories are added at the end.
        </p>
      </section>

      {/* Landing-page copy is optional: blank fields fall back to generated text. */}
      <section className="flex flex-col gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => setShowCopy((v) => !v)}
          className="flex items-center gap-2 text-left"
        >
          {showCopy ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <span className="flex flex-col">
            <span className="font-prata text-xl text-dark">Landing Page Text (optional)</span>
            <span className="text-xs text-gray-text">
              Leave this closed and we&apos;ll write it for you from the category name. Open it only if you
              want to word it yourself.
            </span>
          </span>
        </button>

        {showCopy && (
          <div className="flex flex-col gap-4 rounded-lg bg-stone-50/70 p-4">
            <p className="text-xs text-gray-text">
              Anything you leave blank uses the greyed-out suggestion shown in the box.
            </p>
            <FormField
              label="Headline"
              name="heroTitle"
              defaultValue={pc?.heroTitle ?? ""}
              placeholder={suggested.heroTitle}
              errors={state?.errors?.heroTitle}
            />
            <TextAreaField
              label="Headline Description"
              name="heroSubtitle"
              defaultValue={pc?.heroSubtitle ?? ""}
              placeholder={suggested.heroSubtitle}
              errors={state?.errors?.heroSubtitle}
            />
            <FormField
              label="Section Heading"
              name="introHeading"
              defaultValue={pc?.introHeading ?? ""}
              placeholder={suggested.introHeading}
              errors={state?.errors?.introHeading}
            />
            <TextAreaField
              label="Section Description"
              name="introDescription"
              defaultValue={pc?.introDescription ?? ""}
              placeholder={suggested.introDescription}
              errors={state?.errors?.introDescription}
            />
          </div>
        )}
      </section>

      {state?.message && <p className="text-sm text-destructive">{state.message}</p>}
      <SubmitButton>{category ? "Save Changes" : "Create Category"}</SubmitButton>
    </form>
  );
}
