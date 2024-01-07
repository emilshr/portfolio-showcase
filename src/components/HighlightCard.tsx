import { type portfolios } from "@src/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

type Props = {
  item: InferSelectModel<typeof portfolios>;
};

export const HighlightCard = (props: Props) => {
  const { item } = props;
  const { url, upVotes } = item;

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-5xl font-bold">Highlight of the day 🎊</h1>
      <Card className="border-[1px] border-neutral-700 bg-black text-center text-slate-100">
        <CardHeader>
          <CardTitle className="font-mono text-2xl">
            <Link href={url} className="hover:underline" target="_blank">
              {url}
            </Link>
          </CardTitle>
          <CardDescription className="text-lg">
            {upVotes} upvotes
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
