import { notFound } from "next/navigation";
import {
  getCollectionBySlug,
  getProductsByCollection,
  getCategoriesWithProductCounts,
  getSizeCounts,
} from "@/lib/products";
import ProductListing from "@/components/products/ProductListing";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    getProductsByCollection(slug),
    getCategoriesWithProductCounts(),
  ]);

  const sizeCounts = getSizeCounts(products);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <ProductListing
        products={products}
        categories={categories}
        currentCategorySlug=""
        categoryName={collection.name}
        sizeCounts={sizeCounts}
      />
    </div>
  );
}
