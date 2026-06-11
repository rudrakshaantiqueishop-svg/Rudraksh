"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";

export default function ForgotPasswordPage() {
  const [state, action] = useActionState(requestPasswordReset, undefined);

  return (
    <>
      <h1 className="font-prata" style={{ fontSize: "32px", color: "#0B0404", margin: "0 0 8px" }}>
        Forgot Password
      </h1>
      <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", margin: "0 0 32px" }}>
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      <form action={action} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          errors={state?.errors?.email}
        />

        {state?.message && (
          <p className="font-lato" style={{ fontSize: "14px", color: "#44403C", margin: 0 }}>
            {state.message}
          </p>
        )}

        <SubmitButton>Send Reset Link</SubmitButton>
      </form>

      <p className="font-lato" style={{ fontSize: "14px", color: "#44403C", marginTop: "24px", textAlign: "center" }}>
        Remembered your password?{" "}
        <Link href="/login" style={{ color: "#BB5A28" }}>
          Sign in
        </Link>
      </p>
    </>
  );
}
