import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Trash2 } from "lucide-react";
import { deleteContactMessage } from "@/app/actions/contact";
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

      <div className="border border-border">
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
