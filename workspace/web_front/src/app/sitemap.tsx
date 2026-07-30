import type {MetadataRoute} from "next";

import {getArticleCategories, getArticles} from "@/lib/network/api";
import {SITE_URL} from "@/lib/data/constants";
import {buildArticleCategoryHref, buildArticleHref} from "@/lib/util";
import {getLastUpdateCategories, getNextRandomArticleCategoryUpdateDayCount, setLastUpdateCategories, setNextRandomArticleCategoryUpdateDayCount} from "@/lib/pocket";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}/`,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/about`,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/corporate`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/blog`,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/faq`,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/contact`,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/term-and-conditions`,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    let articleRoutes: MetadataRoute.Sitemap = [];

    try {
        const first = await getArticles({
            page: 0,
            size: 50,
        });

        let all = [...first.articles];

        const pagesToFetch = Math.min(
            first.totalPages || 1,
            10
        );

        for (let p = 1; p < pagesToFetch; p++) {
            const next = await getArticles({
                page: p,
                size: 50,
            });

            all = all.concat(next.articles);
        }

        articleRoutes = all.map((article) => ({
            url: `${SITE_URL}${buildArticleHref(article)}`,
            lastModified:
                article?.UpdatedDate || article?.CreatedDate,
            changeFrequency: "monthly",
            priority: article.SeoPriority || 0.6,
        }));
    } catch (err) {
        console.error(
            "sitemap: failed to load articles",
            err instanceof Error ? err.message : err
        );
    }
    let articleCategories: MetadataRoute.Sitemap = [];

    try {
        const all = await getArticleCategories();
        let updateDate:Date = getLastUpdateCategories()??new Date(0);
        const now = new Date();
        const days =getNextRandomArticleCategoryUpdateDayCount();
        const limitDate = new Date();
        limitDate.setDate(now.getDate() - days);


        if (updateDate < limitDate) {
            updateDate = now;
            const days = 32 + Math.floor(Math.random() * 9);
            setLastUpdateCategories(updateDate);
            setNextRandomArticleCategoryUpdateDayCount(days)
        }

        if (all) {
            articleRoutes = all.map((category) => ({
                url: `${SITE_URL}${buildArticleCategoryHref(category)}`,
                lastModified: updateDate,
                changeFrequency: "monthly",
                priority: 0.3,
            }));
        }
    } catch (err) {
        console.error(
            "sitemap: failed to load articlesCategories",
            err instanceof Error ? err.message : err
        );
    }

    return [...staticRoutes, ...articleRoutes, ...articleCategories];
}
