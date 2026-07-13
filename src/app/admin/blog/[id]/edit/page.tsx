import { notFound } from "next/navigation";
import { getCategories } from "@/lib/products";
import { getBlogForAdmin } from "@/lib/admin-blogs";
import { requireStaff } from "@/lib/dal";
import BlogForm from "@/components/admin/BlogForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [blog, categories, user] = await Promise.all([
    getBlogForAdmin(id),
    getCategories(),
    requireStaff(),
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">Edit Blog Post</h1>
      <BlogForm blog={blog} categories={categories} canPublish={user.role === "ADMIN"} />
    </div>
  );
}
