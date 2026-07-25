import {notFound, permanentRedirect} from "next/navigation";

import {getArticleById} from "@/lib/network/api";
import {ArticleType} from "@/types/ArticleType";
import {buildArticleHref, decodeLegacyCid} from "@/lib/util";

interface LegacyBlogDetailRedirectProps {
    params: Promise<{ cid: string; }>
}

export default async function LegacyBlogDetailRedirect({params}: LegacyBlogDetailRedirectProps): Promise<void> {
    const {cid} = await params;
    const id = decodeLegacyCid(cid);
    if (!id) notFound();
    const article: ArticleType | null = await getArticleById(id);
    if (!article) notFound();
    permanentRedirect(buildArticleHref(article),
    );
}
