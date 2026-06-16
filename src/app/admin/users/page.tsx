import Link from "next/link";
import { listUsersForAdmin } from "@/lib/admin-users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const { users, total, pageSize } = await listUsersForAdmin({ search: q, page: currentPage });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-prata text-2xl text-dark">Users</h1>

      <form className="flex gap-2">
        <Input type="search" name="q" placeholder="Search by name or email..." defaultValue={q ?? ""} />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-lato text-sm text-dark">{user.name ?? "—"}</TableCell>
                <TableCell className="font-lato text-sm text-gray-text">{user.email}</TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {user.phone ?? "—"}
                </TableCell>
                <TableCell className="font-lato text-sm text-dark">
                  <span className="inline-block border border-border px-2 py-0.5 text-xs uppercase tracking-wide">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="font-lato text-sm text-gray-text">
                  {user.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="font-lato text-sm text-brown underline-offset-4 hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center font-lato text-sm text-gray-text">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 font-lato text-sm text-dark">
          {currentPage > 1 ? (
            <Link
              href={`/admin/users?${new URLSearchParams({ ...(q ? { q } : {}), page: String(currentPage - 1) })}`}
              className="text-brown underline-offset-4 hover:underline"
            >
              Previous
            </Link>
          ) : (
            <span className="text-gray-text">Previous</span>
          )}
          <span>
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/admin/users?${new URLSearchParams({ ...(q ? { q } : {}), page: String(currentPage + 1) })}`}
              className="text-brown underline-offset-4 hover:underline"
            >
              Next
            </Link>
          ) : (
            <span className="text-gray-text">Next</span>
          )}
        </div>
      )}
    </div>
  );
}
