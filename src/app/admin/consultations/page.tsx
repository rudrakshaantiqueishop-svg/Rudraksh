import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { deleteConsultationRequest } from "@/app/actions/consultation";

export const metadata: Metadata = {
  title: "Consultation Requests | Admin",
};

export const dynamic = "force-dynamic";

export default async function ConsultationsAdminPage() {
  const requests = await prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-prata text-2xl text-dark">Consultation Requests</h2>
      </div>

      <div className="rounded-lg border border-[#E7DFD6] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-[#E7DFD6] bg-[#FEF9F2] text-xs font-bold uppercase tracking-[0.06em] text-gray-text">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer Info</th>
                <th className="px-6 py-4">Birth Details</th>
                <th className="px-6 py-4">Appt Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD6]">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-text">
                    No consultation requests yet.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-dark whitespace-nowrap align-top">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-dark">{req.name}</div>
                      <div className="text-xs text-gray-text mt-0.5">{req.email}</div>
                      <div className="text-xs text-gray-text mt-0.5">{req.phone}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm text-dark"><span className="font-semibold text-xs text-gray-text uppercase tracking-wide mr-1">DOB:</span> {req.dob}</div>
                      <div className="text-sm text-dark mt-0.5"><span className="font-semibold text-xs text-gray-text uppercase tracking-wide mr-1">Time:</span> {req.tob}</div>
                      <div className="text-sm text-dark mt-0.5"><span className="font-semibold text-xs text-gray-text uppercase tracking-wide mr-1">Place:</span> {req.pob}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark whitespace-nowrap align-top">
                      {req.appointmentDate}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                        ${req.status === 'PENDING' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right align-top">
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
