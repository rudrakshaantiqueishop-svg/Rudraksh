"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function TableCategoryFilter({
  categories,
  currentCategoryId,
}: {
  categories: { id: string; name: string }[];
  currentCategoryId?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onValueChange = (val: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!val || val === "all") {
      params.delete("category");
    } else {
      params.set("category", val);
    }
    params.delete("page"); // reset to page 1
    router.push(`${pathname}?${params.toString()}`);
  };

  const displayLabel = currentCategoryId && currentCategoryId !== "all"
    ? categories.find((c) => c.id === currentCategoryId)?.name || "Category"
    : "Category";

  return (
    <Select value={currentCategoryId ?? "all"} onValueChange={onValueChange}>
      <SelectTrigger className="h-auto p-0 border-none bg-transparent hover:bg-transparent shadow-none focus-visible:ring-0 gap-1.5 text-muted-foreground font-medium w-fit">
        {displayLabel}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
