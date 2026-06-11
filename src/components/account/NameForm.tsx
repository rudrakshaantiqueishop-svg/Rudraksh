"use client";

import { useActionState, useState, useEffect } from "react";
import { updateName } from "@/app/actions/account";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { Pencil } from "lucide-react";

export default function NameForm({ name }: { name: string | null }) {
  const [state, action] = useActionState(updateName, undefined);
  const [isEditing, setIsEditing] = useState(!name);

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state]);

  if (!isEditing) {
    return (
      <div className="flex items-center gap-4">
        <p className="font-lato text-base text-gray-text flex-1">
          {name ? name : "No name added"}
        </p>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-center p-2 text-gray-text transition-colors hover:text-dark"
          aria-label="Edit name"
        >
          <Pencil size={18} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <FormField
        label="Name"
        name="name"
        placeholder="Your full name"
        defaultValue={name ?? ""}
        errors={state?.errors?.name}
      />
      {state?.message && (
        <p className={`font-lato text-sm ${state.success ? "text-gray-text" : "text-destructive"}`}>
          {state.message}
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="flex h-12 w-1/3 items-center justify-center border border-border font-lato text-sm uppercase tracking-[0.06em] text-gray-text transition-colors hover:bg-secondary hover:text-dark"
        >
          Cancel
        </button>
        <div className="flex-1">
          <SubmitButton>Save</SubmitButton>
        </div>
      </div>
    </form>
  );
}
