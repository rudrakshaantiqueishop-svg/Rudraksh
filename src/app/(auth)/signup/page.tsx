"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import SubmitButton from "@/components/auth/SubmitButton";
import GoogleSignInSection from "@/components/auth/GoogleSignInSection";

export default function SignupPage() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <>
      <h1 className="font-prata" style={{ fontSize: "32px", color: "#0B0404", margin: "0 0 8px" }}>
        Create Account
      </h1>
      <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", margin: "0 0 32px" }}>
        Join Rudraksh to track orders and save your details
      </p>

      <form action={action} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <FormField
          label="Full Name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          errors={state?.errors?.name}
        />
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
          hint="Must be at least 8 characters with a letter, a number, and a special character."
          errors={state?.errors?.password}
        />

        {state?.message && (
          <p className="font-lato" style={{ fontSize: "14px", color: "#B3261E", margin: 0 }}>
            {state.message}
          </p>
        )}

        <SubmitButton>Create Account</SubmitButton>
      </form>

      <div style={{ marginTop: "24px" }}>
        <GoogleSignInSection />
      </div>

      <p className="font-lato" style={{ fontSize: "14px", color: "#44403C", marginTop: "24px", textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#BB5A28" }}>
          Sign in
        </Link>
      </p>
    </>
  );
}
