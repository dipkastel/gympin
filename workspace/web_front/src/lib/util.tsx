import {Article} from "@/types/Article";

export function formatDate(dateStr?: string,): string {
    if (!dateStr) return "";
    try {
        return new Intl.DateTimeFormat(
            "fa-IR",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            },
        ).format(new Date(dateStr));
    } catch {
        return "";
    }
}


export function buildArticleHref(article: Pick<Article,"Slug">): string {
    return `/blog/${article.Slug}`;
}

export function parseArticleParam(param = ""): string | null {
    const match = /^(\d+)-/.exec(param);
    return match ? match[1] : null;
}

export function estimateReadingMinutes(html = " "): number {
    const text = html?.replace(/<[^>]*>/g, " ");

    const words = text
        ?.trim()
        ?.split(/\s+/)
        ?.filter(Boolean).length;

    return Math.max(1, Math.round(words / 100));
}

export function decodeLegacyCid(cid = ""): string | null {
    const digitCount = parseInt(cid.substring(0, 1), 10,);
    if (!digitCount || Number.isNaN(digitCount)) {
        return null;
    }
    const id = cid.substring(1, 1 + digitCount);
    return id || null;
}

export function categoriesLabel(article: Article,): string {
    return (
        article.Categories
            ?.map((category) => category.Name)
            ?.filter(Boolean)
            ?.join("، ") ?? ""
    );
}
