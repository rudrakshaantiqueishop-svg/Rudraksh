import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { hashToken } from "@/lib/tokens";
import { loginSchema, otpVerifySchema } from "@/lib/validations/auth";

const googleOneTapClient = new OAuth2Client();

export const { handlers, auth, signIn, signOut } = NextAuth({
  // `prisma` is generated to a custom output path (`@/generated/prisma`), whose
  // types differ structurally from the `@prisma/client` types `@auth/prisma-adapter`
  // expects, even though the runtime client shape is identical.
  adapter: PrismaAdapter(prisma as unknown as Parameters<typeof PrismaAdapter>[0]),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      id: "google-one-tap",
      name: "Google One Tap",
      credentials: {
        credential: { type: "text" },
      },
      authorize: async (credentials) => {
        const idToken = credentials?.credential;
        if (typeof idToken !== "string" || !idToken) return null;

        const ticket = await googleOneTapClient.verifyIdToken({
          idToken,
          audience: process.env.AUTH_GOOGLE_ID,
        });
        const payload = ticket.getPayload();
        if (!payload?.email || !payload.sub) return null;

        let user = await prisma.user.findUnique({ where: { email: payload.email } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: payload.email,
              name: payload.name,
              image: payload.picture,
              emailVerified: payload.email_verified ? new Date() : null,
            },
          });
        } else if (!user.emailVerified && payload.email_verified) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        }

        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: payload.sub,
            },
          },
          update: {},
          create: {
            userId: user.id,
            type: "oidc",
            provider: "google",
            providerAccountId: payload.sub,
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
    Credentials({
      id: "email-otp",
      name: "Email OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Code", type: "text" },
      },
      authorize: async (credentials) => {
        const parsed = otpVerifySchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, code } = parsed.data;
        const hashed = hashToken(code);

        const record = await prisma.verificationToken.findUnique({
          where: { token: hashed },
        });

        if (
          !record ||
          record.identifier !== email ||
          record.type !== "LOGIN_OTP" ||
          record.consumedAt ||
          record.expiresAt < new Date()
        ) {
          return null;
        }

        await prisma.verificationToken.update({
          where: { id: record.id },
          data: { consumedAt: new Date() },
        });

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: { email, emailVerified: new Date() },
          });
        } else if (!user.emailVerified) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }

      // By the time the jwt callback runs, the adapter has already
      // created/loaded the user row, so token.id is a real DB id
      // (unlike in the signIn callback, where it can be the provider's id).
      if (account?.provider === "google" && profile?.email_verified) {
        await prisma.user.updateMany({
          where: { id: token.id, emailVerified: null },
          data: { emailVerified: new Date() },
        });
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
