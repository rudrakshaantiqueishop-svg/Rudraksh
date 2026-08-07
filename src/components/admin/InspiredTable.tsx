"use client";

import Link from "next/link";
import Image from "next/image";
import { Pencil, Video } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteInspiredItem } from "@/app/actions/admin-inspired";
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
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Cover</TableHead>
            <TableHead className="w-[80px]">Inset Prod</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type & Video Link</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-text font-lato">
                No inspired items found. Create one using the button above.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
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
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
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
  );
}
