import Link from "next/link";
import { verifyEmailToken } from "@/app/actions/auth";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const result = token
    ? await verifyEmailToken(token)
    : { success: false, message: "This verification link is invalid or missing a token." };

  return (
    <>
      <h1 className="font-prata" style={{ fontSize: "32px", color: "#0B0404", margin: "0 0 8px" }}>
        {result.success ? "Email Verified" : "Verification Failed"}
      </h1>
      <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", margin: "0 0 32px" }}>
        {result.message}
      </p>

      <Link href={result.success ? "/account" : "/login"} style={{ color: "#BB5A28" }}>
        {result.success ? "Go to your account" : "Back to sign in"}
      </Link>
    </>
  );
}
