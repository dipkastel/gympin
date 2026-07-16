import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "وبلاگ تخصصی جیم پین",
    description: "وبلاگ تخصصی جیم پین به مطالبی مانند مزایای کارکنان، رفاه پرسنل، ورزش سازمانی، سلامت سازمان، مزایای غیرنقدی، برنامه رفاهی، کاهش استرس کاری، بهره‌وری شرکت، تجربه کارکنان می پردازد همچنین به مقالاتی مانند کاهش وزن، تناسب اندام، ورزش روزانه، چربی سوزی، ورزش در خانه و محل کار، تغذیه سالم، کاهش استرس،   ",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
