import { JSX } from "react";

import {
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface SingleBoxProps {
  image: string;
  title: string;
  text: string;
  alt: string;
}

function SingleBox({
  image,
  title,
  text,
  alt,
}: SingleBoxProps): JSX.Element {
  return (
    <Grid size={{ md: 3, xs: 9 }}>
      <Card
        elevation={10}
        sx={{
          m: "2vw",
          bgcolor: "#f5ede0",
          borderRadius: 4,
        }}
      >
        <Grid
          sx={{
              display:"flex",
              flexDirection:"column",
            p: 3,
          }}
        >
          <img
            src={image}
            alt={alt}
            width="60%"
          />

          <Typography
            component="h3"
            variant="h5"
            sx={{
              fontWeight: 600,
              mt: 1,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 400,
              mt: 2,
              mb: 1,
              minHeight: 105,
            }}
          >
            {text}
          </Typography>
        </Grid>
      </Card>
    </Grid>
  );
}

export default function Boxes2(): JSX.Element {
  return (
    <section>
      <Container>
        <Grid
          container
          columns={9}
          className="box2"
          sx={{
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <SingleBox
            text="تخفیفات متنوع و متغیر روزانه استفاده از خدمات و ورزش‌های مختلف را برای همه پرسنل سازمان‌ها امکان‌پذیر کرده است."
            title="تخفیفات شگفت‌انگیز"
            image="/images/strongman1.jpg"
            alt="تخفیفات شگفت‌انگیز"
          />

          <SingleBox
            text="تنوع ورزشی بالا در جیم پین به کارمندان کمک می‌کند تا ورزش‌های جدید را امتحان کرده و ورزش مورد علاقه خود را پیدا کنند."
            title="تنوع ورزشی بسیار زیاد"
            image="/images/inhand1.jpg"
            alt="تنوع ورزشی بسیار زیاد"
          />

          <SingleBox
            text="جیم پین به سازمان‌ها این امکان را می‌دهد که از خدمات ورزشی بهره‌مند شوند، بدون اینکه هزینه اضافه‌ای برای آن‌ها ایجاد شود."
            title="بدون هزینه برای سازمان"
            image="/images/savemoney1.jpg"
            alt="بدون هزینه برای سازمان"
          />
        </Grid>
      </Container>
    </section>
  );
}
