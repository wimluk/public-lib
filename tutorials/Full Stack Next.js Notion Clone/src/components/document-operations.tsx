"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MoreVertical, Trash, Loader2 } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "./ui/use-toast";

export default function DocumentOperations({
  publicId,
  title,
}: {
  publicId: string;
  title: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  // Delete Document Request
  async function deleteDocument(publicId: string) {
    const res = await fetch(`/api/documents/${publicId}`, {
      method: "DELETE",
    });

    if (!res?.ok) {
      toast({
        title: "Something went wrong.",
        description: "Your document was not deleted. Please try again.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-full items-center border-none p-0"
          )}
        >
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem
            // onSelect={() => setShowEditSheet(true)}
            className="flex cursor-pointer items-center"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Document Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this document?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                const deleted = await deleteDocument(publicId);

                if (deleted) {
                  startTransition(() => {
                    if (pathname.includes(publicId)) {
                      router.push(`/app`);
                    }
                    // Force a cache invalidation.
                    router.refresh();
                  });
                  toast({
                    title: "Document deleted.",
                    description: `${title} was successfully deleted.`,
                    variant: "default",
                  });
                }
                setIsLoading(false);
                setShowDeleteAlert(false);
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isMutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
