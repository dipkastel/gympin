import { JSX } from "react";

import {
  Container,
  Grid,
} from "@mui/material";

import SingleGoal from "./SingleGoal";

export default function OurGoals(): JSX.Element {
  return (
    <section>
      <Container>
        <Grid
          container
          columns={16}
          sx={{
            pb: 12,
            pt: 12,
            alignContent: "center",
            textAlign: "center",
            justifyItems: "center",
          }}
        >
          <SingleGoal
            image="/images/takhfif.svg"
            title="تخفیف‌های ویژه"
            text="جیم پین با ارائه بالاترین درصد تخفیف‌ها، مناسب ترین قیمت‌ها را برای استفاده از خدمات، به کارکنان شرکت‌های همکار خود ارائه می‌دهد."
            alt="شرکت خود را هوشمند مدیریت کنید"
          />

          <SingleGoal
            image="/images/reports.svg"
            title="گزارش‌های اختصاصی"
            text="گزارش‌های عمومی‌ و اختصاصی جیم پین راهنمایی دقیق و کارامد، برای مدیران منابع انسانی در سیاست گذاری شرکت‌ها است."
            alt="سازمان و ورزش پرسنل"
          />

          <SingleGoal
            image="/images/free.svg"
            title="عضویت رایگان"
            text="عضویت بدون هزینه و استفاده‌ی رایگان از خدمات جیم پین، اجرای مسئولیت اجتماعی ما در راستای بالا بردن سطح سلامت جامعه است."
            alt="حفظ بودجه رفاهی"
          />

          <SingleGoal
            image="/images/save-money.svg"
            title="حفظ بودجه سازمان"
            text="بر خلاف روش‌های سنتی، بودجه پرداختی سازمان به جیم پین، در صورت عدم استفاده کارمندان، از بین نرفته و قابل اعتبار دهی مجدد است."
            alt="رفاهیات پرسنلی"
          />
        </Grid>
      </Container>
    </section>
  );
}
