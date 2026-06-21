import Link from "next/link";
import { Plus } from "lucide-react";
import { listBlogsForAdmin } from "@/lib/admin-blogs";
import { getCategories } from "@/lib/products";
import { deleteBlog } from "@/app/actions/admin-blogs";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import TableCategoryFilter from "@/components/admin/TableCategoryFilter";
import AdminThumbnail from "@/components/admin/AdminThumbnail";

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const { q, category, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const categoryId = category && category !== "all" ? category : undefined;
  const [{ posts, total, pageSize }, categories] = await Promise.all([
    listBlogsForAdmin({ search: q, categoryId, page: currentPage }),
    getCategories(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const baseParams = { ...(q ? { q } : {}), ...(categoryId ? { category: categoryId } : {}) };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-prata text-2xl text-dark">Blog Posts</h1>
        <Link href="/admin/blog/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus size={16} strokeWidth={1.5} />
          New Post
        </Link>
      </div>

      <form className="flex flex-wrap gap-2">
        <Input
          type="search"
          name="q"
          placeholder="Search by title..."
          defaultValue={q ?? ""}
          className="flex-1"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      <div className="border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>
                <TableCategoryFilter categories={categories} currentCategoryId={categoryId} />
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <AdminThumbnail src={post.coverImage} alt={post.title} />
                </TableCell>
                <TableCell className="font-lato text-sm text-dark">{post.title}</TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {post.category?.name ?? "—"}
                </TableCell>
                <TableCell className="font-lato text-sm text-gray-text">{post.author}</TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {post.publishedAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="font-lato text-sm text-brown underline-offset-4 hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteBlog.bind(null, post.id)}
                      confirmText={`Delete "${post.title}"? This cannot be undone.`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center font-lato text-sm text-gray-text">
                  No blog posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 font-lato text-sm text-dark">
          {currentPage > 1 ? (
            <Link
              href={`/admin/blog?${new URLSearchParams({ ...baseParams, page: String(currentPage - 1) })}`}
              className="text-brown underline-offset-4 hover:underline"
            >
              Previous
            </Link>
          ) : (
            <span className="text-gray-text">Previous</span>
          )}
          <span>
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/admin/blog?${new URLSearchParams({ ...baseParams, page: String(currentPage + 1) })}`}
              className="text-brown underline-offset-4 hover:underline"
            >
              Next
            </Link>
          ) : (
            <span className="text-gray-text">Next</span>
          )}
        </div>
      )}
    </div>
  );
}
