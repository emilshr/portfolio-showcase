import { portfolios } from "@src/server/db/schema";
import { v4 as uuid } from "uuid";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { type InferInsertModel, eq, not } from "drizzle-orm";

export const portfolioRouter = createTRPCRouter({
  getHighlightOfTheDay: publicProcedure.query(async ({ ctx: { db } }) => {
    const rows = await db.select().from(portfolios).orderBy(portfolios.upVotes);
    return rows[0];
  }),
  addPortfolio: protectedProcedure
    .input(z.object({ portfolioUrl: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      const {
        session: {
          user: { id },
        },
        db,
      } = ctx;
      const { portfolioUrl } = input;
      const foundPortfolio = await db
        .select()
        .from(portfolios)
        .where(eq(portfolios.userId, id));

      if (foundPortfolio.length === 0) {
        const portfolio: InferInsertModel<typeof portfolios> = {
          id: uuid(),
          url: portfolioUrl,
          userId: id,
          downVotes: 0,
          upVotes: 0,
        };
        return db.insert(portfolios).values(portfolio);
      }
      const updated = await db
        .update(portfolios)
        .set({ downVotes: 0, upVotes: 0, url: portfolioUrl })
        .where(eq(portfolios.userId, id));

      return updated;
    }),
  getListing: publicProcedure.query(async ({ ctx: { db, session } }) => {
    // TODO: Implement lazy loading | infinite querying
    if (session) {
      return db
        .select()
        .from(portfolios)
        .orderBy(portfolios.upVotes)
        .where(not(eq(portfolios.userId, session.user.id)));
    }
    return db.select().from(portfolios).orderBy(portfolios.upVotes);
  }),
});
