import {JSX} from "react";
import type {Metadata} from "next";

import {Container} from "@mui/material";

import {getArticles} from "@/lib/network/api";
import {SITE_URL} from "@/lib/data/constants";

import {breadcrumbJsonLd, JsonLd,} from "@/lib/seo";

import PageTitleWhite from "@/components/sections/PageTitleWhite";
import BlogHero from "@/components/sections/BlogHero";
import PulseDivider from "@/components/sections/PulseDivider";
import BlogCard from "@/components/sections/BlogCard";
import BlogPagination from "@/components/sections/BlogPagination";

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export const metadata: Metadata = {
    title: "وبلاگ",
    description:
        "در جریان آخرین اخبار، مقالات و تحقیقات جیم پین درباره ورزش، سلامت سازمانی و رفاهیات کارکنان باشید.",
    alternates: {
        canonical: "/blog",
    },
};

export default async function BlogPage({searchParams,}: BlogPageProps): Promise<JSX.Element> {
    const params = await searchParams;
    const pageNum = Math.max(1, Number.parseInt(params?.page ?? "1", 10),);
    const {articles, totalPages,} = await getArticles({page: pageNum - 1, size: 10,});
    const [featured, ...rest] = articles;
    return (
        <div className="blog-page">
            <JsonLd data={breadcrumbJsonLd([{name: "خانه", url: SITE_URL,}, {name: "وبلاگ", url: `${SITE_URL}/blog`,},])}/>

            <PageTitleWhite title="وبلاگ" subtitle="در جریان آخرین اخبار و مطالب جیم پین باشید"/>

            <Container sx={{pb: 8,}}>
                {featured && pageNum === 1 && (<>
                    <BlogHero article={featured}/>
                    <PulseDivider/>
                </>)}
                {articles.length === 0 ? (
                    <div className="blog-empty"><p> در حال حاضر مطلبی برای نمایش وجود ندارد. </p></div>
                ) : (
                    <div className="blog-grid">
                        {(pageNum === 1 ? rest : articles).map((article) => (
                            <BlogCard key={article.Id} article={article}/>
                        ))}
                    </div>
                )}
                <BlogPagination page={pageNum - 1} totalPages={totalPages}/>
            </Container>
        </div>
    );
}
