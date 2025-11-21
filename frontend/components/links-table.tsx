"use client";

import { useEffect, useMemo, useState } from "react";
import { Link as LinkType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link2, Search } from "lucide-react";
import LinkActions from "./link-actions";
import { useLinks } from "@/context/LinksContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LinksTableProps {
  initialLinks: LinkType[];
}

const LinksTable: React.FC<LinksTableProps> = ({ initialLinks }) => {
  const { links, setLinks } = useLinks();
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks, setLinks]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return links;

    return links.filter(
      (link) =>
        link.code.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q)
    );
  }, [links, search]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold tracking-tight">
            All Short Links
          </h2>
          <Badge variant="outline" className="text-[10px]">
            {links.length} total
          </Badge>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by code or URL"
            className="h-8 pl-7 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table / states */}
      <div className="rounded-md border bg-card">
        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-10 text-center text-sm text-muted-foreground">
            <p>No links yet.</p>
            <p className="text-xs">
              Use the form above to create your first short link.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No links match your search.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Short code</TableHead>
                <TableHead>Target URL</TableHead>
                <TableHead className="w-[90px] text-center">Clicks</TableHead>
                <TableHead className="w-[150px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((link) => (
                <TableRow
                  key={link.code}
                  onClick={(e) => {
                    // Prevent navigating when clicking on action buttons
                    if (
                      (e.target as HTMLElement).closest("button") ||
                      (e.target as HTMLElement).closest("a")
                    ) {
                      return;
                    }
                    router.push(`/code/${link.code}`);
                  }}
                >
                  {/* Code */}
                  <TableCell className="align-top text-xs">
                    <Link href={`/${link.code}`}>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">
                        {link.code}
                      </code>
                    </Link>
                  </TableCell>

                  {/* URL */}
                  <TableCell className="align-top text-xs">
                    <div className="max-w-[260px] truncate">
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {link.url}
                      </Link>
                    </div>
                  </TableCell>

                  {/* Clicks */}
                  <TableCell className="align-top text-center text-xs font-medium">
                    {link.clicks ?? link.clicks ?? 0}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="align-top text-right">
                    <LinkActions link={link} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default LinksTable;
