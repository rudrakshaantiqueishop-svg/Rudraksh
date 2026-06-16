import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errors?: string[];
  helperText?: string;
}

export default function TextAreaField({
  label,
  errors,
  helperText,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={textareaProps.name}>{label}</Label>
      <Textarea id={textareaProps.name} className="min-h-[100px]" {...textareaProps} />
      {helperText && <p className="font-lato text-xs text-gray-text">{helperText}</p>}
      {errors?.map((message) => (
        <span key={message} className="font-lato text-[13px] text-destructive">
          {message}
        </span>
      ))}
    </div>
  );
}
