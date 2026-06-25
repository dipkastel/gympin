import React from 'react';
import Grid from "@mui/material/Grid2";
import {Container, Typography} from "@mui/material";

const _Apps = () => {
    return (
        <section >
            <Container>
                <Grid sx={{mt:16}} container columns={4} alignContent={"center"} textAlign={"center"}  data-aos="fade-up">
                    <Grid item size={4}>
                        <Typography color={"primary"} sx={{fontWeight: 600, mb: 3}} variant={"h1"}>اپلیکیشن‌های اختصاصی</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{direction: "ltr"}} columns={4} alignContent={"center"} textAlign={"right"}>
                    <Grid sx={{p: 3}} item size={{md: 2, xs: 4}} data-aos="zoom-in-up">
                        <img alt={"اپلیکیشن اختصاصی شرکت‌ها"} className={"apps-img"} src={"/assets/images/corporatelaptop.jpg"}/>
                    </Grid>
                    <Grid sx={{px: 6, direction: "rtl"}} item size={{md: 2, xs: 4}} data-aos="zoom-in">
                        <Typography sx={{fontWeight: 600, mt: 8}} variant={"h5"}>داشبورد اختصاصی سازمان‌</Typography>
                        <Typography sx={{fontWeight: 400, mt: 2, mb: 0, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>داشبورد
                            اختصاصی سازمان‌ در جیم پین، ابزاری جامع برای مدیریت فعالیت‌های کارکنان و تخصیص اعتبار به آن‌ها است.
                            این پنل امکان دسته‌بندی پرسنل و ارائه مشوق‌های مالی را فراهم می‌کند. همچنین، مدیران می‌توانند اعتبارها را به افراد جدید انتقال
                            دهند یا دسترسی کارکنان را مسدود سازند.
                        </Typography>
                        <Typography sx={{fontWeight: 400, mt: 0, mb: 0, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}> اعتبارهای
                            استفاده ‌نشده از بین نمی‌رود و مجدداً قابل استفاده می‌باشد. به‌طور کلی، این داشبورد بار کاری مدیران منابع انسانی را کاهش داده به و مدیریت هزینه‌ها
                            کمک می‌کند.
                        </Typography>

                        {/*<Typography sx={{fontWeight: 400, mt: 0, mb: 0,lineHeight:2, textAlign: "justify"}} variant={"subtitle2"}>*/}
                        {/*    <ul>*/}
                        {/*        <li>مشاهده‌ی فعالیت‌های کارمندان بر روی پنل و رهگیری اعتبار‌ها</li>*/}
                        {/*        <li>دسته بندی کارمندان و اعتبار دهی فردی یا گروهی برای تشویق</li>*/}
                        {/*        <li>کارت هدیه‌ی مخصوص مراکز ورزشی برای مناسبت‌ها</li>*/}
                        {/*        <li>کاهش اعتبار یا مسدود کردن دسترسی پرسنل</li>*/}
                        {/*        <li>پاسخگویی و پشتیانی کامل</li>*/}
                        {/*    </ul>*/}
                        {/*</Typography>*/}
                    </Grid>
                </Grid>
                <Grid container columns={4} alignContent={"center"} textAlign={"right"} >
                    <Grid sx={{p: 3}} item size={{md: 2, xs: 4}} data-aos="zoom-in">
                            <img alt={"اپلیکیشن اختصاصی شرکت‌ها"} className={"apps-img"} src={"/assets/images/appuser.jpg"}/>
                    </Grid>
                    <Grid sx={{px: 6}} item size={{md: 2, xs: 4}} data-aos="zoom-in-up">
                        <Typography sx={{fontWeight: 600, lineHeight: 2, mt: 8}} variant={"h5"}>اپلیکیشن اختصاصی کارمندان</Typography>
                        <Typography sx={{fontWeight: 400, mt: 2, mb: 3, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>اپلیکیشن
                            کارمندان یک
                            ابزار کارآمد و چند منظوره است که در آن کارمندان از طریق حساب کاربری خود می‌توانند تمامی‌ اطلاعات لازم درباره‌ی
                            مجموعه‌های ورزشی و امکانات آنها را کسب کنند. این اپلیکیشن دارای امکاناتی مانند:
                            مشاهده‌ی عکس‌ها و امکانات مجموعه‌های ورزشی طرف قرارداد، رشته ی‌های ورزشی هر مجموعه و روز و ساعت برگزاری
                            هر کلاس، آدرس مراکز ورزشی بر روی نقشه، امکان جستجوی نزدیکترین مراکز ورزشی و مسیریابی، رزرو کلاس‌ها هماهنگی
                            قبل از خرید، پاسخگویی و پشتیانی کامل است.</Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{direction: "ltr"}} columns={4} alignContent={"center"} textAlign={"right"}>
                    <Grid sx={{p: 3}} item size={{md: 2, xs: 4}} data-aos="zoom-in-up">
                        <img alt={"اپلیکیشن اختصاصی شرکت‌ها"} className={"apps-img"} src={"/assets/images/place-application.jpg"}/>
                    </Grid>
                    <Grid sx={{px: 6, direction: "rtl"}} item size={{md: 2, xs: 4}} data-aos="zoom-in">
                        <Typography sx={{fontWeight: 600, mt: 8}} variant={"h5"}>پنل اختصاصی مراکز ورزشی</Typography>
                        <Typography sx={{fontWeight: 400, mt: 0, mb: 3, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>
                            این پنل در راستای سهولت به‌روزرسانی اطلاعات مجموعه های ورزشی، مدیریت فروش و شفافیت در بخش مالی ایجاد شده است.
                        </Typography>
                        <Typography sx={{fontWeight: 400, mt: 2, mb: 1, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>پنل
                            اختصاصی مراکز ورزشی
                            جیم پین دارای امکاناتی مانند: به‌روزرسانی قیمت‌ها، ویرایش بلیط‌ها، به‌روزرسانی اطلاعات مجموعه و اعلام تغییرات
                            است. همچنین بخش مالی شفاف و آسان، امکان اسکن بلیط و مشاهده بلیط‌های فروخته شده از دیگر امکانات این پنل می
                            باشد.</Typography>
                    </Grid>
                </Grid>
            </Container>

        </section>
    );
};

export default _Apps;
