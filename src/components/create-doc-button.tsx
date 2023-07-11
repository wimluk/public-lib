"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "./ui/use-toast";
import { nanoid } from "nanoid";
import { CreateDocType } from "@/app/api/documents/route";
import { PlusIcon } from "lucide-react";

export default function CreateDocButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [values, setValues] = useState<CreateDocType>({
    publicId: "",
    title: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsFetching(true);

    if (values.title === "") {
      setIsFetching(false);
      return toast({
        title: "Title is required.",
        description: "Please enter a title for your document.",
        variant: "destructive",
      });
    }

    // Generate a new ID before submitting the form
    const newId = nanoid(12);

    const res = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, publicId: newId }),
    });

    if (!res?.ok) {
      setIsFetching(false);
      setShowCreateDialog(false);
      return toast({
        title: "Something went wrong.",
        description: "Your document was not created. Please try again.",
        variant: "destructive",
      });
    }

    const document = await res.json();
    setIsFetching(false);
    setShowCreateDialog(false);
    setValues({ publicId: "", title: "" });
    startTransition(() => {
      // Force a cache invalidation and redirect to the new document.
      router.refresh();
      router.push(`/app/${document.publicId}`);
    });
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues((prevValues) => ({ ...prevValues, title: event.target.value }));
  }

  return (
    <>
      <Button
        onClick={() => setShowCreateDialog(true)}
        variant="outline"
        className="h-8 w-full justify-start rounded-none"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        New Document
      </Button>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Document</DialogTitle>
            <DialogDescription>
              Give your document a title. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={values.title}
                  onChange={handleTitleChange}
                  className="col-span-3"
                  placeholder="My Title"
                />
              </div>
            </div>
            <DialogFooter>
              {!isMutating ? (
                <Button type="submit">Create</Button>
              ) : (
                <Button disabled type="submit">
                  Creating...
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
