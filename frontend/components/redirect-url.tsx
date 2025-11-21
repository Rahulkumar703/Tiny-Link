"use client";

import { useEffect, useState } from "react";
import { Loader2, Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getLinkByCode } from "@/services";
import { useRouter } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function RedirectUrl({ code }: { code: string }) {
  const [errors, setErrors] = useState<Array<string> | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!code) return;

    const redirectToTarget = async () => {
      try {
        const res = await getLinkByCode(code);

        if (!res.ok) {
          setErrors(res?.errors?.map((e) => e.message) || [res.message]);
          return;
        }

        setShortUrl(res.data?.url || null);
        router.replace(`${BACKEND_URL}/api/${code}`);
        // window.location.href = `${BACKEND_URL}/api/${code}`;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(
            error.message || "Redirection failed. Please try again later."
          );
          return;
        }
        toast.error("Redirection failed. Please try again later.");
      }
    };

    redirectToTarget();
  }, [code, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border">
            <Link2 className="h-4 w-4" />
          </span>
          <CardTitle className="text-base font-semibold">
            {errors ? "Error" : "Redirecting…"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            {errors ? (
              <div className="flex flex-col">
                {errors.map((error, index) => (
                  <span key={index} className="text-red-500">
                    - {error}
                  </span>
                ))}
              </div>
            ) : (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Please wait, redirecting to the target URL.</span>
              </>
            )}
          </div>

          <div className="mt-2 rounded-md bg-muted px-3 py-2 text-xs">
            <p className="text-[11px] font-medium text-muted-foreground">
              Short code
            </p>
            <p className="font-mono text-xs">{code}</p>
            <p className="mt-1 text-[11px] break-all text-muted-foreground">
              {shortUrl}
            </p>
          </div>

          {errors ? null : (
            <p className="text-[11px] text-muted-foreground">
              If nothing happens,&nbsp;
              <a
                href={`${BACKEND_URL}/api/${code}`}
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                click here to continue
              </a>
              .
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
