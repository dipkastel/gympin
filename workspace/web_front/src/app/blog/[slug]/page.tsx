import {JSX} from "react";
import {notFound} from "next/navigation";
import {Card, CardHeader, Grid} from "@mui/material";
import {getArticleBySlug, getArticles} from "@/lib/network/api";
import {articleJsonLd, breadcrumbJsonLd, JsonLd} from "@/lib/seo";
import {SITE_URL} from "@/lib/data/constants";
import BlogCard from "@/components/sections/BlogCard";
import {buildArticleHref} from "@/lib/util";
import ArticleShare from "@/components/blog/ArticleShare";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleTableOfContent from "@/components/blog/ArticleTableOfContent";
import {Article} from "@/types/Article";


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
    const headings: { id: string; text: string }[] = [];

    const regex = /<h3\s+[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h3>/gis;

    let match;

    while ((match = regex.exec(html)) !== null) {
        const [, id, text] = match;

        headings.push({
            id,
            text: text
                .replace(/<[^>]+>/g, "")
                .trim(),
        });
    }

    return headings;
}

export default async function ArticlePage({params}: ArticlePageProps): Promise<JSX.Element> {
    const {slug} = await params;
    const article : null | Article = await loadArticle(slug);
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
                <Grid size={{md: 30, sm: 40}}>
                    <Card sx={{borderRadius: 5}} elevation={3}>
                        {article?.ArticleImage?.Url && (
                            <div className="article-hero-image">
                                <img src={article.ArticleImage.Url} alt={article.Title}/>
                            </div>
                        )}
                        {article?.Summary && (
                            <div className="article-lead" dangerouslySetInnerHTML={{__html: article.Summary,}}/>
                        )}
                        <div className="article-body" dangerouslySetInnerHTML={{__html: article.FullText || "",}}/>

                        <div className={"article-divider"}/>
                        <ArticleShare articleTitle={article.Title} href={href}/>
                    </Card>

                </Grid>
                <Grid size={10}>

                    {table.length>0&&<Card sx={{borderRadius: 5}} className={"article-ContentTable"} elevation={3}>
                        <CardHeader
                            className={"article-ContentTable_header"}
                            title={"در این مقاله خواهید خواند"}
                            sx={{
                                bgcolor:"#eaeaea",
                                "& .MuiCardHeader-title": {
                                    fontSize: "1rem !important",
                                },
                            }}
                        />
                        <ArticleTableOfContent table={table} />
                    </Card>}
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
