import LinksList from "@/components/links-list";
import ShortnerForm from "@/components/shortner-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TinyLink | URL Shortener",
  description: "Tiny, trackable links with click stats.",
};

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4.6rem)] flex-col gap-10 p-4">
      <ShortnerForm />
      <LinksList />
    </main>
  );
}
