import {JSX} from "react";
import {IconButton,} from "@mui/material";
import {LinkedIn, Telegram, WhatsApp} from "@mui/icons-material";


export default function ArticleShare({articleTitle, href}): JSX.Element {
    return (
        <section>
            <div className="article-share">
                        <span>
                          اشتراک‌گذاری:
                        </span>
                <IconButton size="large" target="_blank" rel="noreferrer"
                            href={`https://t.me/share/url?url=${encodeURIComponent(href)}&text=${encodeURIComponent(articleTitle)}`}>
                    <Telegram fontSize="large"/>
                </IconButton>

                <IconButton size="large" target="_blank" rel="noreferrer"
                            href={`https://wa.me/?text=${encodeURIComponent(`${articleTitle} ${href}`)}`}>
                    <WhatsApp fontSize="large"/>
                </IconButton>

                <IconButton size="large" target="_blank" rel="noreferrer"
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(href)}`}>
                    <LinkedIn fontSize="large"/>
                </IconButton>
            </div>
        </section>
    );
}
