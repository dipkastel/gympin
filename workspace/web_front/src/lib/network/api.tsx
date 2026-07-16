import {Article} from "@/types/Article";
import {ArticleApi, AuthApi, LinkApi} from "@/lib/network/apiConstants";

const REVALIDATE_SECONDS = 3600;

interface PagingRequest {
    Page: number;
    Size: number;
    Desc?: boolean;
}

interface GetArticlesParams {
    page?: number;
    size?: number;
}

interface ApiResponse<T> {
    Data: T;
}

interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
}


export interface LinkData {
    Id: number;
    Code: string;
    Url: string;
}

async function apiGet<T>(url: string, options?: RequestInit & { revalidate?: number; noStore?: boolean; }): Promise<T | null> {
    try {
        const {revalidate, noStore, ...fetchOptions} = options ?? {};
        const res = await fetch(url, {
            ...fetchOptions, ...(noStore ? {cache: "no-store"} : {
                next: {revalidate: revalidate ?? REVALIDATE_SECONDS},
            }),
        });
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`,);
        }
        const json: ApiResponse<T> = await res.json();
        return json.Data;
    } catch (err) {
        console.error("apiGet error:", err instanceof Error ? err.message : err);
        return null;
    }
}

async function apiPost<T>(url: string, body: unknown, options?: { revalidate?: number; },): Promise<T | null> {
    try {
        const res = await fetch(url, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            next: {revalidate: options?.revalidate ?? REVALIDATE_SECONDS},
        });

        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`,);
        }

        const json: ApiResponse<T> = await res.json();
        return json.Data;
    } catch (err) {
        console.error("apiPost error:", err instanceof Error ? err.message : err,);
        return null;
    }
}

export async function getArticles({page = 0, size = 9}: GetArticlesParams = {}) {
    const body = {
        queryType: "FILTER",
        Status: "PUBLISHED",
        paging: {
            Page: page,
            Size: size,
            Desc: true,
        } as PagingRequest,
    };

    const data = await apiPost<PageResponse<Article>>(`${AuthApi.BASEURL}${ArticleApi.query}`, body,);
    return {
        articles: data?.content ?? [],
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
        page,
    };
}

export async function getArticleById(id: number | string,): Promise<Article | null> {
    if (!id) return null;
    return apiGet<Article>(`${AuthApi.BASEURL}${ArticleApi.getById}?id=${encodeURIComponent(String(id))}`);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    if (!slug) return null;

    return apiGet<Article>(`${AuthApi.BASEURL}${ArticleApi.getBySlug}?slug=${encodeURIComponent(slug)}`);
}

export async function getLinkByCode(code: string,): Promise<LinkData | null> {
    if (!code) return null;
    return apiGet<LinkData>(`${AuthApi.BASEURL}${LinkApi.getByCode}?code=${encodeURIComponent(code)}`, {noStore: true});
}
