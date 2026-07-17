import {JSX} from "react";
import {IconButton,} from "@mui/material";
import {LinkedIn, Telegram, WhatsApp} from "@mui/icons-material";
import {categoriesLabel, estimateReadingMinutes, formatDate} from "@/lib/util";
import Link from "next/link";
import {Article} from "@/types/Article";


type ArticleHeaderProps = {
    article: Article;
};

export default function ArticleHeader({article}: ArticleHeaderProps): JSX.Element {

    const category = categoriesLabel(article);
    const minutes = estimateReadingMinutes(article?.FullText);

    return (
        <header className="article-header">
            {category && (<div className="article-header__category">{category}</div>)}
            <h1 className="article-header__title">{article?.Title}</h1>
            <div className="article-header__meta">
                <span>{formatDate(article?.CreatedDate)}</span> <span>·</span> <span>{minutes} دقیقه مطالعه </span>
                {article?.CreatorUser?.Username && (
                    <><span>·</span> <span> نویسنده:{" "} {article?.CreatorUser?.Username} </span></>
                )}
            </div>
            <nav className="article-header__breadcrumb">
                <Link href="/"> خانه </Link> {" / "} <Link href="/blog"> وبلاگ </Link> {" / "} <span>{article?.Title}</span>
            </nav>
        </header>
    );
}
