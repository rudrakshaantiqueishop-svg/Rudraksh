import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { listProductsForAdmin } from "@/lib/admin-products";
import { getCategories } from "@/lib/products";
import { deleteProduct } from "@/app/actions/admin-products";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/currency";
import TableCategoryFilter from "@/components/admin/TableCategoryFilter";
import AdminThumbnail from "@/components/admin/AdminThumbnail";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string; currency?: string }>;
}) {
  await requireAdmin();
  const { q, category, page, currency } = await searchParams;
  const currentCurrency = (currency === "INR" || currency === "USD") ? (currency as "INR" | "USD") : "USD";
  const currentPage = Math.max(1, Number(page) || 1);
  const categoryId = category && category !== "all" ? category : undefined;
  const [{ products, total, pageSize }, categories] = await Promise.all([
    listProductsForAdmin({ search: q, categoryId, page: currentPage }),
    getCategories(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const baseParams = { ...(q ? { q } : {}), ...(categoryId ? { category: categoryId } : {}) };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title & Main Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-prata text-2xl sm:text-3xl text-dark font-normal">Products</h1>
          <p className="mt-1 font-lato text-sm text-gray-text">
            Manage product catalog, inventory levels, and pricing.
          </p>
        </div>
        <Link href="/admin/products/new" className={cn(buttonVariants(), "gap-2 shadow-xs")}>
          <Plus size={16} strokeWidth={1.5} />
          New Product
        </Link>
      </div>

      {/* Search Bar & Currency Toggle Pill */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <form className="flex flex-1 min-w-[280px] gap-2">
          <Input
            type="search"
            name="q"
            placeholder="Search by product title or keyword..."
            defaultValue={q ?? ""}
            className="flex-1 rounded-xl bg-white"
          />
          {categoryId && <input type="hidden" name="category" value={categoryId} />}
          <input type="hidden" name="currency" value={currentCurrency} />
          <Button type="submit" variant="outline" className="rounded-xl">
            Search
          </Button>
        </form>

        {/* Currency Segmented Control Pill */}
        <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200/80 shadow-inner">
          <Link
            href={`/admin/products?${new URLSearchParams({ ...baseParams, currency: "USD" })}`}
            className={cn(
              "px-3.5 py-1.5 text-xs font-semibold rounded-lg font-lato transition-all",
              currentCurrency === "USD" ? "bg-brown text-cream shadow-xs" : "text-stone-600 hover:text-dark"
            )}
          >
            USD ($)
          </Link>
          <Link
            href={`/admin/products?${new URLSearchParams({ ...baseParams, currency: "INR" })}`}
            className={cn(
              "px-3.5 py-1.5 text-xs font-semibold rounded-lg font-lato transition-all",
              currentCurrency === "INR" ? "bg-brown text-cream shadow-xs" : "text-stone-600 hover:text-dark"
            )}
          >
            INR (₹)
          </Link>
        </div>
      </div>

      {/* Mobile Card Grid View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <Card
            key={product.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md"
          >
            <div className="flex items-start gap-3.5">
              {product.images[0] ? (
                <div className="shrink-0 overflow-hidden rounded-xl border border-stone-100">
                  <AdminThumbnail src={product.images[0].url} alt={product.images[0].alt} />
                </div>
              ) : (
                <div className="h-16 w-16 shrink-0 rounded-xl bg-secondary/80 border border-stone-100" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-prata text-base font-medium text-dark leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <Badge variant="secondary">
                    {product.category.name}
                  </Badge>
                  {product.subcategory?.name && (
                    <Badge variant="amber">
                      {product.subcategory.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3.5 font-lato text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-prata text-lg font-semibold text-brown">
                  {formatPrice(product.priceCents, currentCurrency)}
                </span>
                <Badge variant={product.stockCount <= 2 ? "destructive" : "outline"}>
                  Stock: {product.stockCount}
                </Badge>
                {product.isBestseller && (
                  <Badge variant="default" className="text-[10px]">
                    Bestseller
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex items-center gap-1 text-xs font-semibold text-brown hover:underline"
                >
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton
                  action={deleteProduct.bind(null, product.id)}
                  confirmText={`Delete "${product.name}"? This cannot be undone.`}
                />
              </div>
            </div>
          </Card>
        ))}
        {products.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No products found matching your search.
          </div>
        )}
      </div>

      {/* Desktop Product Table View */}
      <div className="hidden md:block border border-border overflow-hidden rounded-2xl bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <TableCategoryFilter categories={categories} currentCategoryId={categoryId} />
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Bestseller</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.images[0] ? (
                    <AdminThumbnail src={product.images[0].url} alt={product.images[0].alt} />
                  ) : (
                    <div className="size-12 rounded bg-secondary" />
                  )}
                </TableCell>
                <TableCell className="font-lato text-sm text-dark">{product.name}</TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {product.category.name}
                </TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {product.subcategory?.name ?? "—"}
                </TableCell>
                <TableCell className="font-lato text-sm text-dark">
                  {formatPrice(product.priceCents, currentCurrency)}
                </TableCell>
                <TableCell className="font-lato text-sm text-dark">{product.stockCount}</TableCell>
                <TableCell className="font-lato text-sm text-dark">
                  {product.isBestseller ? "Yes" : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="font-lato text-sm text-brown underline-offset-4 hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteProduct.bind(null, product.id)}
                      confirmText={`Delete "${product.name}"? This cannot be undone.`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center font-lato text-sm text-gray-text">
                  No products found.
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
              href={`/admin/products?${new URLSearchParams({ ...baseParams, currency: currentCurrency, page: String(currentPage - 1) })}`}
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
              href={`/admin/products?${new URLSearchParams({ ...baseParams, currency: currentCurrency, page: String(currentPage + 1) })}`}
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
