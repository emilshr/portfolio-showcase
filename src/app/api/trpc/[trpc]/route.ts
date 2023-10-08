import { db } from "@/db";
import { appRouter } from "@/server/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async ({ req }) => {
      const session = await getSession({
        // Not sure about how to type cast this safely. Hence the usage of `unknown`
        req: req as unknown as Partial<IncomingMessage>,
      });
      return {
        db,
        session,
      };
    },
  });

export { handler as GET, handler as POST };
