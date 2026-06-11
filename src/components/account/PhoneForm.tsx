"use client";

import { useActionState, useState, useEffect } from "react";
import { updatePhone } from "@/app/actions/account";
import PhoneField from "@/components/account/PhoneField";
import SubmitButton from "@/components/auth/SubmitButton";
import { PHONE_COUNTRY_CODE } from "@/lib/validations/account";
import { Pencil } from "lucide-react";

export default function PhoneForm({ phone }: { phone: string | null }) {
  const [state, action] = useActionState(updatePhone, undefined);
  const [isEditing, setIsEditing] = useState(!phone);

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state]);

  if (!isEditing) {
    return (
      <div className="flex max-w-sm items-center justify-between">
        <p className="font-lato text-base text-gray-text">
          {phone ? phone : "No phone number added"}
        </p>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-center p-2 text-gray-text transition-colors hover:text-dark"
          aria-label="Edit phone number"
        >
          <Pencil size={18} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="flex max-w-sm flex-col gap-4">
      <PhoneField
        label="Phone Number"
        name="phone"
        placeholder="98765 43210"
        defaultValue={phone?.replace(PHONE_COUNTRY_CODE, "") ?? ""}
        errors={state?.errors?.phone}
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
