"use client";

import { Link as LinkType } from "@/types";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteLink } from "@/services";

interface LinkActionsProps {
  link: LinkType;
}

const LinkActions: React.FC<LinkActionsProps> = ({ link }) => {
  const handleDelete = async () => {
    try {
      const res = await deleteLink(link.code);
      if (res.ok) {
        toast.success("Link deleted successfully.");
      } else {
        toast.error("Failed to delete the link.");
      }
    } catch {
      toast.error("Failed to delete the link.");
    }
  };

  const handleCopy = async () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const shortUrl = `${baseUrl}/${link.code}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short URL copied to clipboard.", {
        description: shortUrl,
      });
    } catch {
      toast.error("Unable to copy URL. Please copy manually.");
    }
  };

  return (
    <div className="flex justify-end gap-1.5 w-full">
      {/* <Button
        asChild
        size="sm"
        variant="outline"
        className="h-7 px-2 text-[11px]"
      >
        <NextLink href={`/code/${link.code}`}>
          <BarChart3 className="mr-1 size-4" />
          Stats
        </NextLink>
      </Button> */}

      <Button
        size="sm"
        variant="outline"
        className="h-7 px-2 text-[11px]"
        onClick={handleCopy}
      >
        <Copy className="size-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LinkActions;
