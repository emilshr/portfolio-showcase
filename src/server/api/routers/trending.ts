import { portfolios } from "@src/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const trendingRouter = createTRPCRouter({
  getHighlightOfTheDay: publicProcedure.query(async ({ ctx: { db } }) => {
    const rows = await db.select().from(portfolios).orderBy(portfolios.upVotes);
    return rows[0];
  }),
});
