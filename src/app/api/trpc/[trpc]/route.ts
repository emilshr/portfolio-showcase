import { db } from "@/db";
import { appRouter } from "@/server/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/route";
import { env } from "@/env.mjs";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const session = await getServerSession(nextAuthOptions);
      return {
        db,
        session,
      };
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
