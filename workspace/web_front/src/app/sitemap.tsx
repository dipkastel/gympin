import type { MetadataRoute } from "next";

import { getArticles } from "@/lib/network/api";
import { SITE_URL } from "@/lib/data/constants";
import {buildArticleHref} from "@/lib/util";


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
      priority: article.SeoPriority||0.6,
    }));
  } catch (err) {
    console.error(
      "sitemap: failed to load articles",
      err instanceof Error ? err.message : err
    );
  }

  return [...staticRoutes, ...articleRoutes];
}
