// app/code/[code]/page.tsx
import { notFound } from "next/navigation";
import { getLinkByCode } from "@/services";
import { Link as LinkType } from "@/types";
import { LinkStats } from "@/components/link-stats";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> => {
  const { code } = await params;
  const res = await getLinkByCode(code);

  if (!res?.ok || !res.data) {
    return {
      title: "Link Not Found | TinyLink",
      description: res?.message || "The requested link does not exist.",
    };
  }
  const link = res.data as LinkType;

  return {
    title: `Stats for ${link.code} | TinyLink`,
    description: `Statistics and information for the link: ${link.code}`,
  };
};

export default async function CodeStatsPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const res = await getLinkByCode(code);

  if (!res?.ok || !res.data) {
    notFound();
  }

  const link = res.data as LinkType;

  return (
    <div className="mx-auto max-w-2xl pt-4">
      <LinkStats link={link} />
    </div>
  );
}
