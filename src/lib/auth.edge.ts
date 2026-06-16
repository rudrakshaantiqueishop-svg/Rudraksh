import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});
