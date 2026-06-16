import { getCategories } from "@/lib/products";
import BlogForm from "@/components/admin/BlogForm";

export default async function NewBlogPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">New Blog Post</h1>
      <BlogForm categories={categories} />
    </div>
  );
}
