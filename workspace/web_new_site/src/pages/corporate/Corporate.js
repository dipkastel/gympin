import React from 'react';
import _ImageText from "../partials/_ImageText";
import _TextImage from "../partials/_TextImage";
import _RoadMap from "./_RoadMap";
import _CorporateForm from "./_CorporateForm";
import _Boxes from "./_Boxes";
import _PageTitle from "../partials/_PageTitle";
import {Container, Typography} from "@mui/material";
import _Boxes2 from "./_Boxes2";
import _video from "./_Video";
import Grid from "@mui/material/Grid2";
import _VarietyMap from "./_VarietyMap";

const Corporate = () => {
    return (
        <>
            <_PageTitle title={"سازمان‌ها و شرکت‌ها"} subtitle={"سلامتی ارزشمند ترین سرمایه است"} />
            <section>
                <Container>
                    <Grid  sx={{p:2}} textAlign={"center"}>
                        <Typography >ما در جیم پین دو مانع بزرگ کارمندان در مسیر ورزش کردن را از سر راه برداشته ایم</Typography>
                        <Typography > مشکل فاصله‌ی مراکز ورزشی از محل زندگی کارمند و مشکل کم تنوعی ورزش‌ها</Typography>
                        <Typography > ما در حال حاضر با تعداد زیادی مجوعه ورزشی مشغول به همکاری هستیم که این تعداد روزانه در حال افزایش است</Typography>
                    </Grid>
                </Container>
            </section>
            <_Boxes />
            <_video />
            <_ImageText image={"/assets/images/milad-laptop1.jpg"} alt={"ورزش در سازمان مهم ترین عامل رشد است"} title={"پنل اختصاصی مدیران و مدیران منابع انسانی"} text={"جیم پین یک استارتاپ فعال در حوزه ورزش و سلامت است که با هدف ترویج فعالیت‌های بدنی و بهبود سلامتی، از سال 1400 شروع به فعالیت نموده است. ما در جیم پین به ارائه خدمات، معرفی و رزرو مراکز ورزشی به صورت آنلاین برای شرکت‌ها و سازمان‌ها اهتمام داریم. هدف ما ایجاد فضایی راحت و مطمئن برای پیداکردن و انجام فعالیت‌های ورزشی است."} />
            <_TextImage image={"/assets/images/appuser2.jpg"} alt={"جیم پین پل ارتباطی سازمان‌ها و ورزش"} title={"اپلیکیشن اختصاصی کارمندان و پرسنل سازمان‌ها"} text={"ما اعتقاد داریم که ورزش یکی از راهکارهای بسیار مهم در بهبود سلامتی و روحیه افراد است. در جیم پین به این موضوع توجه فراوان داریم و تلاش می‌کنیم با ارائه زیرساخت لازم به مراکز ورزشی با یک سیستم هوشمند مدیریت این امکان را برای مدیران مراکز ورزشی فراهم کنیم."} />
            <_RoadMap />
            <_CorporateForm />
            <_Boxes2 />
            <_VarietyMap />
        </>
    );
};

export default Corporate;
