import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
