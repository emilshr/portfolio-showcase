"use client";

import Provider from "@/trpc/provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { PropsWithChildren } from "react";

export default function ClientSidedProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <Provider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
