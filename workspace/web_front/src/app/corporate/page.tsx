import { JSX } from "react";
import type { Metadata } from "next";

import {
  Container,
  Grid,
  Typography,
} from "@mui/material";

import PageTitle from "@/components/sections/PageTitle";
import ImageText from "@/components/sections/ImageText";
import TextImage from "@/components/sections/TextImage";
import RoadMap from "@/components/sections/RoadMap";
import CorporateForm from "@/components/sections/CorporateForm";
import Boxes from "@/components/sections/Boxes";
import Boxes2 from "@/components/sections/Boxes2";
import VarietyMap from "@/components/sections/VarietyMap";

import {
  JsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

import {
  SITE_URL,
} from "@/lib/data/constants";

export const metadata: Metadata = {
  title: "سازمان‌ها و شرکت‌ها",
  description:
    "جیم پین رفاهیات ورزشی رایگان برای سازمان‌ها فراهم می‌کند: پنل اختصاصی مدیران، اپلیکیشن کارمندان و بدون هزینه اضافه برای سازمان.",
  alternates: {
    canonical: "/corporate",
  },
};

// Ported 1:1 from src/pages/corporate/Corporate.js
export default function CorporatePage(): JSX.Element {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          {
            name: "خانه",
            url: SITE_URL,
          },
          {
            name: "سازمان‌ها و شرکت‌ها",
            url: `${SITE_URL}/corporate`,
          },
        ])}
      />

      <PageTitle
        title="سازمان‌ها و شرکت‌ها"
        subtitle="سلامتی ارزشمند‌ترین سرمایه است"
      />

      <section>
        <Container>
          <Grid
            sx={{
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography>
              ما در جیم پین دو مانع بزرگ کارمندان در مسیر ورزش کردن را از سر
              راه برداشته‌ایم
            </Typography>

            <Typography>
              مشکل فاصله‌ی مراکز ورزشی از محل زندگی کارمند و مشکل کم‌تنوعی
              ورزش‌ها
            </Typography>

            <Typography>
              ما در حال حاضر با تعداد زیادی مجموعه ورزشی مشغول به همکاری هستیم
              که این تعداد روزانه در حال افزایش است
            </Typography>
          </Grid>
        </Container>
      </section>

      <Boxes />

      <ImageText
        image="/images/milad-laptop1.jpg"
        alt="ورزش در سازمان مهم‌ترین عامل رشد است"
        title="پنل اختصاصی مدیران و مدیران منابع انسانی"
        text="جیم پین یک استارتاپ فعال در حوزه ورزش و سلامت است که با هدف ترویج فعالیت‌های بدنی و بهبود سلامتی، از سال 1400 شروع به فعالیت نموده است. ما در جیم پین به ارائه خدمات، معرفی و رزرو مراکز ورزشی به صورت آنلاین برای شرکت‌ها و سازمان‌ها اهتمام داریم. هدف ما ایجاد فضایی راحت و مطمئن برای پیداکردن و انجام فعالیت‌های ورزشی است."
      />

      <TextImage
        image="/images/appuser2.jpg"
        alt="جیم پین پل ارتباطی سازمان‌ها و ورزش"
        title="اپلیکیشن اختصاصی کارمندان و پرسنل سازمان‌ها"
        text="ما اعتقاد داریم که ورزش یکی از راهکارهای بسیار مهم در بهبود سلامتی و روحیه افراد است. در جیم پین به این موضوع توجه فراوان داریم و تلاش می‌کنیم با ارائه زیرساخت لازم به مراکز ورزشی با یک سیستم هوشمند مدیریت این امکان را برای مدیران مراکز ورزشی فراهم کنیم."
      />

      <RoadMap />
      <CorporateForm />
      <Boxes2 />
      <VarietyMap />
    </>
  );
}
