import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <>
        <h1 className="font-prata" style={{ fontSize: "32px", color: "#0B0404", margin: "0 0 8px" }}>
          Invalid Link
        </h1>
        <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", margin: "0 0 32px" }}>
          This password reset link is invalid or missing a token.
        </p>
        <Link href="/forgot-password" style={{ color: "#BB5A28" }}>
          Request a new link
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="font-prata" style={{ fontSize: "32px", color: "#0B0404", margin: "0 0 8px" }}>
        Reset Password
      </h1>
      <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", margin: "0 0 32px" }}>
        Choose a new password for your account.
      </p>

      <ResetPasswordForm token={token} />
    </>
  );
}
