import { JSX } from "react";
import type { Metadata } from "next";

import PageTitle from "@/components/sections/PageTitle";
import ImageText from "@/components/sections/ImageText";
import TextImage from "@/components/sections/TextImage";

import {
  JsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

import {
  SITE_URL,
} from "@/lib/data/constants";

export const metadata: Metadata = {
  title: "آشنایی با جیم پین",
  description:
    "جیم پین از سال ۱۴۰۰ در حوزه ورزش و سلامت سازمانی فعالیت می‌کند و پل ارتباطی مراکز ورزشی و سازمان‌ها برای رفاهیات ورزشی کارکنان است.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage(): JSX.Element {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          {
            name: "خانه",
            url: SITE_URL,
          },
          {
            name: "آشنایی با جیم پین",
            url: `${SITE_URL}/about`,
          },
        ])}
      />

      <PageTitle
        title="آشنایی با جیم پین"
        subtitle="با جیم پین در مسیر سلامتی قدم بردارید"
      />

      <ImageText
        image="/images/about-man.jpg"
        alt="ورزش در سازمان مهم‌ترین عامل رشد است"
        text="جیم پین یک استارتاپ فعال در حوزه ورزش و سلامت است که با هدف ترویج فعالیت‌های بدنی و بهبود سلامتی، از سال ۱۴۰۰ شروع به فعالیت نموده است. ما در جیم پین به ارائه خدمات، معرفی و رزرو مراکز ورزشی به صورت آنلاین برای شرکت‌ها و سازمان‌ها اهتمام داریم. هدف ما ایجاد فضایی راحت و مطمئن برای پیداکردن و انجام فعالیت‌های ورزشی است."
      />

      <TextImage
        image="/images/daftar-laptop.jpg"
        alt="جیم پین پل ارتباطی سازمان‌ها و ورزش"
        text="ما اعتقاد داریم که ورزش یکی از راهکارهای بسیار مهم در بهبود سلامتی و روحیه افراد است. در جیم پین به این موضوع توجه فراوان داریم و تلاش می‌کنیم با ارائه زیرساخت لازم به مراکز ورزشی با یک سیستم هوشمند مدیریت، این امکان را برای مدیران مراکز ورزشی فراهم کنیم."
      />

      <ImageText
        image="/images/mobile-laptop.jpg"
        alt="سازمان‌ها ورزش می‌کنند"
        text={`تیم جیم پین از افرادی حرفه‌ای تشکیل شده است که دارای تجربه کافی در حوزه برنامه‌نویسی و مارکتینگ و ... هستند و با مشاوره افراد و مربیان حرفه‌ای این حوزه، روزانه برای توسعه این پلتفرم تلاش می‌کنند.

    کوشش ما برای ارائه خدمات ورزشی به سازمان‌ها با بالاترین کیفیت و بیشترین سرعت است که با بهره‌گیری از تکنولوژی‌های روز، تلاش می‌کنیم تا پلتفرمی با طراحی جذاب و کارآمد در اختیارشان قرار دهیم.`}
      />

      <div
        style={{
          marginBottom: 96,
        }}
      />
    </>
  );
}
