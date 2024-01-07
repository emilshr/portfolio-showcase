import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@src/trpc/react";
import { ThemeProvider } from "@src/components/client-providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Portfolio showcase",
  description: "A web app built with Next.js to dump your web portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider>
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
