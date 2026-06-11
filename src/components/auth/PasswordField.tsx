"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  errors?: string[];
  hint?: string;
}

export default function PasswordField({ label, errors, hint, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputProps.name}>{label}</Label>
      <div className="relative">
        <Input id={inputProps.name} type={visible ? "text" : "password"} className="pr-11" {...inputProps} />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-text transition-colors hover:text-accent"
        >
          {visible ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
        </button>
      </div>
      {hint && <p className="font-lato text-[13px] text-[#78716C]">{hint}</p>}
      {errors?.map((message) => (
        <span key={message} className="font-lato text-[13px] text-destructive">
          {message}
        </span>
      ))}
    </div>
  );
}
