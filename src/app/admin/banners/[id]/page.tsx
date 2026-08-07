import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { getBannerForAdmin } from "@/lib/admin-banners";
import BannerForm from "@/components/admin/BannerForm";

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const banner = await getBannerForAdmin(id);

  if (!banner) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/banners"
          className="flex items-center justify-center h-9 w-9 rounded-full border border-stone-200 bg-white text-dark hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-prata text-2xl text-dark">Edit Banner</h1>
          <p className="font-mono text-xs text-gray-text mt-0.5">{banner.key}</p>
        </div>
      </div>

      <BannerForm banner={banner} />
    </div>
  );
}
