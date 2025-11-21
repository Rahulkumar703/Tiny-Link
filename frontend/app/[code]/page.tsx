import RedirectUrl from "@/components/redirect-url";
import { getLinkByCode } from "@/services";
import { Metadata } from "next";
import { Link as LinkType } from "@/types";

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
    title: `Redirecting to ${link.url} | TinyLink`,
    description: `Redirecting to the URL associated with the code: ${link.code}`,
  };
};

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <RedirectUrl code={code} />;
}
