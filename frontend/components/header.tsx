// components/site-header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Link2, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Health",
    href: "/healthz",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-3 sm:px-4 lg:px-0">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex size-10 items-center justify-center rounded-lg border">
              <Link2 className="size-6" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold">TinyLink</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em]">
                URL Shortener
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            size="sm"
            variant="outline"
            asChild
            className="hidden text-xs sm:inline-flex"
          >
            <Link
              href="https://github.com/Rahulkumar703/Tiny-Link"
              target="_blank"
              rel="noreferrer"
            >
              <Github />
              View on GitHub
            </Link>
          </Button>
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex md:hidden"
            >
              <Menu className="size-6" />
              <span className="sr-only">Open navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="border-b">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border">
                    <Link2 className="size-6" />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold">TinyLink</span>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em]">
                      URL Shortener
                    </span>
                  </div>
                </Link>
              </div>
              <SheetTitle className="hidden">TinyLink</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 p-4 ml-auto">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="hidden text-xs sm:inline-flex mb-10"
              >
                <Link
                  href="https://github.com/Rahulkumar703/Tiny-Link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github />
                  View on GitHub
                </Link>
              </Button>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-6 py-1.5 text-xl font-medium transition-colors hover:text-accent-foreground",
                    pathname === item.href
                      ? "text-accent-foreground border-r-4 border-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
