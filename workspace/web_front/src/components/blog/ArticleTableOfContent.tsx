import {JSX} from "react";
import {IconButton,} from "@mui/material";
import {LinkedIn, Telegram, WhatsApp} from "@mui/icons-material";
import {categoriesLabel, estimateReadingMinutes, formatDate} from "@/lib/util";
import Link from "next/link";


export default function ArticleTableOfContent({table}): JSX.Element {

    return (
        <nav>
            <ul>
                {table.map(item=>(
                    <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>
                ))}
            </ul>
        </nav>
    );
}
