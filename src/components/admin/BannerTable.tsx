"use client";

import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { Pencil, ArrowUp, ArrowDown } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBanner, moveBannerUp, moveBannerDown } from "@/app/actions/admin-banners";
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
import type { BannerForAdmin } from "@/lib/admin-banners";

interface BannerTableProps {
  banners: BannerForAdmin[];
}

export default function BannerTable({ banners }: BannerTableProps) {
  const [isPending, startTransition] = useTransition();

  const move = (id: string, direction: "up" | "down") => {
    startTransition(async () => {
      await (direction === "up" ? moveBannerUp(id) : moveBannerDown(id));
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Banner Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {banners.map((banner, index) => (
          <Card
            key={banner.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md transition-all duration-200"
          >
            <div className="relative h-36 w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-100">
              <Image
                src={banner.imageUrl}
                alt={banner.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-2.5 right-2.5">
                <Badge variant={banner.isActive ? "success" : "secondary"}>
                  {banner.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-prata text-base font-medium text-dark leading-snug">{banner.name}</h3>
              <p className="font-lato text-xs text-stone-600 truncate mt-1">{banner.title}</p>
              <p className="font-lato text-xs text-stone-400 truncate mt-1">Link: {banner.ctaLink}</p>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3.5">
              <div className="flex items-center gap-1.5 bg-stone-100/90 rounded-lg px-2 py-1 border border-stone-200/70 font-lato text-xs">
                <span className="font-semibold text-stone-600">Order #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => move(banner.id, "up")}
                  disabled={index === 0 || isPending}
                  className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(banner.id, "down")}
                  disabled={index === banners.length - 1 || isPending}
                  className="p-1 hover:bg-stone-200 rounded text-stone-700 disabled:opacity-30 transition-colors"
                >
                  <ArrowDown size={14} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/banners/${banner.id}`}
                  className="flex items-center gap-1 font-lato text-xs font-semibold text-brown hover:underline"
                >
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton
                  action={deleteBanner.bind(null, banner.id)}
                  confirmText={`Are you sure you want to delete banner "${banner.name}"?`}
                />
              </div>
            </div>
          </Card>
        ))}
        {banners.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No banners found. Create one using the button above.
          </div>
        )}
      </div>

      {/* Desktop Banner Table */}
      <div className="hidden md:block rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Preview</TableHead>
              <TableHead>Banner Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Button Goes To</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
              <TableHead className="w-[90px]">Order</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-gray-text font-lato">
                  No banners found. Create one using the button above.
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner, index) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="relative h-14 w-24 overflow-hidden rounded-lg bg-stone-100 border border-stone-100">
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
                    <span className="font-lato font-medium text-dark">{banner.name}</span>
                  </TableCell>
                  <TableCell className="max-w-[240px] truncate font-lato text-sm text-dark">
                    {banner.title}
                  </TableCell>
                  <TableCell className="font-lato text-xs text-gray-text truncate max-w-[150px]">
                    {banner.ctaLink}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={banner.isActive ? "success" : "secondary"}>
                      {banner.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="min-w-[16px] font-lato text-sm text-gray-text">{index + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => move(banner.id, "up")}
                          disabled={index === 0 || isPending}
                          title="Move up"
                          className="rounded p-0.5 text-gray-text transition-colors hover:bg-stone-200/50 hover:text-dark disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ArrowUp size={14} strokeWidth={2.5} />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(banner.id, "down")}
                          disabled={index === banners.length - 1 || isPending}
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
    </div>
  );
}
