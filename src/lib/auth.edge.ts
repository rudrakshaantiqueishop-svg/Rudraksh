import NextAuth from "next-auth";

export const { auth } = NextAuth({
  basePath: "/api/auth",
  providers: [],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});
