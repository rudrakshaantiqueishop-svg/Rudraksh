import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
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

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const { q, category, page } = await searchParams;
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

      <form className="flex flex-wrap gap-2">
        <Input
          type="search"
          name="q"
          placeholder="Search by name..."
          defaultValue={q ?? ""}
          className="flex-1"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <TableCategoryFilter categories={categories} currentCategoryId={categoryId} />
              </TableHead>
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
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      width={48}
                      height={48}
                      className="size-12 object-cover"
                    />
                  ) : (
                    <div className="size-12 bg-secondary" />
                  )}
                </TableCell>
                <TableCell className="font-lato text-sm text-dark">{product.name}</TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {product.category.name}
                </TableCell>
                <TableCell className="font-lato text-sm text-dark">
                  {formatPrice(product.priceCents, "USD")}
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
                <TableCell colSpan={7} className="text-center font-lato text-sm text-gray-text">
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
              href={`/admin/products?${new URLSearchParams({ ...baseParams, page: String(currentPage - 1) })}`}
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
              href={`/admin/products?${new URLSearchParams({ ...baseParams, page: String(currentPage + 1) })}`}
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
