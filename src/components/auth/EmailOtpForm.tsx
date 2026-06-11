"use client";

import { useActionState, useEffect, useState } from "react";
import { requestLoginOtp, verifyLoginOtp } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";

export default function EmailOtpForm() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState("");

  const [requestState, requestAction] = useActionState(requestLoginOtp, undefined);
  const [verifyState, verifyAction] = useActionState(verifyLoginOtp, undefined);

  useEffect(() => {
    if (requestState?.success) {
      setStep("verify");
    }
  }, [requestState]);

  if (step === "request") {
    return (
      <form action={requestAction} className="flex flex-col gap-4">
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          errors={requestState?.errors?.email}
        />
        {requestState?.message && (
          <p className="font-lato text-sm text-destructive">{requestState.message}</p>
        )}
        <SubmitButton>Send Code</SubmitButton>
      </form>
    );
  }

  return (
    <form action={verifyAction} className="flex flex-col gap-4">
      <input type="hidden" name="email" value={email} />
      <p className="font-lato text-sm text-gray-text">
        Enter the 6-digit code sent to <span className="font-bold text-dark">{email}</span>.
      </p>
      <FormField
        label="Verification Code"
        name="code"
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="123456"
        required
        errors={verifyState?.errors?.code}
      />
      {verifyState?.message && (
        <p className="font-lato text-sm text-destructive">{verifyState.message}</p>
      )}
      {requestState?.success && (
        <p className="font-lato text-sm text-gray-text">A new code has been sent.</p>
      )}

      <SubmitButton>Verify &amp; Sign In</SubmitButton>

      <div className="flex items-center justify-between font-lato text-sm">
        <button
          type="button"
          onClick={() => setStep("request")}
          className="text-accent underline-offset-4 hover:underline"
        >
          Use a different email
        </button>
        <button formAction={requestAction} className="text-accent underline-offset-4 hover:underline">
          Resend code
        </button>
      </div>
    </form>
  );
}
