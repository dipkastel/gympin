import Link from "next/link";
import {Button} from "@mui/material";
import {buildArticleHref, categoriesLabel, estimateReadingMinutes, formatDate} from "@/lib/util";
import {Article} from "@/types/Article";

interface BlogHeroProps {
    article?: Article | null;
}

export default function BlogHero({article}: BlogHeroProps) {
    if (!article) return null;


    const plainSummary = (
        article.Summary ?? ""
    ).replace(/<[^>]*>/g, "");

    const category = categoriesLabel(article);
    const minutes = estimateReadingMinutes(article.FullText);
    const href = buildArticleHref(article);

    return (
        <article className="blog-hero">
            <div className="blog-hero__media">
                {article.ArticleImage?.Url && (
                    <img
                        src={article.ArticleImage.Url}
                        alt={article.Title ?? ""}
                    />
                )}

                <span className="blog-hero__badge">
          جدیدترین مطلب
        </span>
            </div>

            <div className="blog-hero__body">
                {category && (
                    <div className="blog-hero__eyebrow">
                        {category}
                    </div>
                )}

                <h2 className="blog-hero__title">
                    <Link
                        href={href}
                        style={{
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {article.Title}
                    </Link>
                </h2>

                <p className="blog-hero__summary">
                    {plainSummary}
                </p>

                <div className="blog-hero__meta">
          <span>
            {formatDate(
                article.CreatedDate,
            )}
          </span>

                    <span>·</span>

                    <span>
            {minutes} دقیقه مطالعه
          </span>
                </div>

                <Button
                    component={"a"}
                    href={href}
                    variant="contained"
                    color="primary"
                    className="blog-hero__cta"
                    sx={{
                        borderRadius: 3,
                        px: 4,
                    }}
                >
                    ادامه مطلب
                </Button>
            </div>
        </article>
    );
}
