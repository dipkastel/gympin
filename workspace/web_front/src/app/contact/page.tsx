import type {Metadata} from "next";
import PageTitle from "@/components/sections/PageTitle";
import ContactData from "@/components/sections/ContactData";
import {breadcrumbJsonLd, JsonLd} from "@/lib/seo";
import {SITE_URL} from "@/lib/data/constants";
import {JSX} from "react";

export const metadata: Metadata = {
    title: "تماس با ما",
    description: "راه‌های تماس با جیم پین: تلفن، ایمیل، آدرس دفتر مرکزی و فرم درخواست مشاوره رایگان برای سازمان‌ها.",
    alternates: {canonical: "/contact"},
};
export default function ContactPage(): JSX.Element {
    return (<>
        <JsonLd data={breadcrumbJsonLd([{name: "خانه", url: SITE_URL}, {name: "تماس با ما", url: `${SITE_URL}/contact`},])}/>
        <PageTitle title="تماس با ما" subtitle="سلامتی را به سازمان خود هدیه دهید"/>
        <ContactData/>
    </>);
}
