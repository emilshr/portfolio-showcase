import { api } from "@src/trpc/server";
import { HighlightCard } from "@src/components/HighlightCard";
import { NoEntries } from "@src/components/NoEntries";
import { AddYourPortfolio } from "@src/components/AddYourPortfolio";
import { Separator } from "@src/components/ui/separator";
import { PortfolioListing } from "@src/components/PortfolioListing";

export default async function Home() {
  const data = await api.portfolio.getHighlightOfTheDay.query();

  return (
    <main className="flex min-h-screen flex-col bg-black px-2 text-slate-100 sm:px-4 ">
      <div className="flex w-full flex-col gap-y-4  pt-40 sm:pt-72">
        <div className="flex h-full w-full flex-col items-center gap-y-4">
          {data ? <HighlightCard item={data} /> : <NoEntries />}
          <AddYourPortfolio />
          <span className="w-full py-8">
            <Separator className="bg-neutral-700" />
          </span>
        </div>
      </div>
      <PortfolioListing />
    </main>
  );
}
