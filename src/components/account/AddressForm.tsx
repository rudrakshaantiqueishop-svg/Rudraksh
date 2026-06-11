"use client";

import { useActionState, useEffect, useRef } from "react";
import { addAddress } from "@/app/actions/account";
import FormField from "@/components/auth/FormField";
import PhoneField from "@/components/account/PhoneField";
import SubmitButton from "@/components/auth/SubmitButton";
import { PHONE_COUNTRY_CODE } from "@/lib/validations/account";

export default function AddressForm({
  defaultName,
  defaultPhone,
}: {
  defaultName?: string | null;
  defaultPhone?: string | null;
}) {
  const [state, action] = useActionState(addAddress, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Full Name"
          name="fullName"
          placeholder="Recipient's full name"
          defaultValue={defaultName ?? ""}
          required
          errors={state?.errors?.fullName}
        />
        <PhoneField
          label="Phone Number"
          name="phone"
          placeholder="98765 43210"
          defaultValue={defaultPhone?.replace(PHONE_COUNTRY_CODE, "") ?? ""}
          required
          errors={state?.errors?.phone}
        />
      </div>

      <FormField
        label="Address Line 1"
        name="line1"
        placeholder="House no., street"
        required
        errors={state?.errors?.line1}
      />
      <FormField
        label="Address Line 2 (optional)"
        name="line2"
        placeholder="Apartment, landmark, etc."
        errors={state?.errors?.line2}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField label="City" name="city" required errors={state?.errors?.city} />
        <FormField label="State" name="state" required errors={state?.errors?.state} />
        <FormField label="Postal Code" name="postalCode" required errors={state?.errors?.postalCode} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Country"
          name="country"
          defaultValue="India"
          required
          errors={state?.errors?.country}
        />
        <FormField
          label="Label (optional)"
          name="label"
          placeholder="Home, Work, etc."
          errors={state?.errors?.label}
        />
      </div>

      <label className="flex items-center gap-2 font-lato text-sm text-gray-text">
        <input type="checkbox" name="isDefault" className="h-4 w-4 accent-brown" />
        Set as default address
      </label>

      {state?.message && (
        <p className={`font-lato text-sm ${state.success ? "text-gray-text" : "text-destructive"}`}>
          {state.message}
        </p>
      )}

      <SubmitButton>Save Address</SubmitButton>
    </form>
  );
}
