"use client";

import { useActionState } from "react";
import { createBlog, updateBlog } from "@/app/actions/admin-blogs";
import type { BlogForAdmin } from "@/lib/admin-blogs";
import RichTextEditor from "@/components/admin/RichTextEditor";
import TextAreaField from "@/components/admin/TextAreaField";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogFormProps {
  blog?: BlogForAdmin;
  categories: { id: string; name: string }[];
}

export default function BlogForm({ blog, categories }: BlogFormProps) {
  const action = blog ? updateBlog.bind(null, blog.id) : createBlog;
  const [state, formAction] = useActionState(action, undefined);

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
            errors={state?.errors?.title}
          />
          <FormField
            label="Slug"
            name="slug"
            defaultValue={blog?.slug}
            placeholder="lowercase-with-hyphens"
            required
            errors={state?.errors?.slug}
          />
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
              ...categories.map((category) => ({ value: category.id, label: category.name })),
            ]}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="No category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">— None —</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.categoryId?.map((message) => (
            <span key={message} className="font-lato text-[13px] text-destructive">
              {message}
            </span>
          ))}
        </div>
        <FormField
          label="Cover Image"
          name="coverImage"
          defaultValue={blog?.coverImage}
          placeholder="/assets/images/blog/..."
          required
          errors={state?.errors?.coverImage}
        />
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
