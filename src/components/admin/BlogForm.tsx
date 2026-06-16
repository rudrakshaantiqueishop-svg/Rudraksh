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
}

export default function BlogForm({ blog, categories }: BlogFormProps) {
  const action = blog ? updateBlog.bind(null, blog.id) : createBlog;
  const [state, formAction] = useActionState(action, undefined);

  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!blog?.slug);
  const [coverImage, setCoverImage] = useState(blog?.coverImage ?? "");

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
            defaultValue={blog?.author ?? "Rudraksha Antiquei"}
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
          <Label>Category</Label>
          <Select
            name="categoryId"
            defaultValue={blog?.categoryId ?? ""}
            items={[
              { value: "", label: "— None —" },
              ...categories.map((c) => ({ value: c.id, label: c.name })),
            ]}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="No category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">— None —</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.categoryId?.map((msg) => (
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
            </div>
          </div>
          {state?.errors?.coverImage?.map((msg) => (
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

      {state?.message && <p className="font-lato text-sm text-destructive">{state.message}</p>}

      <SubmitButton>{blog ? "Save Changes" : "Create Post"}</SubmitButton>
    </form>
  );
}
