"use client";

import {ChangeEvent, FormEvent, useState} from "react";

import {useRouter} from "next/navigation";

interface BlogSearchProps {
    initialQuery?: string;
}

export default function BlogSearch({initialQuery}: BlogSearchProps) {
    const [q, setQ] =
        useState<string>(initialQuery || "");

    const router =
        useRouter();

    function onSubmit(
        e: FormEvent<HTMLFormElement>,
    ): void {
        e.preventDefault();

        const params =
            new URLSearchParams();

        if (q.trim()) {
            params.set(
                "q",
                q.trim(),
            );
        }

        router.push(
            `/blog${
                params.toString()
                    ? `?${params.toString()}`
                    : ""
            }`,
        );
    }

    function onChange(
        e: ChangeEvent<HTMLInputElement>,
    ): void {
        setQ(
            e.target.value,
        );
    }

    return (
        <form
            className="blog-search"
            onSubmit={
                onSubmit
            }
            role="search"
        >
            <input
                type="search"
                placeholder="جستجو در مطالب ..."
                value={q}
                onChange={
                    onChange
                }
                aria-label="جستجو در مطالب وبلاگ"
            />

            <button type="submit">
                جستجو
            </button>
        </form>
    );
}
