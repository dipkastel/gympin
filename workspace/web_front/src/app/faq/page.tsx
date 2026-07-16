import { JSX } from "react";
import type { Metadata } from "next";
import PageTitle from "@/components/sections/PageTitle";
import FaqAccordion from "@/components/sections/FaqAccordion";

import { faqSources } from "@/lib/data/faqData";

import {
  JsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

import {
  SITE_URL,
} from "@/lib/data/constants";

export const metadata: Metadata = {
  title: "سوالات متداول",
  description:
    "پرسش و پاسخ‌های رایج درباره جیم پین: نحوه ثبت‌نام سازمان‌ها، هزینه‌ها، امکانات و نحوه همکاری مراکز ورزشی.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage(): JSX.Element {
  return (
    <>
      <JsonLd data={faqPageJsonLd(faqSources)} />

      <JsonLd
        data={breadcrumbJsonLd([
          {
            name: "خانه",
            url: SITE_URL,
          },
          {
            name: "سوالات متداول",
            url: `${SITE_URL}/faq`,
          },
        ])}
      />
      <PageTitle
        title="سوالات متداول"
        subtitle="پرسش و پاسخ‌های رایج دسته‌بندی شده"
      />
      <FaqAccordion />
    </>
  );
}
