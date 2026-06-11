"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import SubmitButton from "@/components/auth/SubmitButton";

export default function LoginPage() {
  const [state, action] = useActionState(login, undefined);

  return (
    <>
      <h1 className="font-prata" style={{ fontSize: "32px", color: "#0B0404", margin: "0 0 8px" }}>
        Welcome Back
      </h1>
      <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", margin: "0 0 32px" }}>
        Sign in to your Rudraksh account
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
        <PasswordField
          label="Password"
          name="password"
          placeholder="••••••••"
          required
          errors={state?.errors?.password}
        />

        <div style={{ textAlign: "right" }}>
          <Link href="/forgot-password" className="font-lato" style={{ fontSize: "14px", color: "#BB5A28" }}>
            Forgot password?
          </Link>
        </div>

        {state?.message && (
          <p className="font-lato" style={{ fontSize: "14px", color: "#B3261E", margin: 0 }}>
            {state.message}
          </p>
        )}

        <SubmitButton>Sign In</SubmitButton>
      </form>

      <p className="font-lato" style={{ fontSize: "14px", color: "#44403C", marginTop: "24px", textAlign: "center" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" style={{ color: "#BB5A28" }}>
          Sign up
        </Link>
      </p>
    </>
  );
}
