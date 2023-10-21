import { protectedProcedure, publicProcedure, router } from "../trpc";

export const appRouter = router({
  getHello: protectedProcedure.query(async () => {
    return "hello";
  }),
});

export type AppRouter = typeof appRouter;
