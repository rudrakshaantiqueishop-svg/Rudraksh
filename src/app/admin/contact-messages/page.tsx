import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Trash2 } from "lucide-react";
import { deleteContactMessage } from "@/app/actions/contact";
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
      <div>
        <h2 className="font-prata text-2xl sm:text-3xl text-dark font-normal">Contact Submissions</h2>
        <p className="mt-1 font-lato text-sm text-gray-text">
          Read inquiries, customer feedback, and messages submitted via the contact form.
        </p>
      </div>

      {/* Mobile Contact Message Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {messages.map((msg) => (
          <Card
            key={msg.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3.5">
              <div>
                <h3 className="font-prata text-base font-medium text-dark">{msg.name}</h3>
                <p className="font-lato text-xs text-stone-500 mt-0.5">{msg.email} {msg.phone ? `· ${msg.phone}` : ""}</p>
              </div>
              <span className="font-lato text-xs text-stone-400">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Badge variant="amber" className="w-fit">
                {msg.subject}
              </Badge>
              <p className="font-lato text-xs text-stone-700 bg-stone-50/80 p-3.5 rounded-xl border border-stone-200/60 whitespace-pre-wrap leading-relaxed mt-1">
                {msg.message}
              </p>
            </div>

            <div className="flex justify-end border-t border-stone-100 pt-3">
              <form action={deleteContactMessage.bind(null, msg.id)}>
                <button
                  type="submit"
                  className="flex items-center gap-1 font-lato text-xs font-semibold text-stone-400 hover:text-destructive transition-colors"
                  title="Delete Message"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </form>
            </div>
          </Card>
        ))}
        {messages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No contact submissions yet.
          </div>
        )}
      </div>

      {/* Desktop Contact Messages Table View */}
      <div className="hidden md:block border border-border overflow-hidden rounded-2xl bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4">Date</TableHead>
              <TableHead className="px-6 py-4">Sender Info</TableHead>
              <TableHead className="px-6 py-4">Subject</TableHead>
              <TableHead className="px-6 py-4">Message</TableHead>
              <TableHead className="px-6 py-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center font-lato text-sm text-gray-text py-8">
                  No contact submissions yet.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="px-6 py-4 text-sm text-dark whitespace-nowrap align-top">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top whitespace-nowrap">
                    <div className="font-medium text-dark">{msg.name}</div>
                    <div className="text-xs text-gray-text mt-0.5">{msg.email}</div>
                    {msg.phone && <div className="text-xs text-gray-text mt-0.5">{msg.phone}</div>}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-dark font-medium align-top">
                    {msg.subject}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-dark align-top whitespace-pre-wrap max-w-md">
                    {msg.message}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right align-top">
                    <form action={deleteContactMessage.bind(null, msg.id)}>
                      <button 
                        type="submit" 
                        className="inline-flex items-center text-gray-text hover:text-destructive text-sm font-medium transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
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
