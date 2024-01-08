"use client";

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
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const RemovePortfolio = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { isLoading, mutate } = api.portfolio.removePortfolio.useMutation({
    onSuccess() {
      router.refresh();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" variant="destructive">
          Remove submission
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Remove your submission</DialogTitle>
          <DialogDescription>
            Warning! If you remove your submission, your upvote counter will be
            reset
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={isLoading}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={(event) => {
              event.stopPropagation();
              mutate(undefined, {
                onError() {
                  toast(`Error while trying to remove your portfolio listing`, {
                    duration: 5000,
                    important: true,
                    dismissible: true,
                  });
                },
                onSuccess() {
                  toast(`Removed your portfolio from the listing!`, {
                    duration: 5000,
                    important: true,
                    dismissible: true,
                  });
                },
              });
            }}
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
