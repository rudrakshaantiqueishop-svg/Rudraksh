import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { listUsersForAdmin } from "@/lib/admin-users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  await requireAdmin();
  const { q, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const { users, total, pageSize } = await listUsersForAdmin({ search: q, page: currentPage });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-prata text-2xl sm:text-3xl text-dark font-normal">Users</h1>
        <p className="mt-1 font-lato text-sm text-gray-text">
          Manage registered user accounts, customer profiles, and staff roles.
        </p>
      </div>

      <form className="flex gap-2">
        <Input type="search" name="q" placeholder="Search by name or email address..." defaultValue={q ?? ""} className="rounded-xl bg-white" />
        <Button type="submit" variant="outline" className="rounded-xl">
          Search
        </Button>
      </form>

      {/* Mobile User Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <Card
            key={user.id}
            className="p-5 flex flex-col justify-between gap-4 bg-white hover:border-amber-900/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3.5">
              <div>
                <h3 className="font-prata text-base font-medium text-dark">{user.name ?? "User"}</h3>
                <p className="font-lato text-xs text-stone-500 mt-0.5">{user.email}</p>
              </div>
              <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                {user.role}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs font-lato text-stone-500">
              <span>Phone: <strong className="text-dark font-medium">{user.phone ?? "—"}</strong></span>
              <span>Joined: {user.createdAt.toLocaleDateString()}</span>
            </div>

            <div className="flex justify-end border-t border-stone-100 pt-3">
              <Link
                href={`/admin/users/${user.id}`}
                className="font-lato text-xs font-semibold text-brown hover:underline"
              >
                View Details →
              </Link>
            </div>
          </Card>
        ))}
        {users.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center font-lato text-sm text-stone-500">
            No users found matching your search.
          </div>
        )}
      </div>

      {/* Desktop User Table View */}
      <div className="hidden md:block border border-border overflow-hidden rounded-2xl bg-white shadow-xs">
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
