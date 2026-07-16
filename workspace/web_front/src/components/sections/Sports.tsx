import { JSX } from "react";

import {
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface SportItemProps {
  title: string;
  alt: string;
  image: string;
  text: string;
  size: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

function SportItem({
  title,
  alt,
  image,
  text,
  size,
}: SportItemProps): JSX.Element {
  return (
    <Grid
      size={size}
      sx={{
        justifyItems: "center",
      }}
    >
      <Card
        className="sportCard"
        elevation={3}
        sx={{
          borderRadius: 3,
        }}
      >
        <img
          className="bgImage"
          src={image}
          alt={alt}
        />

        <div className="overlay">
          <Grid
            container
            columns={12}
          >
            <Grid
              size={2}
              sx={{
                pt: 2,
                textAlign: "center",
              }}
            >
              <img
                className="shape"
                src="/images/shape3.svg"
                alt=""
              />
            </Grid>

            <Grid
              size={10}
              direction="row"
            >
              <Grid>
                <Typography className="title">
                  {title}
                </Typography>
              </Grid>

              <Grid>
                <Typography className="description">
                  {text}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
    </Grid>
  );
}

export default function Sports(): JSX.Element {
  const size: SportItemProps["size"] = {
    xs: 3,
    sm: 3,
    md: 2,
    xl: 2,
  };

  return (
    <section>
      <Container>
        <Grid
          container
          columns={6}
          sx={{
            mb: 8,
            mt: 12,
          }}
        >
          <SportItem
            size={size}
            image="/images/estakhr.jpg"
            alt="ورزش‌های آبی که برای کارمندان ایجاد نشاط می‌کند"
            title="ورزش‌های آبی"
            text="قدرت و شادابی را در دل آب پیدا کنید! با ورزش‌های آبی، تغییرات مثبت را در بدن و ذهن خود تجربه کنید و توانایی‌های خود را افزایش دهید."
          />

          <SportItem
            size={size}
            image="/images/bodybuilding.jpg"
            alt="ورزش‌هایی که برای عموم مردم جذاب است"
            title="باشگاه‌های بدنسازی"
            text="هر بار که به باشگاه می‌آیید، یک قدم به هدف‌های خود نزدیک‌تر می‌شوید! هر تمرین فرصتی برای ایجاد تغییر و تحول است."
          />

          <SportItem
            size={size}
            image="/images/shamshir.jpg"
            alt="پدل برد ورزش مورد علاقه مدیران"
            title="ورزش‌های رزمی"
            text="آماده‌اید تا مرزهای خود را بشکنید؟ با ورزش‌های رزمی، هر جلسه تمرین فرصتی برای ارتقای مهارت‌ها و تقویت روحیه‌تان است."
          />

          <SportItem
            size={size}
            image="/images/zorkhane.jpg"
            alt="از زورخانه تا پارکور، آرامش تا هیجان"
            title="ورزش‌های برگزیده"
            text="هر ورزشی که انتخاب کنید، فرصتی برای کشف قدرت‌های نهفته شماست! بیایید با هم به سمت موفقیت‌های بزرگ‌تر حرکت کنیم."
          />

          <SportItem
            size={size}
            image="/images/padel.jpg"
            alt="تفریحاتی برای ایجاد انرژی و انگیزه"
            title="ورزش‌های تفریحی"
            text="ورزش را به یک ماجراجویی تبدیل کنید! با فعالیت‌های تفریحی، استرس را کنار بگذارید و از هر لحظه لذت ببرید."
          />

          <SportItem
            size={size}
            image="/images/spa.jpg"
            alt="آرامش و حس خوب برای کارمندان"
            title="ماساژ و اسپا"
            text="با خدمات اسپا و ماساژ، به بدن و ذهن خود یک هدیه ویژه بدهید! احساس آرامش و تازگی را با هر لمس تجربه کنید."
          />

          <SportItem
            size={size}
            image="/images/analiz-badan.jpg"
            alt="آنالیز بدن"
            title="آنالیز بدن"
            text="از بدن خود اطلاعات بیشتری به دست بیاورید و با ورزش مناسب از بیماری‌ها جلوگیری کنید."
          />

          <SportItem
            size={size}
            image="/images/harakate-eslahi.jpg"
            alt="حرکات اصلاحی"
            title="حرکات اصلاحی"
            text="عموماً کارمندان پشت‌میزنشین دچار گرفتگی‌های عضلانی و بیماری‌های مفصلی می‌شوند که بهترین درمان برای آنان حرکات اصلاحی است."
          />

          <SportItem
            size={size}
            image="/images/toopi.jpg"
            alt="ورزش‌های گروهی و تیمی"
            title="ورزش‌های گروهی"
            text="با ورزش‌های گروهی احساس تعامل و همکاری در گروه‌ها بیشتر شده و در کارهای گروهی موفقیت بیشتری به دست می‌آورند."
          />
        </Grid>
      </Container>
    </section>
  );
}
