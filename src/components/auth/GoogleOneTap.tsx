"use client";

import { useCallback, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleOneTap() {
  const { status } = useSession();
  const router = useRouter();

  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      const result = await signIn("google-one-tap", {
        credential: response.credential,
        redirect: false,
      });
      if (result?.ok) {
        router.refresh();
      }
    },
    [router]
  );

  useEffect(() => {
    if (status !== "unauthenticated" || !GOOGLE_CLIENT_ID) return;

    return () => {
      window.google?.accounts.id.cancel();
    };
  }, [status]);

  if (status !== "unauthenticated" || !GOOGLE_CLIENT_ID) return null;

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={() => {
        window.google?.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google?.accounts.id.prompt();
      }}
    />
  );
}
