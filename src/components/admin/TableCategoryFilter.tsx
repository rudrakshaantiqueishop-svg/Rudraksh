"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function TableCategoryFilter({
  categories,
  currentCategoryId,
  variant = "table",
}: {
  categories: { id: string; name: string }[];
  currentCategoryId?: string;
  variant?: "table" | "select";
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

  if (variant === "select") {
    return (
      <Select value={currentCategoryId ?? "all"} onValueChange={onValueChange}>
        <SelectTrigger className="w-full sm:w-[190px] h-10 px-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50/80 font-lato text-xs font-medium text-dark shadow-2xs flex items-center justify-between gap-2 transition-colors">
          <div className="flex items-center gap-2 truncate">
            <Filter size={14} className="text-brown shrink-0" />
            <span className="truncate">{currentCategoryId && currentCategoryId !== "all" ? displayLabel : "All Categories"}</span>
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl border border-stone-200 bg-white p-1 shadow-lg font-lato text-xs z-50">
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
