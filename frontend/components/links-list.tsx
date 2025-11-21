import { getAllLinks } from "@/services";
import { Link as LinkType } from "@/types";
import LinksTable from "./links-table";

const LinksList: React.FC = async () => {
  const res = await getAllLinks();
  const links: LinkType[] = res?.data ?? [];

  return <LinksTable initialLinks={links} />;
};

export default LinksList;
