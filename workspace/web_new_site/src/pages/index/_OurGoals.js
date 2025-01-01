import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, CardContent, Container, Typography} from "@mui/material";
import __SingleGoal from "./__SingleGoal";

const _OurGoals = () => {
    return (
        <section>
            <Container>
                <Grid sx={{pt:8}} container columns={16} alignContent={"center"} textAlign={"center"}>
                    {/*<Grid item size={16}>*/}
                    {/*    <Typography color={"primary"} sx={{fontWeight: 600, mt: 15, mb: 6}} variant={"h1"}>اهداف ما در جیم*/}
                    {/*        پین</Typography>*/}
                    {/*</Grid>*/}
                    <__SingleGoal image={"/assets/images/logo300.png"} title={"تخفیف های ویژه"} text={"جیم پین با ارائه بالاترین درصد تخفیف ها مناسب ترین قیمت هارا برای استفاده از خدمات ورزشی به کارکنان شرکت های همکار خود ارائه می دهد"} alt={"شرکت خود را هوشمند مدیریت کنید"}  />
                    <__SingleGoal image={"/assets/images/logo300.png"} title={"گزارش های اختصاصی"} text={"گزارش های عمومی و اختصاصی جیم پین راهنمای دقیق و کارامدی برای مدیران منابع انسانی در تصمیم گیری و سیاست گذاری شرکت ها است "} alt={"سازمان و ورزش پرسنل"} />
                    <__SingleGoal image={"/assets/images/logo300.png"} title={"عضویت رایگان"} text={"عضویت بدون هرینه و استفاده‌ی رایگان از خدمات جیم پین اجرای مسئولیت اجتماعی ما در راستای بالا بردن سطح سلامت جامعه است "} alt={"بودجه رفاهی "} />
                    <__SingleGoal image={"/assets/images/logo300.png"} title={"حفظ بودجه سازمان"} text={"بر خلاف روش های سنتی بودجه پرداختی سازمان به جیم پین، در صورت عدم استفاده کارمندان، ازبین نرفته و قابل اعتبار دهی مجدد است "} alt={"رفاهیات پرسنلی"} />

                </Grid>
            </Container>
        </section>
    );
};

export default _OurGoals;
