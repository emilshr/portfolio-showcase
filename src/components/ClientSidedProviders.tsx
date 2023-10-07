"use client";

import Provider from "@/trpc/provider";
import { SessionProvider } from "next-auth/react";

import { PropsWithChildren } from "react";

export default function ClientSidedProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
}
