import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Trash2 } from "lucide-react";
import { deleteContactMessage } from "@/app/actions/contact";
import { requireAdmin } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Contact Messages | Admin",
};

export const dynamic = "force-dynamic";

export default async function ContactMessagesAdminPage() {
  await requireAdmin();
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-prata text-2xl text-dark">Contact Form Submissions</h2>
      </div>

      <div className="rounded-lg border border-[#E7DFD6] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-[#E7DFD6] bg-[#FEF9F2] text-xs font-bold uppercase tracking-[0.06em] text-gray-text">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Sender Info</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD6]">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-text">
                    No contact submissions yet.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-dark whitespace-nowrap align-top">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap">
                      <div className="font-medium text-dark">{msg.name}</div>
                      <div className="text-xs text-gray-text mt-0.5">{msg.email}</div>
                      {msg.phone && <div className="text-xs text-gray-text mt-0.5">{msg.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark font-medium align-top">
                      {msg.subject}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark align-top whitespace-pre-wrap max-w-md">
                      {msg.message}
                    </td>
                    <td className="px-6 py-4 text-right align-top">
                      <form action={deleteContactMessage.bind(null, msg.id)}>
                        <button 
                          type="submit" 
                          className="inline-flex items-center text-gray-text hover:text-destructive text-sm font-medium transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
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
