import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { getInspiredItemForAdmin, getStoreCatalogForAdmin } from "@/lib/admin-inspired";
import InspiredForm from "@/components/admin/InspiredForm";

export default async function EditInspiredItemPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const item = await getInspiredItemForAdmin(id);
  const catalog = await getStoreCatalogForAdmin();

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/inspired"
          className="flex items-center justify-center h-9 w-9 rounded-full border border-stone-200 bg-white text-dark hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-prata text-2xl text-dark">Edit Inspired Item</h1>
          <p className="font-lato text-sm text-gray-text mt-0.5">{item.title}</p>
        </div>
      </div>

      <InspiredForm item={item} catalog={catalog} />
    </div>
  );
}
