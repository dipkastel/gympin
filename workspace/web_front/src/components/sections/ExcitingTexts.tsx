import { Card, Typography, Grid } from "@mui/material";
import {JSX} from "react";

interface Stat {
  text: string;
  href: string;
  label: string;
}

const stats: Stat[] = [
  {
    text: "150 دقیقه فعالیت بدنی متوسط در هفته، می‌تواند در درمان افسردگی های خفیف تا متوسط، به اندازه دارو های ضد افسردگی تاثیرگذار باشد.",
    href: "/blog/15-مطالعات-جدید-و-تاثیر-ورزش-بر-افسردگی",
    label: "[ 1 ]",
  },
  {
    text: "سرمایه‌گذاری سازمان‌ها روی سلامت کارمندان، بازگشت سرمایه را در بیش از یک شکل به همراه دارد و 90% سازمان‌ها نرخ مثبت بازگشت را گزارش کرده‌اند.",
    href: "/blog/40-سه-دلیل-در-اثبات-اینکه-رفاهیات-سازمانی-صرفه-جویی-در-هزینه-هاست",
    label: "[ 2 ]",
  },
  {
    text: "در نظر گرفتن بودجه ورزشی از سمت سازمان، به کارمندان احساس ارزشمند بودن می‌دهد و باعث کاهش روزهای غیبت از کار و نرخ خروج از سازمان می‌شود.",
    href: "/blog/39-مزایای-رفاهیات-سازمانی-تخصصی-افزایش-سودآوری-و-حفظ-کارکنان",
    label: "[ 3 ]",
  },
];

export default function ExcitingTexts(): JSX.Element {
  return (
    <section>
      <Grid
        container
        columns={3}
        className="excitingBlock"
        sx={{
          alignItems: "center",
          textAlign: "center",
          alignContent: "space-around",
        }}
      >
        {stats.map((stat: Stat, index: number) => (
          <Grid
            key={stat.href}
            size={{ xs: 3, sm: 1 }}
          >
            <Card
              className="text"
              elevation={3}
              sx={{
                mx: 3,
                my: 5,
                p: 2,
                bgcolor: "#eae8e9",
                borderRadius: 3,
              }}
            >
              <Typography component="span" variant="subtitle2">
                {stat.text}
              </Typography>

              <Typography
                component="a"
                href={stat.href}
                color="primary"
                variant="subtitle2"
              >
                {" " + stat.label + " "}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

