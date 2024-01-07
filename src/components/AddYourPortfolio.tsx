"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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
import { ReloadIcon } from "@radix-ui/react-icons";
import { api } from "@src/trpc/react";
import { toast } from "sonner";

export const AddYourPortfolio = () => {
  return <AddPortfolioDialog />;
};

const AddPortfolioDialog = () => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const { isLoading, mutate } = api.portfolio.addPortfolio.useMutation();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button size="lg">Add yours</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add your portfolio url</DialogTitle>
          <DialogDescription>
            If you make any changes to your existing submission, you&apos;re
            upvote count will be reset
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={url}
            className="font-mono"
            onChange={(event) => {
              event.stopPropagation();
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
