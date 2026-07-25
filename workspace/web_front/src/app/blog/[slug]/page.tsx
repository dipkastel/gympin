import {JSX} from "react";
import {notFound} from "next/navigation";
import {Card, CardContent, CardHeader, Grid, TextField} from "@mui/material";
import {getArticleBySlug, getArticles} from "@/lib/network/api";
import {articleJsonLd, breadcrumbJsonLd, JsonLd} from "@/lib/seo";
import {SITE_URL} from "@/lib/data/constants";
import BlogCard from "@/components/sections/BlogCard";
import {buildArticleHref} from "@/lib/util";
import ArticleShare from "@/components/blog/ArticleShare";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleTableOfContent from "@/components/blog/ArticleTableOfContent";
import {ArticleType} from "@/types/ArticleType";
import ArticleSearch from "@/components/blog/ArticleSearch";
import ArticleSummary from "@/components/blog/ArticleSummary";
import ArticleCategories from "@/components/blog/ArticleCategories";


type ArticlePageProps = {
    params: {
        slug: string;
    };
};

async function loadArticle(slugParam: string) {
    if (!slugParam) return null;
    return await getArticleBySlug(slugParam);
}


export async function generateMetadata({params}: ArticlePageProps):
    Promise<{ description: string; title: string; openGraph: { images: { url: string | undefined }[] | undefined; publishedTime: string | undefined; description: string; type: string; title: string; url: string }; alternates: { canonical: string } }> {
    const {slug} = await params;
    const article = await loadArticle(slug);

    if (!article) {
        notFound();
    }
    const plainSummary = (article?.Summary || "")
        .replace(/<[^>]*>/g, "")
        .slice(0, 160);

    const href = buildArticleHref(article);

    return {
        title: article.Title,
        description: plainSummary,

        alternates: {
            canonical: href,
        },

        openGraph: {
            type: "article",
            title: article.Title,
            description: plainSummary,
            url: `${SITE_URL}${href}`,

            images:
                article?.ArticleImage?.Url
                    ? [
                        {
                            url: article?.ArticleImage?.Url,
                        },
                    ]
                    : undefined,

            publishedTime:
            article?.CreatedDate,
        },
    };
}

export async function generateStaticParams(): Promise<{ slug: string; }[]> {
    try {

        const {articles} = await getArticles({page: 0, size: 100});

        return articles.map((article) =>
            ({slug: buildArticleHref(article).replace("/blog/", "")})
        );
    } catch {
        return [];
    }
}


function extractHeadings(html: string) {
    const headings: { id: string; text: string; type: string; }[] = [];

    const regex = /<h([1-6])\s+[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h\1>/gis;

    let match;

    while ((match = regex.exec(html)) !== null) {
        const [,level, id, text] = match;

        headings.push({
            id,
            type: `h${level}`,
            text: text
                .replace(/<[^>]+>/g, "")
                .trim(),
        });
    }

    return headings;
}

export default async function ArticlePage({params}: ArticlePageProps): Promise<JSX.Element> {
    const {slug} = await params;
    const article : null | ArticleType = await loadArticle(slug);
    if (!article) notFound();
    const href = `${SITE_URL}${buildArticleHref(article)}`;
    //TODO getRelatedArticlesById
    const {articles: related} = await getArticles({page: 0, size: 4});
    const relatedFiltered = related
        .filter((item) => item.Id !== article.Id)
        .slice(0, 3);
    const table = extractHeadings(article.FullText||"")

    return (
        <div className="article-page">
            <JsonLd data={articleJsonLd(article, href)}/>
            <JsonLd data={breadcrumbJsonLd([
                {name: "خانه", url: SITE_URL,},
                {name: "وبلاگ", url: `${SITE_URL}/blog`,},
                {name: article.Title, url: href,},
            ])}/>
            {article&&<ArticleHeader article={article}/>}
            <Grid container columns={40} spacing={3} sx={{p: 3}}>
                <Grid size={{sm:40,xs:40,md:30}}>
                    <Card sx={{borderRadius: 5}}  variant={"outlined"}>
                        {article?.ArticleImage?.Url && (
                            <div className="article-hero-image">
                                <img src={article.ArticleImage.Url} alt={article.Title}/>
                            </div>
                        )}
                        <div id={"article-content"} className="article-body" dangerouslySetInnerHTML={{__html: article.FullText || "",}}/>
                        <div className={"article-divider"}/>
                        <ArticleShare articleTitle={article.Title} href={href}/>
                    </Card>
                </Grid>
                <Grid size={{sm:40,xs:40,md:10}}>
                    <ArticleTableOfContent table={table} />
                    <ArticleSummary summary={article.Summary} />
                    <ArticleSearch />
                    <ArticleCategories categories={article.Categories} />
                </Grid>
            </Grid>
            {relatedFiltered.length > 0 && (
                <div className="article-related">
                    <h2 className="article-related__title"> مطالب مرتبط </h2>
                    <div className="blog-grid">
                        {relatedFiltered.map((relatedArticle) => (
                            <BlogCard key={relatedArticle.Id} article={relatedArticle}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
