import postgres from "postgres";
import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(env.DATABASE_URI);

export const migrationClient = postgres(env.DATABASE_URI, { max: 1 });

export const db = drizzle(client);
