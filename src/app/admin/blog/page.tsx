import { Suspense } from "react";
import Link from "next/link";
import { Plus, CheckCircle2 } from "lucide-react";
import { listBlogsForAdmin } from "@/lib/admin-blogs";
import { getCategories } from "@/lib/products";
import { deleteBlog, publishBlog } from "@/app/actions/admin-blogs";
import { requireStaff } from "@/lib/dal";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const STATUS_TABS = [
  { value: undefined, label: "All" },
  { value: "REVIEW", label: "In Review" },
  { value: "DRAFT", label: "Drafts" },
  { value: "PUBLISHED", label: "Published" },
] as const;

const STATUS_BADGE: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600 border-gray-300",
  REVIEW: "bg-amber-100 text-amber-800 border-amber-300",
  PUBLISHED: "bg-green-100 text-green-800 border-green-300",
};

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft",
  REVIEW: "In Review",
  PUBLISHED: "Published",
};

type Status = "DRAFT" | "REVIEW" | "PUBLISHED";

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; status?: string; page?: string }>;
}) {
  const { q, category, status, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const categoryId = category && category !== "all" ? category : undefined;
  const statusFilter: Status | undefined =
    status === "DRAFT" || status === "REVIEW" || status === "PUBLISHED" ? status : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-prata text-2xl text-dark">Blog Posts</h1>
        <Link href="/admin/blog/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus size={16} strokeWidth={1.5} />
          New Post
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => {
          const active = tab.value === statusFilter;
          const params = new URLSearchParams({
            ...(q ? { q } : {}),
            ...(categoryId ? { category: categoryId } : {}),
            ...(tab.value ? { status: tab.value } : {}),
          });
          return (
            <Link
              key={tab.label}
              href={`/admin/blog${params.toString() ? `?${params}` : ""}`}
              className={cn(
                "rounded-full border px-4 py-1.5 font-lato text-sm transition-colors",
                active
                  ? "border-brown bg-brown text-cream"
                  : "border-border text-gray-text hover:border-brown hover:text-dark"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <form className="flex flex-wrap gap-2">
        {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
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

      {/* Only the table streams in — the shell above stays interactive so tab
          switches feel instant instead of blanking the whole page. */}
      <Suspense
        key={`${q ?? ""}|${categoryId ?? ""}|${statusFilter ?? ""}|${currentPage}`}
        fallback={<BlogTableSkeleton />}
      >
        <BlogTableSection
          q={q}
          categoryId={categoryId}
          statusFilter={statusFilter}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}

async function BlogTableSection({
  q,
  categoryId,
  statusFilter,
  currentPage,
}: {
  q?: string;
  categoryId?: string;
  statusFilter?: Status;
  currentPage: number;
}) {
  const user = await requireStaff();
  const isAdmin = user.role === "ADMIN";

  const [{ posts, total, pageSize }, categories] = await Promise.all([
    listBlogsForAdmin({ search: q, categoryId, status: statusFilter, page: currentPage }),
    getCategories(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const baseParams = {
    ...(q ? { q } : {}),
    ...(categoryId ? { category: categoryId } : {}),
    ...(statusFilter ? { status: statusFilter } : {}),
  };

  return (
    <>
      {/* Mobile Blog Post Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-3.5">
              <div className="shrink-0 overflow-hidden rounded-xl border border-stone-100">
                <AdminThumbnail src={post.coverImage} alt={post.title} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-prata text-base font-medium text-dark leading-snug line-clamp-2">{post.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-1.5 font-lato text-xs">
                  <Badge variant={post.status === "PUBLISHED" ? "success" : post.status === "REVIEW" ? "amber" : "secondary"}>
                    {STATUS_LABEL[post.status]}
                  </Badge>
                  {post.category && (
                    <Badge variant="outline">
                      {post.category.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3.5 font-lato text-xs text-stone-500">
              <span>By <strong className="text-stone-700">{post.authorUser?.name ?? post.authorUser?.email ?? post.author}</strong></span>
              <span>{post.publishedAt.toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-stone-100 pt-3">
              {isAdmin && post.status === "REVIEW" && (
                <form action={publishBlog.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="flex items-center gap-1 font-lato text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    <CheckCircle2 size={14} /> Approve
                  </button>
                </form>
              )}
              <Link
                href={`/admin/blog/${post.id}/edit`}
                className="font-lato text-xs font-semibold text-brown hover:underline"
              >
                Edit
              </Link>
              {isAdmin && (
                <DeleteButton
                  action={deleteBlog.bind(null, post.id)}
                  confirmText={`Delete "${post.title}"? This cannot be undone.`}
                />
              )}
            </div>
          </Card>
        ))}
        {posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No blog posts found.
          </div>
        )}
      </div>

      {/* Desktop Blog Table View */}
      <div className="hidden md:block border border-border overflow-hidden rounded-2xl bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell>
                  <span
                    className={cn(
                      "inline-block whitespace-nowrap rounded-full border px-2 py-0.5 font-lato text-xs",
                      STATUS_BADGE[post.status]
                    )}
                  >
                    {STATUS_LABEL[post.status]}
                  </span>
                </TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {post.category?.name ?? "—"}
                </TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {post.authorUser?.name ?? post.authorUser?.email ?? post.author}
                </TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {post.publishedAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    {isAdmin && post.status === "REVIEW" && (
                      <form action={publishBlog.bind(null, post.id)}>
                        <button
                          type="submit"
                          className="flex items-center gap-1 font-lato text-sm text-green-700 underline-offset-4 hover:underline"
                        >
                          <CheckCircle2 size={15} strokeWidth={1.5} />
                          Approve
                        </button>
                      </form>
                    )}
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="font-lato text-sm text-brown underline-offset-4 hover:underline"
                    >
                      Edit
                    </Link>
                    {isAdmin && (
                      <DeleteButton
                        action={deleteBlog.bind(null, post.id)}
                        confirmText={`Delete "${post.title}"? This cannot be undone.`}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center font-lato text-sm text-gray-text">
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
    </>
  );
}

function BlogTableSkeleton() {
  return (
    <div className="border border-border overflow-hidden">
      <div className="animate-pulse">
        <div className="flex items-center gap-4 border-b border-border bg-secondary/40 px-4 py-3">
          {["Cover", "Title", "Status", "Category", "Author", "Published", "Actions"].map((h) => (
            <div key={h} className="h-3 flex-1 rounded bg-[#E7DFD6]" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-0">
            <div className="h-10 w-10 rounded bg-[#F0E4D8]" />
            <div className="h-4 flex-1 rounded bg-[#F0E4D8]" />
            <div className="h-4 flex-1 rounded bg-[#F0E4D8]" />
            <div className="h-4 flex-1 rounded bg-[#F0E4D8]" />
            <div className="h-4 flex-1 rounded bg-[#F0E4D8]" />
            <div className="h-4 flex-1 rounded bg-[#F0E4D8]" />
            <div className="h-4 flex-1 rounded bg-[#F0E4D8]" />
          </div>
        ))}
      </div>
    </div>
  );
}
