"use client";

import { Link as LinkType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, Copy, ExternalLink, Link2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";

interface LinkStatsProps {
  link: LinkType;
}

export const LinkStats: React.FC<LinkStatsProps> = ({ link }) => {
  const [shortUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/${link.code}`;
    }
    return null;
  });

  const handleCopy = async () => {
    try {
      if (shortUrl) {
        await navigator.clipboard.writeText(shortUrl);
        toast.success("Short URL copied to clipboard.", {
          description: shortUrl,
        });
      } else {
        toast.error("Short URL is not available to copy.");
      }
    } catch {
      toast.error("Unable to copy URL. Please copy manually.");
    }
  };

  const formatDate = (value: number | Date | string) => {
    if (!value) return "Never";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString();
  };

  const totalClicks = link.clicks ?? 0;

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between border-b pb-3 w-full">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </div>
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border">
              <BarChart3 className="h-4 w-4" />
            </span>
            <div>
              <CardTitle className="text-base">Link Stats</CardTitle>
              <p className="text-xs text-muted-foreground">
                Detailed metrics for{" "}
                <code className="font-mono">{link.code}</code>
              </p>
            </div>
          </div>

          <Badge variant="outline" className="text-[11px]">
            {totalClicks} clicks
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Short & long URLs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Link2 className="h-3 w-3" />
              Short URL
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2 text-[11px]"
              onClick={handleCopy}
            >
              <Copy className="mr-1 h-3 w-3" />
              Copy
            </Button>
          </div>
          <p className="break-all font-mono text-xs">{shortUrl}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Target URL</span>
          <p className="break-all text-xs">
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              {link.url}
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          </p>
        </div>

        {/* Meta info */}
        <div className="grid gap-3 border-t pt-3 text-xs sm:grid-cols-3">
          <div className="space-y-1">
            <p className="text-muted-foreground">Total clicks</p>
            <p className="font-semibold">{totalClicks}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Created at</p>
            <p>{formatDate(link.createdAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
