// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="flex flex-row items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </span>
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">
              Something went wrong
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              An unexpected error occurred while processing your request.
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
            <p className="font-medium">Technical details</p>
            <p className="mt-1 line-clamp-2">
              {error?.message || "Unknown error"}
            </p>
            {error?.digest && (
              <p className="mt-1 text-[10px]">
                Error ID: <span className="font-mono">{error.digest}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 ml-auto">
            <Button
              size="sm"
              onClick={() => reset()}
              className="inline-flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="inline-flex items-center gap-1"
            >
              <Link href="/">
                <Home className="h-3 w-3" />
                Go to Dashboard
              </Link>
            </Button>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            If this keeps happening, please refresh the page or try again after
            some time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
