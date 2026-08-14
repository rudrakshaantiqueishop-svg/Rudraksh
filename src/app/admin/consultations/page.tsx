import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Eye, Trash2 } from "lucide-react";
import { deleteConsultationRequest } from "@/app/actions/consultation";
import { requireAdmin } from "@/lib/dal";
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

export const metadata: Metadata = {
  title: "Consultation Requests | Admin",
};

export const dynamic = "force-dynamic";

export default async function ConsultationsAdminPage() {
  await requireAdmin();
  const requests = await prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-prata text-2xl sm:text-3xl text-dark font-normal">Consultation Requests</h2>
        <p className="mt-1 font-lato text-sm text-gray-text">
          Review astrological & Rudraksha consultation requests and birth Kundali charts.
        </p>
      </div>

      {/* Mobile Consultation Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {requests.map((req) => (
          <Card
            key={req.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3.5">
              <div>
                <h3 className="font-prata text-base font-medium text-dark">{req.name}</h3>
                <p className="font-lato text-xs text-stone-500 mt-0.5">{req.email} · {req.phone}</p>
              </div>
              <Badge variant={req.status === "PENDING" ? "amber" : "success"}>
                {req.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-lato text-stone-700 bg-stone-50/80 p-3.5 rounded-xl border border-stone-200/60">
              <div><span className="font-semibold text-stone-400">DOB:</span> {req.dob}</div>
              <div><span className="font-semibold text-stone-400">Time:</span> {req.tob}</div>
              <div className="col-span-2"><span className="font-semibold text-stone-400">Place:</span> {req.pob}</div>
              <div className="col-span-2 mt-1 pt-1.5 border-t border-stone-200/60 font-semibold text-brown">
                Appt Date: {req.appointmentDate}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3.5">
              <span className="font-lato text-xs text-stone-400">
                Submitted {new Date(req.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={req.kundaliUrl.includes("res.cloudinary.com") ? req.kundaliUrl.replace("/upload/", "/upload/fl_attachment/") : req.kundaliUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-brown font-semibold text-xs hover:underline"
                >
                  <Eye size={14} /> Kundali
                </a>
                <form action={deleteConsultationRequest.bind(null, req.id)}>
                  <button
                    type="submit"
                    className="p-1 text-stone-400 hover:text-destructive transition-colors"
                    title="Delete Request"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No consultation requests yet.
          </div>
        )}
      </div>

      {/* Desktop Consultations Table View */}
      <div className="hidden md:block border border-border overflow-hidden rounded-2xl bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4">Date</TableHead>
              <TableHead className="px-6 py-4">Customer Info</TableHead>
              <TableHead className="px-6 py-4">Birth Details</TableHead>
              <TableHead className="px-6 py-4">Appt Date</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center font-lato text-sm text-gray-text py-8">
                  No consultation requests yet.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="px-6 py-4 text-sm text-dark whitespace-nowrap align-top">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <div className="font-medium text-dark">{req.name}</div>
                    <div className="text-xs text-gray-text mt-0.5">{req.email}</div>
                    <div className="text-xs text-gray-text mt-0.5">{req.phone}</div>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <div className="text-sm text-dark"><span className="font-semibold text-xs text-gray-text uppercase tracking-wide mr-1">DOB:</span> {req.dob}</div>
                    <div className="text-sm text-dark mt-0.5"><span className="font-semibold text-xs text-gray-text uppercase tracking-wide mr-1">Time:</span> {req.tob}</div>
                    <div className="text-sm text-dark mt-0.5"><span className="font-semibold text-xs text-gray-text uppercase tracking-wide mr-1">Place:</span> {req.pob}</div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-dark whitespace-nowrap align-top">
                    {req.appointmentDate}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                      ${req.status === 'PENDING' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {req.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right align-top">
                    <div className="flex items-center justify-end gap-4">
                      <a 
                        href={req.kundaliUrl.includes("res.cloudinary.com") ? req.kundaliUrl.replace("/upload/", "/upload/fl_attachment/") : req.kundaliUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-brown hover:text-[#431f0d] text-sm font-medium transition-colors"
                      >
                        <Eye size={16} />
                        Kundali
                      </a>
                      <form action={deleteConsultationRequest.bind(null, req.id)}>
                        <button 
                          type="submit" 
                          className="inline-flex items-center text-gray-text hover:text-destructive text-sm font-medium transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
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
