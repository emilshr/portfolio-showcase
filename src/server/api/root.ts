import { createTRPCRouter } from "@src/server/api/trpc";
import { trendingRouter } from "./routers/trending";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  trending: trendingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
