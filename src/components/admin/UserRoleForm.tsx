"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Role } from "@/generated/prisma/client";
import { updateUserRole } from "@/app/actions/admin-users";
import { Button } from "@/components/ui/button";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "WRITER", label: "Writer" },
  { value: "ADMIN", label: "Admin" },
];

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save Role"}
    </Button>
  );
}

export default function UserRoleForm({ userId, role }: { userId: string; role: Role }) {
  const [state, formAction] = useActionState(updateUserRole, undefined);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="userId" value={userId} />
      <div className="flex flex-col gap-1.5">
        <select
          name="role"
          defaultValue={role}
          className="h-10 rounded-md border border-input bg-transparent px-3 font-lato text-sm text-dark focus:outline-none focus:ring-2 focus:ring-brown/30"
        >
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <SaveButton />
      {state?.error && (
        <span className="font-lato text-[13px] text-destructive">{state.error}</span>
      )}
      {state?.success && (
        <span className="font-lato text-[13px] text-green-700">Role updated.</span>
      )}
    </form>
  );
}
