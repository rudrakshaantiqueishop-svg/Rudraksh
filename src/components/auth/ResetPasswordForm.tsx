"use client";

import { useActionState } from "react";
import { resetPassword } from "@/app/actions/auth";
import PasswordField from "@/components/auth/PasswordField";
import SubmitButton from "@/components/auth/SubmitButton";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, action] = useActionState(resetPassword, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <input type="hidden" name="token" value={token} />

      <PasswordField
        label="New Password"
        name="password"
        placeholder="••••••••"
        required
        hint="Must be at least 8 characters with a letter, a number, and a special character."
        errors={state?.errors?.password}
      />

      {state?.message && (
        <p className="font-lato" style={{ fontSize: "14px", color: "#B3261E", margin: 0 }}>
          {state.message}
        </p>
      )}

      <SubmitButton>Reset Password</SubmitButton>
    </form>
  );
}
