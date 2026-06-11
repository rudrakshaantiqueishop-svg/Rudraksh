import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PHONE_COUNTRY_CODE } from "@/lib/validations/account";

interface PhoneFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  errors?: string[];
}

export default function PhoneField({ label, errors, ...inputProps }: PhoneFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputProps.name}>{label}</Label>
      <div className="flex">
        <span className="flex h-12 items-center border border-r-0 border-border bg-secondary px-4 font-lato text-base text-gray-text">
          {PHONE_COUNTRY_CODE}
        </span>
        <Input
          id={inputProps.name}
          type="tel"
          inputMode="numeric"
          maxLength={10}
          className="border-l-0"
          {...inputProps}
        />
      </div>
      {errors?.map((message) => (
        <span key={message} className="font-lato text-[13px] text-destructive">
          {message}
        </span>
      ))}
    </div>
  );
}
