import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { getStoreCatalogForAdmin } from "@/lib/admin-inspired";
import InspiredForm from "@/components/admin/InspiredForm";

export default async function NewInspiredItemPage() {
  await requireAdmin();
  const catalog = await getStoreCatalogForAdmin();

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/inspired"
          className="flex items-center justify-center h-9 w-9 rounded-full border border-stone-200 bg-white text-dark hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-prata text-2xl text-dark">Create New Inspired Item</h1>
      </div>

      <InspiredForm catalog={catalog} />
    </div>
  );
}
