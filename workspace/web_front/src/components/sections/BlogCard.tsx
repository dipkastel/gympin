import Link from "next/link";
import {buildArticleHref, categoriesLabel, estimateReadingMinutes, formatDate} from "@/lib/util";
import {Article} from "@/types/Article";

interface BlogCardProps {
    article: Article;
}

export default function BlogCard({article}: BlogCardProps) {
    const plainSummary = (article.Summary ?? "").replace(/<[^>]*>/g, "");
    const category = categoriesLabel(article);
    const minutes = estimateReadingMinutes(article.FullText);
    return (
        <Link href={buildArticleHref(article)} className="blog-card">
            <div className="blog-card__media">
                {article.ArticleImage?.Url && (
                    <img
                        src={article.ArticleImage.Url}
                        alt={article.Title ?? ""}
                        loading="lazy"
                    />
                )}
            </div>

            <div className="blog-card__body">
                {category && (<span className="blog-card__category">{category}</span>)}
                <h3 className="blog-card__title">{article.Title}</h3>
                <p className="blog-card__excerpt">{plainSummary}</p>
                <div className="blog-card__meta">
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
            </div>
        </Link>
    );
}
