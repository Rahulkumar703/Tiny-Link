// app/health/page.tsx
import { getServerHealth } from "@/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Clock, Code2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health | TinyLink",
  description: "System health status and information.",
};
export default async function HealthPage() {
  const health = await getServerHealth();
  const isHealthy = health.ok === true;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold tracking-tight">System Health</h1>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Server Status</CardTitle>
          <Badge
            variant={isHealthy ? "success" : "destructive"}
            className="flex items-center gap-1"
          >
            {isHealthy ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Healthy
              </>
            ) : (
              <>
                <AlertTriangle className="h-3.5 w-3.5" />
                Unavailable
              </>
            )}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">{health.data?.version ?? "N/A"}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Checked at</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>
                {new Date(health.timestamp).toLocaleString() ?? "Unknown"}
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-muted-foreground">Message</span>
            <div className="max-w-[60%] font-medium text-right">
              {health.message ?? "No message"}
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" />
              Raw Response
            </div>
            <pre className="mt-1 max-h-40 overflow-auto rounded-md bg-muted p-2 text-xs">
              {JSON.stringify(health, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
