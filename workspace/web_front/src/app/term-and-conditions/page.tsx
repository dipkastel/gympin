import {JSX} from "react";
import type {Metadata} from "next";

import PageTitle from "@/components/sections/PageTitle";
import TermsText from "@/components/sections/TermsText";

import {breadcrumbJsonLd, JsonLd} from "@/lib/seo";

import {SITE_URL} from "@/lib/data/constants";

export const metadata: Metadata = {
    title: "قوانین و مقررات",
    description: "قوانین و مقررات استفاده از پلتفرم جیم پین برای ورزشکاران و مراکز ورزشی.",
    alternates: {canonical: "/term-and-conditions"},
};

export default function TermsPage(): JSX.Element {
    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    {
                        name: "خانه",
                        url: SITE_URL,
                    },
                    {
                        name: "قوانین و مقررات",
                        url: `${SITE_URL}/term-and-conditions`,
                    },
                ])}
            />

            <PageTitle
                title="قوانین و مقررات"
                subtitle="قواعدی برای یک تجربه کاربری مطمئن"
            />

            <TermsText/>
        </>
    );
}
