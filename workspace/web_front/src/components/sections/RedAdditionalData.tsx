import Image from "next/image";

import {JSX} from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function RedAdditionalData(): JSX.Element {
  return (
    <section>
      <div className="allCompanies ltr">
        <Grid
          container
          columns={7}
          sx={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Grid size={{ xs: 7, sm: 3 }}>
            <Image
              src="/images/bgex.jpg"
              alt="رفاهی ورزشی"
              width={1200}
              height={800}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>

          <Grid size={{ xs: 7, sm: 4 }}>
            <Card
              className="additionalCard rtl"
              elevation={0}
              sx={{
                m: 4,
                borderRadius: 3,
                p: 3,
              }}
            >
              <CardContent>
                <Typography
                  component="h2"
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  بدون محدودیت در اندازه سازمان یا شرکت
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 3,
                    textAlign: "justify",
                  }}
                >
                  جیم پین این فرصت را فراهم کرده تا سازمان‌ها با هر
                  تعداد پرسنل، بتوانند خدمات رفاهی خود را به شکلی
                  نوین مدیریت کرده و برای کارکنان خود دسترسی به
                  خدمات ورزشی ایجاد کنند.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
