"use client";

import { trpc } from "@/trpc/client";

export default function Test() {
  const { data, isLoading } = trpc.getHello.useQuery();

  if (isLoading) {
    return <>Loading</>;
  }

  return <>{data}</>;
}
