"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createBlog, updateBlog } from "@/app/actions/admin-blogs";
import type { BlogForAdmin } from "@/lib/admin-blogs";
import RichTextEditor from "@/components/admin/RichTextEditor";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";
import TextAreaField from "@/components/admin/TextAreaField";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface BlogFormProps {
  blog?: BlogForAdmin;
  categories: { id: string; name: string }[];
  // Admins may publish directly; writers can only save as Draft or submit for Review.
  canPublish?: boolean;
  // The logged-in staff member's name — used to pre-fill the byline on new
  // posts so the author is a real person, not a hardcoded brand string.
  defaultAuthor?: string;
}

const STATUS_OPTIONS: {
  value: "DRAFT" | "REVIEW" | "PUBLISHED";
  label: string;
  hint: string;
  adminOnly?: boolean;
}[] = [
  { value: "DRAFT", label: "Draft", hint: "Keep working on it — not visible to anyone." },
  { value: "REVIEW", label: "Submit for Review", hint: "Send to an admin to approve & publish." },
  { value: "PUBLISHED", label: "Published", hint: "Live on the site immediately.", adminOnly: true },
];

export default function BlogForm({ blog, categories, canPublish = false, defaultAuthor = "" }: BlogFormProps) {
  const action = blog ? updateBlog.bind(null, blog.id) : createBlog;
  const [state, formAction] = useActionState(action, undefined);

  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!blog?.slug);
  const [coverImage, setCoverImage] = useState(blog?.coverImage ?? "");

  const defaultStatus = blog?.status ?? "DRAFT";
  const availableStatuses = STATUS_OPTIONS.filter((opt) => canPublish || !opt.adminOnly);

  const defaultPublishedAt = blog?.publishedAt
    ? blog.publishedAt.toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Title"
            name="title"
            defaultValue={blog?.title}
            required
            onChange={(e) => { if (!slugTouched) setSlug(toSlug(e.target.value)); }}
            errors={state?.errors?.title}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              required
              placeholder="auto-generated-from-title"
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            />
            <p className="font-lato text-xs text-gray-text">
              URL path: /blog/<em>{slug || "slug"}</em>
            </p>
            {state?.errors?.slug?.map((msg) => (
              <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label="Author"
            name="author"
            defaultValue={blog?.author ?? defaultAuthor}
            required
            errors={state?.errors?.author}
          />
          <FormField
            label="Read Time (minutes)"
            name="readTimeMinutes"
            type="number"
            defaultValue={blog?.readTimeMinutes ?? 5}
            required
            errors={state?.errors?.readTimeMinutes}
          />
          <FormField
            label="Published Date"
            name="publishedAt"
            type="date"
            defaultValue={defaultPublishedAt}
            required
            errors={state?.errors?.publishedAt}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Category <span className="text-destructive">*</span></Label>
          <Select
            name="categoryId"
            defaultValue={blog?.categoryId ?? ""}
            required
            items={categories.map((c) => ({ value: c.id, label: c.name }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.categoryId?.map((msg) => (
            <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            defaultValue={blog?.tags?.join(", ") ?? ""}
            placeholder="e.g. Rudraksha, Meditation, Spirituality"
          />
          <p className="font-lato text-xs text-gray-text">Separate tags with commas.</p>
          {state?.errors?.tags?.map((msg) => (
            <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
          ))}
        </div>

        {/* Cover image with upload */}
        <div className="flex flex-col gap-1.5">
          <Label>Cover Image</Label>
          <div className="flex gap-3">
            {coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-16 w-16 shrink-0 rounded border border-border object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  name="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Paste URL or upload →"
                  className="flex-1"
                />
                <CloudinaryUploadButton label="Upload" onUpload={setCoverImage} />
              </div>
              <Input
                name="coverImageAlt"
                defaultValue={blog?.coverImageAlt ?? ""}
                placeholder="Alt text — describe the image for accessibility & SEO"
              />
            </div>
          </div>
          {state?.errors?.coverImage?.map((msg) => (
            <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
          ))}
          {state?.errors?.coverImageAlt?.map((msg) => (
            <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Content</h2>
        <TextAreaField
          label="Excerpt"
          name="excerpt"
          defaultValue={blog?.excerpt}
          required
          errors={state?.errors?.excerpt}
        />
        <RichTextEditor
          label="Body"
          name="body"
          defaultValue={blog?.body}
          errors={state?.errors?.body}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">SEO</h2>
        <FormField
          label="Meta Title"
          name="metaTitle"
          defaultValue={blog?.metaTitle ?? ""}
          errors={state?.errors?.metaTitle}
        />
        <TextAreaField
          label="Meta Description"
          name="metaDescription"
          defaultValue={blog?.metaDescription ?? ""}
          errors={state?.errors?.metaDescription}
        />
        <p className="font-lato text-xs text-gray-text -mt-2">
          Used for search engines and social previews. Leave blank to fall back to the title and excerpt.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Publishing</h2>
        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">Status</legend>
          {availableStatuses.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 has-[:checked]:border-brown has-[:checked]:bg-secondary/40"
            >
              <input
                type="radio"
                name="status"
                value={opt.value}
                defaultChecked={defaultStatus === opt.value}
                className="mt-1 accent-brown"
              />
              <span className="flex flex-col">
                <span className="font-lato text-sm font-semibold text-dark">{opt.label}</span>
                <span className="font-lato text-xs text-gray-text">{opt.hint}</span>
              </span>
            </label>
          ))}
        </fieldset>
        {!canPublish && (
          <p className="font-lato text-xs text-gray-text">
            Submitted posts are reviewed by an admin before going live.
          </p>
        )}
        {state?.errors?.status?.map((msg) => (
          <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
        ))}
      </section>

      {state?.message && <p className="font-lato text-sm text-destructive">{state.message}</p>}

      <SubmitButton>{blog ? "Save Changes" : "Create Post"}</SubmitButton>
    </form>
  );
}
