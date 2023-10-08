import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URI: z.string().url(),
        GITHUB_CLIENT_ID: z.string(),
        GITHUB_CLIENT_SECRET: z.string(),  
        NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    },
    client: {},
    runtimeEnv: {
        DATABASE_URI: process.env.DATABASE_URI,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV
    }
})