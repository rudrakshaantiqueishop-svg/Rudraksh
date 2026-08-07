"use client";

import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBanner } from "@/app/actions/admin-banners";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BannerForAdmin } from "@/lib/admin-banners";

interface BannerTableProps {
  banners: BannerForAdmin[];
}

export default function BannerTable({ banners }: BannerTableProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Preview</TableHead>
            <TableHead>Banner Name & Key</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>CTA Link</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-gray-text font-lato">
                No banners found. Create one using the button above.
              </TableCell>
            </TableRow>
          ) : (
            banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="relative h-14 w-24 overflow-hidden rounded bg-stone-100">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-lato font-medium text-dark">{banner.name}</span>
                    <span className="font-mono text-xs text-gray-text">{banner.key}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[240px] truncate font-lato text-sm text-dark">
                  {banner.title}
                </TableCell>
                <TableCell className="font-lato text-xs text-gray-text truncate max-w-[150px]">
                  {banner.ctaLink}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      banner.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {banner.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/banners/${banner.id}`}
                      className="rounded p-1.5 text-gray-600 hover:bg-stone-100 hover:text-dark transition-colors"
                      title="Edit banner"
                    >
                      <Pencil size={16} strokeWidth={1.5} />
                    </Link>
                    <DeleteButton
                      action={deleteBanner.bind(null, banner.id)}
                      confirmText={`Are you sure you want to delete banner "${banner.name}"?`}
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
