import {JSX} from "react";
import { Paper, Typography,Grid } from "@mui/material";

export default function TextBox(): JSX.Element {
  return (
    <section>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          my: 3,
          background: "#f0f0f0",
        }}
      >
        <Grid
          sx={{
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#656565",
            }}
          >
            ما در جیم پین دو مانع بزرگ کارمندان در مسیر ورزش کردن را
            از سر راه برداشته‌ایم:
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#656565",
            }}
          >
            مشکل فاصله‌ی مراکز ورزشی از
            <b style={{ color: "#000000" }}>
              {" "}
              محل زندگی کارمندان{" "}
            </b>
            و مشکل
            <b style={{ color: "#000000" }}>
              {" "}
              عدم تنوع رشته‌های ورزشی.
            </b>
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#656565",
            }}
          >
            ما در حال حاضر با تعداد زیادی از مجموعه‌های ورزشی مشغول به
            همکاری هستیم که این تعداد همواره در حال بررسی و افزایش
            است.
          </Typography>
        </Grid>
      </Paper>
    </section>
  );
}
