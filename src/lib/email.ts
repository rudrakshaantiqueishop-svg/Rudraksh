import "server-only";
import { Resend } from "resend";

let resend: Resend | undefined;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const appUrl = process.env.AUTH_URL ?? "http://localhost:3000";
const from = process.env.EMAIL_FROM ?? "Rudraksh <onboarding@resend.dev>";

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${appUrl}/verify-email?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Verification link for ${email}: ${url}`);
    return;
  }

  await getResend().emails.send({
    from,
    to: email,
    subject: "Verify your email — Rudraksh",
    html: `
      <p>Welcome to Rudraksh!</p>
      <p>Please confirm your email address by clicking the link below:</p>
      <p><a href="${url}">Verify my email</a></p>
      <p>This link will expire in 24 hours. If you didn't create an account, you can ignore this email.</p>
    `,
  });
}

export async function sendLoginOtpEmail(email: string, code: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Sign-in code for ${email}: ${code}`);
    return;
  }

  await getResend().emails.send({
    from,
    to: email,
    subject: "Your Rudraksh sign-in code",
    html: `
      <p>Use the code below to sign in to Rudraksh:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${code}</p>
      <p>This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${appUrl}/reset-password?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] Password reset link for ${email}: ${url}`);
    return;
  }

  await getResend().emails.send({
    from,
    to: email,
    subject: "Reset your password — Rudraksh",
    html: `
      <p>We received a request to reset your Rudraksh account password.</p>
      <p><a href="${url}">Reset my password</a></p>
      <p>This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
    `,
  });
}
