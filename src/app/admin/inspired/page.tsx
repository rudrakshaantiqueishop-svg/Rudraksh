import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { listInspiredItemsForAdmin } from "@/lib/admin-inspired";
import InspiredTable from "@/components/admin/InspiredTable";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminInspiredPage() {
  await requireAdmin();
  const items = await listInspiredItemsForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-prata text-2xl text-dark">Get Inspired (CMS)</h1>
          <p className="font-lato text-sm text-gray-text mt-1">
            Manage YouTube Shorts, customer review videos, product thumbnail insets, and prices shown in the Get Inspired section.
          </p>
        </div>
        <Link href="/admin/inspired/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus size={16} strokeWidth={1.5} />
          New Item
        </Link>
      </div>

      <InspiredTable items={items} />
    </div>
  );
}
