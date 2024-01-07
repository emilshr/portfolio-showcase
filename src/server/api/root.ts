import { createTRPCRouter } from "@src/server/api/trpc";
import { portfolioRouter } from "./routers/portfolio.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  portfolio: portfolioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
