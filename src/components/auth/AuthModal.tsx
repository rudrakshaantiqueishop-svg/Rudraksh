"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { login, signup } from "@/app/actions/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import SubmitButton from "@/components/auth/SubmitButton";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginState, loginAction] = useActionState(login, undefined);
  const [signupState, signupAction] = useActionState(signup, undefined);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setMode("login");
      }}
    >
      <DialogContent>
        {mode === "login" ? (
          <>
            <DialogHeader>
              <DialogTitle>Welcome Back</DialogTitle>
              <DialogDescription>Sign in to your Rudraksh account</DialogDescription>
            </DialogHeader>

            <form action={loginAction} className="flex flex-col gap-4">
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                errors={loginState?.errors?.email}
              />
              <PasswordField
                label="Password"
                name="password"
                placeholder="••••••••"
                required
                errors={loginState?.errors?.password}
              />

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  onClick={() => onOpenChange(false)}
                  className="font-lato text-sm text-accent"
                >
                  Forgot password?
                </Link>
              </div>

              {loginState?.message && (
                <p className="font-lato text-sm text-destructive">{loginState.message}</p>
              )}

              <SubmitButton>Sign In</SubmitButton>
            </form>

            <p className="font-lato text-sm text-gray-text mt-6 text-center">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-accent underline-offset-4 hover:underline"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>Join Rudraksh to track orders and save your details</DialogDescription>
            </DialogHeader>

            <form action={signupAction} className="flex flex-col gap-4">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                placeholder="Your full name"
                required
                errors={signupState?.errors?.name}
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                errors={signupState?.errors?.email}
              />
              <PasswordField
                label="Password"
                name="password"
                placeholder="••••••••"
                required
                hint="Must be at least 8 characters with a letter, a number, and a special character."
                errors={signupState?.errors?.password}
              />

              {signupState?.message && (
                <p className="font-lato text-sm text-destructive">{signupState.message}</p>
              )}

              <SubmitButton>Create Account</SubmitButton>
            </form>

            <p className="font-lato text-sm text-gray-text mt-6 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-accent underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
