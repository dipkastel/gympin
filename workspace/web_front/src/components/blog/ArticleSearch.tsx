"use client";

import { useState } from "react";
import {Card, CardContent, CardHeader, TextField} from "@mui/material";

export default function ArticleSearch() {
    const [query, setQuery] = useState("");

    function searchText(value: string) {

        setQuery(value);

        const article = document.getElementById("article-content");

        console.log(article)
        if (!article) return;

        const marks = article.querySelectorAll("mark");

        marks.forEach((mark) => {
            const parent = mark.parentNode;
            if (parent) {
                parent.replaceChild(
                    document.createTextNode(mark.textContent || ""),
                    mark
                );
                parent.normalize();
            }
        });

        if (!value.trim()) return;

        const walker = document.createTreeWalker(
            article,
            NodeFilter.SHOW_TEXT
        );

        const nodes: Text[] = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode as Text);
        }

        const regex = new RegExp(value, "gi");

        nodes.forEach((node) => {
            if (regex.test(node.textContent || "")) {
                const span = document.createElement("span");

                span.innerHTML = node.textContent!.replace(
                    regex,
                    (match) => `<mark>${match}</mark>`
                );
                console.log(span)
                node.replaceWith(span);
            }
        });

        const firstResult = article.querySelector("mark");

        if (firstResult) {
            firstResult.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }

    return (

        <Card sx={{borderRadius: 5,mb:5}} className={"sideBox"} variant={"outlined"}>
            <CardHeader
                className={"sideBox_header"}
                title={"جستجو در این مقاله"}
            />
            <CardContent >
                <TextField
                    fullWidth
                    margin={"dense"}
                    value={query}
                    onChange={(e) => searchText(e.target.value)}
                    label={"جستجو"}
                    placeholder="جستجو در مقاله..."
                    type="text"
                />
            </CardContent>
        </Card>
    );
}
