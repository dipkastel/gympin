import { JSX } from "react";

import {
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Instagram,
  LinkedIn,
  Telegram,
  WhatsApp,
} from "@mui/icons-material";

export default function ContactData(): JSX.Element {
  return (
      <section>
        <Container>
          <Grid container columns={9}>
            <Grid
                size={{ md: 3, xs: 9 }}
                sx={{ p: 2 }}
            >
              <img
                  src="/images/support-man.jpg"
                  alt="ورزش‌های اثر بخش بر سلامتی با دیسک کمر"
                  className="apps-img2"
              />
            </Grid>

            <Grid
                size={{ md: 6, xs: 9 }}
                sx={{ p: 2 }}
            >
              <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    mb: 1,
                    mt: 2,
                  }}
              >
                اطلاعات تماس :
              </Typography>

              <div>
                <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "2rem",
                      fontWeight: 600,
                    }}
                >
                  آدرس :
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "2rem",
                      fontWeight: 400,
                    }}
                >
                  {" "}
                  تهران - نارمک جنوبی - پلاک ۴۱۶
                </Typography>
              </div>

              <div>
                <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "2rem",
                      fontWeight: 600,
                    }}
                >
                  تماس با جیم پین :
                </Typography>
              </div>

              <div>
                <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "2rem",
                      fontWeight: 600,
                    }}
                >
                  تلفن :
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "2rem",
                      fontWeight: 400,
                    }}
                >
                  ۰۲۱۲۸۴۲۴۱۹۰
                </Typography>
              </div>

              <div>
                <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "2rem",
                      fontWeight: 600,
                    }}
                >
                  ایمیل :
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "2rem",
                      fontWeight: 400,
                    }}
                >
                  {" "}
                  info@gympin.ir
                </Typography>
              </div>

              <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    mt: 4,
                    mb: 1,
                  }}
              >
                رسانه‌ها :
              </Typography>

              <div>
                <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                >
                  ما را در رسانه‌های اجتماعی دنبال کنید تا
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                >
                  از آخرین اخبار و رویدادها باخبر شوید :
                </Typography>

                <Grid
                    size={{md:4}}
                    sx={{
                      direction: "rtl",
                      mt: 1,
                    }}
                >
                  <IconButton
                      size="small"
                      href="https://wa.me/+989221496746"
                      sx={{ mx: 0.5 }}
                  >
                    <WhatsApp
                        sx={{ fontSize: "2rem" }}
                    />
                  </IconButton>

                  <IconButton
                      size="small"
                      href="https://t.me/gympin_info"
                      sx={{ mx: 0.5 }}
                  >
                    <Telegram
                        sx={{ fontSize: "2rem" }}
                    />
                  </IconButton>

                  <IconButton
                      size="small"
                      href="https://www.linkedin.com/company/gympintdp"
                      sx={{ mx: 0.5 }}
                  >
                    <LinkedIn
                        sx={{ fontSize: "2rem" }}
                    />
                  </IconButton>

                  <IconButton
                      size="small"
                      href="https://www.instagram.com/gympin_ir"
                      sx={{ mx: 0.5 }}
                  >
                    <Instagram
                        sx={{ fontSize: "2rem" }}
                    />
                  </IconButton>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
  );
}
