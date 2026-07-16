import React, { ReactElement } from "react";
import {
  SITE_NAME,
  SITE_URL,
} from "./data/constants";
import {Article} from "@/types/Article";

interface FaqItem {
  q: string;
  a: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdProps {
  data: object;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "GymPin",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo300.png`,
    description:
        "جیم پین پلتفرم جامع خدمات ورزشی کارمندان سازمان‌ها و پل ارتباطی مراکز ورزشی و سازمان‌ها",
    email: "info@gympin.ir",
    telephone: "+982128424190",
    sameAs: [
      "https://www.instagram.com/gympin_ir",
      "https://t.me/gympin_info",
      "https://www.linkedin.com/company/gympintdp",
      "https://wa.me/+989221496746",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input":
          "required name=search_term_string",
    },
  };
}

export function faqPageJsonLd(
    items: FaqItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(
        (item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        }),
    ),
  };
}

export function breadcrumbJsonLd(
    items: BreadcrumbItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(
        (item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        }),
    ),
  };
}

export function articleJsonLd(
    article: Article,
    url: string,
) {
  const plainSummary = (
      article.Summary ?? ""
  )
      .replace(/<[^>]*>/g, "")
      .slice(0, 300);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.Title,
    description: plainSummary,
    image: article.ArticleImage?.Url
        ? [article.ArticleImage.Url]
        : undefined,
    datePublished:
    article.CreatedDate,
    dateModified:
        article.UpdatedDate ??
        article.CreatedDate,
    author: {
      "@type": "Organization",
      name:
          article.CreatorUser
              ?.Username ??
          SITE_NAME,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function JsonLd({
                         data,
                       }: JsonLdProps): ReactElement {
  return (
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
      />
  ) as React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
