"use client";

import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { Pencil, Video, ArrowUp, ArrowDown } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import {
  deleteInspiredItem,
  moveInspiredItemUp,
  moveInspiredItemDown,
} from "@/app/actions/admin-inspired";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { InspiredItemForAdmin } from "@/lib/admin-inspired";

interface InspiredTableProps {
  items: InspiredItemForAdmin[];
}

export default function InspiredTable({ items }: InspiredTableProps) {
  const [isPending, startTransition] = useTransition();

  const move = (id: string, direction: "up" | "down") => {
    startTransition(async () => {
      await (direction === "up" ? moveInspiredItemUp(id) : moveInspiredItemDown(id));
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Inspired Cards with Shadcn Card & Badge */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {items.map((item, index) => (
          <Card
            key={item.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-3.5">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-stone-100 shadow-xs">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
                <div className="absolute top-1.5 left-1.5">
                  <Badge variant={item.isActive ? "success" : "secondary"} className="text-[9px] px-1.5 py-0">
                    {item.isActive ? "Active" : "Hidden"}
                  </Badge>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-prata text-base font-medium text-dark leading-snug line-clamp-2">{item.title}</h3>
                <div className="mt-1.5 flex items-center gap-1 font-lato text-xs text-brown uppercase font-semibold">
                  {item.type === "video" && <Video size={13} />}
                  <span>{item.type}</span>
                </div>
                {item.price && (
                  <p className="mt-1 font-prata text-base font-semibold text-brown">{item.price}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3.5">
              <div className="flex items-center gap-1.5 bg-stone-100/90 rounded-lg px-2 py-1 border border-stone-200/70 font-lato text-xs">
                <span className="font-semibold text-stone-600">Order #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => move(item.id, "up")}
                  disabled={index === 0 || isPending}
                  className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(item.id, "down")}
                  disabled={index === items.length - 1 || isPending}
                  className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                >
                  <ArrowDown size={14} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/inspired/${item.id}`}
                  className="flex items-center gap-1 font-lato text-xs font-semibold text-brown hover:underline"
                >
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton
                  action={deleteInspiredItem.bind(null, item.id)}
                  confirmText={`Are you sure you want to delete "${item.title}"?`}
                />
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No inspired items found. Create one using the button above.
          </div>
        )}
      </div>

      {/* Desktop Inspired Table */}
      <div className="hidden md:block rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Cover</TableHead>
              <TableHead className="w-[80px]">Product</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type & Video Link</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
              <TableHead className="w-[90px]">Order</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-gray-text font-lato">
                  No inspired items found. Create one using the button above.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative h-14 w-12 overflow-hidden rounded bg-stone-100 border">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded border bg-stone-100">
                      <Image
                        src={item.productImageUrl || item.imageUrl}
                        alt="Inset Product"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-lato font-medium text-dark">{item.title}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brown">
                        {item.type === "video" && <Video size={14} />}
                        {item.type}
                      </span>
                      {item.videoUrl && (
                        <span className="font-mono text-xs text-gray-text truncate max-w-[200px]">
                          {item.videoUrl}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-lato text-sm text-dark">
                    {item.price || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={item.isActive ? "success" : "secondary"}>
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="min-w-[16px] font-lato text-sm text-gray-text">{index + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => move(item.id, "up")}
                          disabled={index === 0 || isPending}
                          title="Move up"
                          className="rounded p-0.5 text-gray-text transition-colors hover:bg-stone-200/50 hover:text-dark disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ArrowUp size={14} strokeWidth={2.5} />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(item.id, "down")}
                          disabled={index === items.length - 1 || isPending}
                          title="Move down"
                          className="rounded p-0.5 text-gray-text transition-colors hover:bg-stone-200/50 hover:text-dark disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ArrowDown size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/inspired/${item.id}`}
                        className="rounded p-1.5 text-gray-600 hover:bg-stone-100 hover:text-dark transition-colors"
                        title="Edit item"
                      >
                        <Pencil size={16} strokeWidth={1.5} />
                      </Link>
                      <DeleteButton
                        action={deleteInspiredItem.bind(null, item.id)}
                        confirmText={`Are you sure you want to delete "${item.title}"?`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
