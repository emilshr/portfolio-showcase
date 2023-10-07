import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URI || "",
  },
  driver: "pg",
} satisfies Config;
