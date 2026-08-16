import { Suspense } from "react";
import Link from "next/link";
import {
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  Edit3,
  BookOpen,
  User as UserIcon,
  Tag,
  AlertCircle,
  FileText,
} from "lucide-react";
import { listBlogsForAdmin } from "@/lib/admin-blogs";
import { getCategories } from "@/lib/products";
import { deleteBlog, publishBlog } from "@/app/actions/admin-blogs";
import { requireStaff } from "@/lib/dal";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import TableCategoryFilter from "@/components/admin/TableCategoryFilter";
import AdminThumbnail from "@/components/admin/AdminThumbnail";

const STATUS_TABS = [
  { value: undefined, label: "All Posts" },
  { value: "PUBLISHED", label: "Published" },
  { value: "REVIEW", label: "In Review" },
  { value: "DRAFT", label: "Drafts" },
] as const;

const STATUS_BADGE: Record<string, { label: string; class: string; icon: typeof CheckCircle2 }> = {
  DRAFT: {
    label: "Draft",
    class: "bg-slate-100 text-slate-700 border-slate-200",
    icon: FileText,
  },
  REVIEW: {
    label: "In Review",
    class: "bg-amber-100/90 text-amber-900 border-amber-300/80",
    icon: AlertCircle,
  },
  PUBLISHED: {
    label: "Published",
    class: "bg-emerald-100/90 text-emerald-900 border-emerald-300/80",
    icon: CheckCircle2,
  },
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
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-prata text-2xl text-dark sm:text-3xl">Blog Posts</h1>
          <p className="mt-1 font-lato text-sm text-gray-text">
            Manage your articles, drafts, and editorial review submissions.
          </p>
        </div>
        <Link href="/admin/blog/new" className={cn(buttonVariants(), "gap-2 shadow-xs")}>
          <Plus size={18} strokeWidth={2} />
          New Post
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap items-center gap-2">
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
                "rounded-full border px-4 py-1.5 font-lato text-xs font-semibold uppercase tracking-wider transition-all duration-200",
                active
                  ? "border-brown bg-brown text-cream shadow-xs"
                  : "border-stone-200 bg-white text-stone-600 hover:border-brown/50 hover:bg-stone-50 hover:text-dark"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Search Bar */}
      <form className="flex flex-wrap gap-2.5">
        {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
        <Input
          type="search"
          name="q"
          placeholder="Search blogs by title or slug..."
          defaultValue={q ?? ""}
          className="flex-1 bg-white"
        />
        <Button type="submit" variant="outline" className="px-6 font-semibold">
          Search
        </Button>
      </form>

      {/* Blog Cards Section */}
      <Suspense
        key={`${q ?? ""}|${categoryId ?? ""}|${statusFilter ?? ""}|${currentPage}`}
        fallback={<BlogCardGridSkeleton />}
      >
        <BlogCardGridSection
          q={q}
          categoryId={categoryId}
          statusFilter={statusFilter}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}

async function BlogCardGridSection({
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
      {/* Category Filter Bar */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-brown" />
          <span className="font-prata text-sm font-semibold text-dark">
            Showing {posts.length} of {total} articles
          </span>
        </div>
        <TableCategoryFilter categories={categories} currentCategoryId={categoryId} />
      </div>

      {/* Blog Cards Grid */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-800">
            <BookOpen size={24} />
          </div>
          <h3 className="font-prata text-lg text-dark">No blog posts found</h3>
          <p className="max-w-xs font-lato text-sm text-gray-text">
            There are no articles matching your filter criteria. Try clearing search or status filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const badgeMeta = STATUS_BADGE[post.status] ?? STATUS_BADGE.DRAFT;
            const StatusIcon = badgeMeta.icon;

            return (
              <div
                key={post.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brown/30"
              >
                <div>
                  {/* Thumbnail Container with Floating Badges */}
                  <div className="relative h-48 w-full overflow-hidden rounded-xl bg-stone-100">
                    <AdminThumbnail
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Top Left: Category Badge */}
                    {post.category && (
                      <span className="absolute top-3 left-3 rounded-full border border-stone-200/80 bg-white/95 px-3 py-1 font-lato text-[11px] font-bold text-dark shadow-2xs backdrop-blur-xs">
                        {post.category.name}
                      </span>
                    )}

                    {/* Top Right: Status Badge */}
                    <span
                      className={cn(
                        "absolute top-3 right-3 flex items-center gap-1.5 rounded-full border px-3 py-1 font-lato text-[11px] font-bold uppercase tracking-wider shadow-2xs backdrop-blur-xs",
                        badgeMeta.class
                      )}
                    >
                      <StatusIcon size={12} />
                      {badgeMeta.label}
                    </span>
                  </div>

                  {/* Read Time & Tags */}
                  <div className="mt-4 flex items-center justify-between font-lato text-xs text-stone-500">
                    <div className="flex items-center gap-1 text-brown font-semibold">
                      <Clock size={13} />
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-1 text-stone-400">
                        <Tag size={12} />
                        <span className="truncate max-w-[120px]">{post.tags.join(", ")}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="mt-2.5 font-prata text-lg font-medium text-dark leading-snug line-clamp-2 group-hover:text-brown transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 font-lato text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Bottom: Author & Action Bar */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-lato text-xs text-stone-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700 font-bold">
                        <UserIcon size={11} />
                      </div>
                      <span className="truncate text-stone-700 font-medium">
                        {post.authorUser?.name ?? post.authorUser?.email ?? post.author}
                      </span>
                    </div>
                    <span className="shrink-0">{post.publishedAt.toLocaleDateString()}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between border-t border-stone-100/70 pt-3">
                    <div className="flex items-center gap-2">
                      {post.status === "PUBLISHED" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="flex items-center gap-1 font-lato text-xs font-semibold text-stone-600 hover:text-brown transition-colors"
                          title="View Live Article"
                        >
                          <Eye size={14} /> View
                        </Link>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {isAdmin && post.status === "REVIEW" && (
                        <form action={publishBlog.bind(null, post.id)}>
                          <button
                            type="submit"
                            className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-lato text-xs font-bold text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                          >
                            <CheckCircle2 size={13} /> Approve
                          </button>
                        </form>
                      )}
                      
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="flex items-center gap-1 font-lato text-xs font-semibold text-brown hover:underline"
                      >
                        <Edit3 size={13} /> Edit
                      </Link>

                      {isAdmin && (
                        <DeleteButton
                          action={deleteBlog.bind(null, post.id)}
                          confirmText={`Delete "${post.title}"? This cannot be undone.`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 font-lato text-sm text-dark">
          {currentPage > 1 ? (
            <Link
              href={`/admin/blog?${new URLSearchParams({ ...baseParams, page: String(currentPage - 1) })}`}
              className="text-brown underline-offset-4 hover:underline font-semibold"
            >
              Previous
            </Link>
          ) : (
            <span className="text-stone-400">Previous</span>
          )}
          <span className="font-medium text-stone-600">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/admin/blog?${new URLSearchParams({ ...baseParams, page: String(currentPage + 1) })}`}
              className="text-brown underline-offset-4 hover:underline font-semibold"
            >
              Next
            </Link>
          ) : (
            <span className="text-stone-400">Next</span>
          )}
        </div>
      )}
    </>
  );
}

function BlogCardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 h-96">
          <div>
            <div className="h-48 w-full rounded-xl bg-stone-200 mb-4" />
            <div className="h-4 w-1/3 rounded bg-stone-200 mb-2" />
            <div className="h-5 w-3/4 rounded bg-stone-200 mb-2" />
            <div className="h-4 w-full rounded bg-stone-100" />
          </div>
          <div className="h-8 w-full rounded bg-stone-100 border-t pt-2" />
        </div>
      ))}
    </div>
  );
}

