import AuthDivider from "@/components/auth/AuthDivider";
import GoogleButton from "@/components/auth/GoogleButton";

export default function GoogleSignInSection() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) return null;

  return (
    <div className="flex flex-col gap-4">
      <AuthDivider />
      <GoogleButton />
    </div>
  );
}
