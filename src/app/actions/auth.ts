"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { generateToken, hashToken } from "@/lib/tokens";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email";
import { signIn, signOut } from "@/lib/auth";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";

export type AuthFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
    }
  | undefined;

const EMAIL_VERIFY_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
const PASSWORD_RESET_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { message: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  const token = generateToken();
  await prisma.verificationToken.create({
    data: {
      identifier: user.email,
      token: hashToken(token),
      type: "EMAIL_VERIFY",
      expiresAt: new Date(Date.now() + EMAIL_VERIFY_EXPIRY_MS),
    },
  });

  await sendVerificationEmail(user.email, token);

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  redirect("/account");
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Invalid email or password." };
    }
    throw error;
  }
}

export async function verifyEmailToken(token: string): Promise<{
  success: boolean;
  message: string;
}> {
  const hashed = hashToken(token);

  const record = await prisma.verificationToken.findUnique({
    where: { token: hashed },
  });

  if (
    !record ||
    record.type !== "EMAIL_VERIFY" ||
    record.consumedAt ||
    record.expiresAt < new Date()
  ) {
    return { success: false, message: "This verification link is invalid or has expired." };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { email: record.identifier },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationToken.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    }),
  ]);

  return { success: true, message: "Your email has been verified." };
}

export async function requestPasswordReset(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { email } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  // Always behave the same whether or not the account exists, to avoid
  // leaking which emails are registered.
  if (user && user.passwordHash) {
    const token = generateToken();
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: hashToken(token),
        type: "PASSWORD_RESET",
        expiresAt: new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS),
      },
    });
    await sendPasswordResetEmail(user.email, token);
  }

  return {
    message: "If an account exists for that email, we've sent a password reset link.",
  };
}

export async function resetPassword(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { token, password } = parsed.data;
  const hashed = hashToken(token);

  const record = await prisma.verificationToken.findUnique({
    where: { token: hashed },
  });

  if (
    !record ||
    record.type !== "PASSWORD_RESET" ||
    record.consumedAt ||
    record.expiresAt < new Date()
  ) {
    return { message: "This password reset link is invalid or has expired." };
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({
      where: { email: record.identifier },
      data: { passwordHash },
    }),
    prisma.verificationToken.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    }),
  ]);

  redirect("/login");
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
