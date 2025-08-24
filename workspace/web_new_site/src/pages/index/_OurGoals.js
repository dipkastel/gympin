import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, CardContent, Container, Typography} from "@mui/material";
import __SingleGoal from "./__SingleGoal";

const _OurGoals = () => {
    return (
        <section  >
            <Container>
                <Grid sx={{pb:12,pt:12}} container columns={16} alignContent={"center"} textAlign={"center"} justifyItems={"center"}>
                    {/*<Grid item size={16}>*/}
                    {/*    <Typography color={"primary"} sx={{fontWeight: 600, mt: 15, mb: 6}} variant={"h1"}>اهداف ما در جیم*/}
                    {/*        پین</Typography>*/}
                    {/*</Grid>*/}
                    <__SingleGoal Aos={"fade-left"} image={"/assets/images/takhfif.svg"} title={"تخفیف‌های ویژه"} text={"جیم پین با ارائه بالاترین درصد تخفیف‌ها، مناسب ترین قیمت‌ها را برای استفاده از خدمات، به کارکنان شرکت‌های همکار خود ارائه می‌دهد."} alt={"شرکت خود را هوشمند مدیریت کنید"}  />
                    <__SingleGoal Aos={"fade-left"} image={"/assets/images/reports.svg"} title={"گزارش‌های اختصاصی"} text={"گزارش‌های عمومی ‌و اختصاصی جیم پین راهنمایی دقیق و کارامد، برای مدیران منابع انسانی در سیاست گذاری شرکت‌ها است."} alt={"سازمان و ورزش پرسنل"} />
                    <__SingleGoal Aos={"fade-left"} image={"/assets/images/free.svg"} title={"عضویت رایگان"} text={"عضویت بدون هزینه و استفاده‌ی رایگان از خدمات جیم پین، اجرای مسئولیت اجتماعی ما در راستای بالا بردن سطح سلامت جامعه است."} alt={" حفظ بودجه رفاهی "} />
                    <__SingleGoal Aos={"fade-left"} image={"/assets/images/save-money.svg"} title={"حفظ بودجه سازمان"} text={"بر خلاف روش‌های سنتی بودجه پرداختی سازمان به جیم پین، در صورت عدم استفاده کارمندان، ازبین نرفته و قابل اعتبار دهی مجدد است."} alt={"رفاهیات پرسنلی"} />

                </Grid>
            </Container>
        </section>
    );
};

export default _OurGoals;
