import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { listProductsForAdmin } from "@/lib/admin-products";
import { getCategories } from "@/lib/products";
import { deleteProduct } from "@/app/actions/admin-products";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-prata text-2xl text-dark">Products</h1>
        <Link href="/admin/products/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus size={16} strokeWidth={1.5} />
          New Product
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <form className="flex flex-1 min-w-[280px] gap-2">
          <Input
            type="search"
            name="q"
            placeholder="Search by name..."
            defaultValue={q ?? ""}
            className="flex-1"
          />
          {categoryId && <input type="hidden" name="category" value={categoryId} />}
          <input type="hidden" name="currency" value={currentCurrency} />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2 bg-[#FEF9F2] p-1 rounded border border-[#E7DFD6]">
          <Link
            href={`/admin/products?${new URLSearchParams({ ...baseParams, currency: "USD" })}`}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded font-lato transition-colors",
              currentCurrency === "USD" ? "bg-brown text-cream" : "text-gray-text hover:text-dark"
            )}
          >
            USD ($)
          </Link>
          <Link
            href={`/admin/products?${new URLSearchParams({ ...baseParams, currency: "INR" })}`}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded font-lato transition-colors",
              currentCurrency === "INR" ? "bg-brown text-cream" : "text-gray-text hover:text-dark"
            )}
          >
            INR (₹)
          </Link>
        </div>
      </div>

      <div className="border border-border overflow-x-auto">
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
