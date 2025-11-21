import LinksList from "@/components/links-list";
import ShortnerForm from "@/components/shortner-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TinyLink | URL Shortener",
  description: "Tiny, trackable links with click stats.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <ShortnerForm />
      <LinksList />
    </div>
  );
}
