import {JSX} from "react";
import Image from "next/image";
import {Container, Grid, Typography} from "@mui/material";
import IntroForm from "./IntroForm";

export default function IntroSection(): JSX.Element {
  return (
    <section id="intro">
      <Container className="rtl">
        <Grid
          container
          sx={{alignItems:"center",alignContent:"center",justifyContent:"center"}}
        >
          <Grid
            className="text-intro rtl"
            size={{ md: 6, xs: 12 }}
          >

              <Typography variant="h1" color="primary" sx={{display: "inline", fontWeight: "700"}}> جیم پین </Typography>
              <Typography variant="h1" sx={{display: "inline", fontWeight: "700"}}>چیست؟</Typography>
              <Typography variant="body2" sx={{fontWeight: 500, mt: 4, lineHeight: 2, textAlign: "justify"}}>
                  جیم پین در حوزه رفاهیات پرسنل، به طور اختصاصی ورزش و سلامت کارمندان فعالیت می‌کند و پل ارتباطی شرکت‌ها و مراکز
                  ورزشی است. جیم پین با شبکه گسترده ای از مراکز ورزشی همکاری می‌کند تا کارمندان شرکت‌های طرف قرارداد، در هر نقطه
                  از شهر به مراکز ورزشی، دسترسی ارزان و آسان داشته باشند؛ این مراکز ورزشی دارای پراکندگی محاسبه شده بر روی نقشه و
                  همچنین رشته‌های بسیار متنوع هستند.
              </Typography>
            <IntroForm />
          </Grid>

          <Grid
            className="fx-into"
            size={{ md: 6, xs: 12 }}
          >
            <Image
              src="/images/main-img.jpg"
              alt="رفاهی ورزشی کارمندان سازمان‌ها"
              width={1200}
              height={800}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

