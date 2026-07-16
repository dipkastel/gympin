import {
  redirect,
  notFound,
} from "next/navigation";

import { getLinkByCode } from "@/lib/network/api";

interface ShortLinkRedirectProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function ShortLinkRedirect({params}: ShortLinkRedirectProps): Promise<never> {
  const { code } = await params;

  const data = await getLinkByCode(code);

  if (!data?.Url) {
    notFound();
  }

  redirect(data.Url);
}
