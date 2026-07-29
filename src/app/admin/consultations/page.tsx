import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Eye, Trash2 } from "lucide-react";
import { deleteConsultationRequest } from "@/app/actions/consultation";
import { requireAdmin } from "@/lib/dal";
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
      <div className="flex items-center justify-between">
        <h2 className="font-prata text-2xl text-dark">Consultation Requests</h2>
      </div>

      <div className="border border-border">
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
