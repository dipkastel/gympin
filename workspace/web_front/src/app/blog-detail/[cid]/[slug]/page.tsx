import {notFound, permanentRedirect} from "next/navigation";

import {getArticleById} from "@/lib/network/api";
import {Article} from "@/types/Article";
import {buildArticleHref, decodeLegacyCid} from "@/lib/util";

interface LegacyBlogDetailRedirectProps {
    params: Promise<{ cid: string; }>
}

export default async function LegacyBlogDetailRedirect({params}: LegacyBlogDetailRedirectProps): Promise<void> {
    const {cid} = await params;
    const id = decodeLegacyCid(cid);
    if (!id) notFound();
    const article: Article | null = await getArticleById(id);
    if (!article) notFound();
    permanentRedirect(buildArticleHref(article),
    );
}
