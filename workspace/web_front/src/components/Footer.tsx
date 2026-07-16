import Link from "next/link";
import Image from "next/image";

import {Grid, IconButton, Typography} from "@mui/material";

import {
  Instagram,
  LinkedIn,
  Telegram,
  WhatsApp,
} from "@mui/icons-material";
import {JSX} from "react";

export default function Footer(): JSX.Element {
  return (
      <footer>
        <Grid container sx={{
          alignItems: "flex-start",
        }} columns={80}>
          <Grid
              size={{ xs: 40, md: 15, xl: 15 }}
              sx={{
                justifyItems: 'center',
              }}
          >
            <ul>
              جیم پین
              <li>
                <Link href="/about">آشنایی با جیم پین</Link>
              </li>
              <li>
                <Link href="/blog">وبلاگ</Link>
              </li>
              <li>
                <Link href="/contact">تماس با ما</Link>
              </li>
            </ul>
          </Grid>

          <Grid
              size={{ xs: 40, md: 15, xl: 15 }}
              sx={{justifyItems:"center"}}
          >
            <ul>
              خدمات
              <li>
                <Link href="#intro">ثبت نام سازمان‌ها</Link>
              </li>
              <li>
                <a
                    href="https://apps.gympin.ir"
                    target="_blank"
                    rel="noreferrer"
                >
                  ورود به اپلیکیشن‌ها
                </a>
              </li>
              <li>
                <Link href="/corporate">سازمان‌ها و شرکت‌ها</Link>
              </li>
            </ul>
          </Grid>

          <Grid
              size={{ xs: 80, md: 15, xl: 15 }}

              sx={{justifyItems:"center"}}
          >
            <ul>
              سیاست‌های پلتفرم
              <li>
                <Link href="/term-and-conditions">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="/faq">سوالات متداول</Link>
              </li>
            </ul>
          </Grid>

          <Grid size={{ xs: 80, md: 5, xl: 5 }} />

          <Grid size={{ xs: 80, md: 30, xl: 30 }}>
            <Grid
                container
                columns={4}
                sx={{justifyContent:"center",alignContent:"center"}}
            >
              <Grid
                  size={{ xs: 2, md: 1, xl: 1 }}
                  sx={{ px: 1, py: 4 ,textAlign:"center"}}
              >
                <Image
                    src="/images/anjoman.jpg"
                    alt="انجمن صنفی کسب و کار‌های اینترنتی"
                    className="footer-li-img"
                    width={120}
                    height={120}
                    loading="lazy"
                />
              </Grid>

              <Grid
                  size={{ xs: 2, md: 1, xl: 1 }}
                  sx={{ px: 1, py: 4 ,textAlign:"center"}}
              >
                <Image
                    src="/images/dargah-moj.jpg"
                    alt="درگاه ملی مجوز‌ها"
                    className="footer-li-img"
                    width={120}
                    height={120}
                    loading="lazy"
                />
              </Grid>

              <Grid
                  size={{ xs: 2, md: 1, xl: 1 }}
                  sx={{ px: 1, py: 4 ,textAlign:"center"}}
              >
                <Image
                    src="/images/etehadie.jpg"
                    alt="اتحادیه کسب و کار‌های کشوری"
                    className="footer-li-img"
                    width={120}
                    height={120}
                    loading="lazy"
                />
              </Grid>

              <Grid
                  size={{ xs: 2, md: 1, xl: 1 }}
                  sx={{ px: 1, py: 4 ,textAlign:"center"}}
              >
                <a
                    href="https://trustseal.enamad.ir/?id=530057&Code=fPUbicgi3RqAfY4GyUD0UQYpJYadZKYf"
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="origin"
                >
                  <Image
                      src="https://trustseal.enamad.ir/logo.aspx?id=530057&Code=fPUbicgi3RqAfY4GyUD0UQYpJYadZKYf"
                      alt="نشان اینماد وبسایت جیم پین"
                      className="enamad"
                      width={120}
                      height={120}
                      loading="lazy"
                      unoptimized
                  />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className="copyright">
          <Grid size={8}>
            <Typography
                variant="overline"
                sx={{ fontSize: "0.75rem" }}
            >
              {" تمامی‌حقوق این وبسایت متعلق به شرکت "}
            </Typography>

            <Typography
                variant="overline"
                color="primary"
                sx={{ fontSize: "0.75rem" }}
            >
              {" پیشگامان فناوری داده نوتریکا © "}
            </Typography>

            <Typography
                variant="overline"
                sx={{ fontSize: "0.75rem" }}
            >
              {"می‌باشد."}

            </Typography>
          </Grid>

          <Grid
              size={4}
              sx={{ direction: "rtl" }}
          >
            <IconButton
                size="small"
                sx={{ mx: 0.5 }}
                href="https://wa.me/+989221496746"
            >
              <WhatsApp />
            </IconButton>

            <IconButton
                size="small"
                sx={{ mx: 0.5 }}
                href="https://t.me/gympin_info"
            >
              <Telegram />
            </IconButton>

            <IconButton
                size="small"
                sx={{ mx: 0.5 }}
                href="https://www.linkedin.com/company/gympintdp"
            >
              <LinkedIn />
            </IconButton>

            <IconButton
                size="small"
                sx={{ mx: 0.5 }}
                href="https://www.instagram.com/gympin_ir"
            >
              <Instagram />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container sx={{ minHeight: "10px" }} />
      </footer>
  );
}
