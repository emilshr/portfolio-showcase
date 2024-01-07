"use client";

import { DoubleArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { type portfolios } from "@src/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export const PortfolioListing = () => {
  //   const { data } = api.portfolio.getListing.useQuery();

  //   const data = [];

  const data: InferSelectModel<typeof portfolios>[] = [
    {
      id: "xxxx",
      downVotes: 10,
      upVotes: 15,
      url: "https://random.com",
      userId: "xxxxx",
    },
    {
      id: "xxxx",
      downVotes: 10,
      upVotes: 15,
      url: "https://random.com",
      userId: "xxxxx",
    },
    {
      id: "xxxx",
      downVotes: 10,
      upVotes: 15,
      url: "https://random.com",
      userId: "xxxxx",
    },
    {
      id: "xxxx",
      downVotes: 10,
      upVotes: 15,
      url: "https://random.com",
      userId: "xxxxx",
    },
  ];

  if (data?.length === 0) {
    return <h1 className="text-xl font-bold">No other listings found</h1>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      {data.map(({ id, url, upVotes, downVotes }) => {
        return (
          <Card
            key={id}
            className="border-[1px] border-neutral-700 bg-black text-slate-100"
          >
            <CardHeader>
              <span className="flex items-center justify-between">
                <Link href={url} target="_blank">
                  <p className="font-mono hover:underline">{url}</p>
                </Link>
                <span className="flex gap-x-4">
                  <Button>
                    <DoubleArrowUpIcon /> &nbsp; {upVotes}
                  </Button>
                  <Button>
                    <ArrowDownIcon /> &nbsp; {downVotes}
                  </Button>
                </span>
              </span>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};
