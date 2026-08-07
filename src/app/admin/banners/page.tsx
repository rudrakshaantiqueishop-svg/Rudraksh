import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { listBannersForAdmin } from "@/lib/admin-banners";
import BannerTable from "@/components/admin/BannerTable";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminBannersPage() {
  await requireAdmin();
  const banners = await listBannersForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-prata text-2xl text-dark">Promotional Banners (CMS)</h1>
          <p className="font-lato text-sm text-gray-text mt-1">
            Manage the content, text, CTA links, colors, and background images of homepage banners.
          </p>
        </div>
        <Link href="/admin/banners/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus size={16} strokeWidth={1.5} />
          New Banner
        </Link>
      </div>

      <BannerTable banners={banners} />
    </div>
  );
}
