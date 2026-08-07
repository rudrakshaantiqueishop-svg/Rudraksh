import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import BannerForm from "@/components/admin/BannerForm";

export default async function NewBannerPage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/banners"
          className="flex items-center justify-center h-9 w-9 rounded-full border border-stone-200 bg-white text-dark hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-prata text-2xl text-dark">Create New Banner</h1>
      </div>

      <BannerForm />
    </div>
  );
}
