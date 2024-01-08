"use client";

import { type portfolios } from "@src/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { Button } from "./ui/button";
import { useState } from "react";
import { api } from "@src/trpc/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { RemovePortfolio } from "./RemovePortfolio";

type Props = {
  item: InferSelectModel<typeof portfolios>;
};

export const EditYourSubmission = ({ item }: Props) => {
  return (
    <section className="flex flex-col items-center gap-y-2 font-bold">
      <span>Nice! You have submitted your portfolio</span>
      <span className="flex gap-x-2">
        <EditYourSubmissionDialog item={item} />
        <RemovePortfolio />
      </span>
    </section>
  );
};

const EditYourSubmissionDialog = ({ item }: Props) => {
  const [url, setUrl] = useState(item.url);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { isLoading, mutate } = api.portfolio.updatePortfolio.useMutation({
    onSuccess() {
      router.refresh();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        setUrl(item.url);
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg">Update submission</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update your portfolio</DialogTitle>
          <DialogDescription>
            If you make any changes to your existing submission, your upvote
            count will be reset
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={url}
            className="font-mono"
            onChange={(event) => {
              setUrl(event.target.value);
            }}
            disabled={isLoading}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={url.length === 0 || isLoading}
            onClick={(event) => {
              event.stopPropagation();
              mutate(
                { portfolioUrl: url },
                {
                  onError() {
                    toast(`Error while trying to add the portfolio`, {
                      duration: 5000,
                      important: true,
                      dismissible: true,
                    });
                  },
                  onSuccess() {
                    toast(`Updated your portfolio URL!`, {
                      duration: 5000,
                      important: true,
                      dismissible: true,
                    });
                  },
                },
              );
            }}
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
