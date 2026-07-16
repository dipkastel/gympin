import React, {JSX} from "react";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/data/constants";
import "@/styles/globals.scss";


export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | جیم پین" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "جیم پین",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/logo192.png",
  },
  manifest: "/manifest.json",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps): JSX.Element {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="/fonts/iransansweb/style.css" />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body>
        <ThemeRegistry>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZPTQ3JNJ5Y" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZPTQ3JNJ5Y');
          `}
        </Script>
      </body>
    </html>
  );
}






