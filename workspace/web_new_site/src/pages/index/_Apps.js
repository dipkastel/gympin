import React from 'react';
import Grid from "@mui/material/Grid2";
import {Container, Typography} from "@mui/material";

const _Apps = () => {
    return (
        <section>
            <Container>
                <Grid container columns={4} alignContent={"center"} textAlign={"center"}>
                    <Grid item size={4}>
                        <Typography color={"primary"} sx={{fontWeight: 600, mb: 3}} variant={"h1"}>اپلیکیشن‌های اختصاصی</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{direction: "ltr"}} columns={4} alignContent={"center"} textAlign={"right"}>
                    <Grid sx={{p: 3}} item size={{md: 2, xs: 4}}>
                        <img alt={"اپلیکیشن اختصاصی شرکت‌ها"} className={"apps-img"} src={"/assets/images/corporatelaptop.jpg"}/>
                    </Grid>
                    <Grid sx={{px: 6, direction: "rtl"}} item size={{md: 2, xs: 4}}>
                        <Typography sx={{fontWeight: 600, mt: 8}} variant={"h5"}>پنل اختصاصی سازمان‌ها و شرکت‌ها</Typography>
                        <Typography sx={{fontWeight: 400, mt: 2, mb: 0, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>پنل
                            اختصاصی سازمان‌ها و شرکت‌ها در جیم پین، ابزاری جامع برای مدیریت فعالیت‌های کارکنان و تخصیص اعتبار به آن‌ها است.
                            این پنل امکان دسته‌بندی پرسنل و ارائه مشوق‌های مالی را فراهم می‌کند. همچنین، مدیران می‌توانند این اعتبارات را کاهش
                            دهند یا دسترسی کارکنان را مسدود سازند.
                        </Typography>
                        <Typography sx={{fontWeight: 400, mt: 0, mb: 0, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}> اعتبارات
                            استفاده ‌نشده از بین نمی‌رود و قابل استفاده مجدد می‌باشد. به‌طور کلی، این پنل به بهینه‌سازی مدیریت منابع انسانی و کنترل هزینه‌ها
                            کمک می‌کند.
                        </Typography>

                        {/*<Typography sx={{fontWeight: 400, mt: 0, mb: 0,lineHeight:2, textAlign: "justify"}} variant={"subtitle2"}>*/}
                        {/*    <ul>*/}
                        {/*        <li>مشاهده ی فعالیت‌های کارمندان بر روی پنل و رهگیری اعتبار‌ها</li>*/}
                        {/*        <li>دسته بندی کارمندان و اعتبار دهی فردی یا گروهی برای تشویق</li>*/}
                        {/*        <li>کارت هدیه‌ی مخصوص مراکز ورزشی برای مناسبت‌ها</li>*/}
                        {/*        <li>کاهش اعتبار یا مسدود کردن دسترسی پرسنل</li>*/}
                        {/*        <li>پاسخگویی و پشتیانی کامل</li>*/}
                        {/*    </ul>*/}
                        {/*</Typography>*/}
                    </Grid>
                </Grid>
                <Grid container columns={4} alignContent={"center"} textAlign={"right"}>
                    <Grid sx={{p: 3}} item size={{md: 2, xs: 4}}>
                        <img alt={"اپلیکیشن اختصاصی شرکت‌ها"} className={"apps-img"} src={"/assets/images/appuser.jpg"}/>
                    </Grid>
                    <Grid sx={{px: 6}} item size={{md: 2, xs: 4}}>
                        <Typography sx={{fontWeight: 600, lineHeight: 2, mt: 8}} variant={"h5"}>اپلیکیشن اختصاصی کارمندان</Typography>
                        <Typography sx={{fontWeight: 400, mt: 2, mb: 3, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>اپلیکیشن
                            کارمندان یک
                            ابزار کارآمد و چند منظوره است که در آن کارمندان از طریق حساب کاربری خود می‌توانند تمامی‌اطلاعات لازم درباره ی
                            مجموعه‌های ورزشی و امکانات آنها را کسب کنند. این اپلیکیشن دارای امکاناتی مانند:
                            مشاهده‌ی عکس‌ها و امکانات مجموعه‌های ورزشی طرف قرارداد، مشاهده ی رشته ی‌های ورزشی هر مجموعه و روز و ساعت برگزاری
                            هر کلاس، مشاهده ی آدرس مراکز ورزشی بر روی نقشه، امکان جستجوی نزدیک ترین مراکز ورزشی و مسیریابی، امکان رزرو کلاس‌ها هماهنگی
                            قبل از خرید، پاسخگویی و پشتیانی کامل</Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{direction: "ltr"}} columns={4} alignContent={"center"} textAlign={"right"}>
                    <Grid sx={{p: 3}} item size={{md: 2, xs: 4}}>
                        <img alt={"اپلیکیشن اختصاصی شرکت‌ها"} className={"apps-img"} src={"/assets/images/mobile-app.jpg"}/>
                    </Grid>
                    <Grid sx={{px: 6, direction: "rtl"}} item size={{md: 2, xs: 4}}>
                        <Typography sx={{fontWeight: 600, mt: 8}} variant={"h5"}>پنل اختصاصی مراکز طرف قرارداد</Typography>
                        <Typography sx={{fontWeight: 400, mt: 2, mb: 1, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>پنل
                            اختصاصی مراکز ورزشی
                            جیم پین دارای امکاناتی مانند: به‌روز رسانی قیمت‌ها، ویرایش بلیط‌ها، به‌روز رسانی اطلاعات مجموعه و اعلام تغییرات
                            است. همچنین بخش مالی شفاف و آسان، امکان اسکن بلیط، مشاهده بلیط‌های فروخته شده از دیگر امکانات این اپلیکیشن می
                            باشد.</Typography>
                        <Typography sx={{fontWeight: 400, mt: 0, mb: 3, lineHeight: 2, textAlign: "justify"}} variant={"subtitle2"}>مراکز
                            ورزشی از طریق
                            اسکن بلیط کاربر، ورود کاربران را ثبت کرده و بقیه موارد از طریق جیم پین انجام می‌شود.</Typography>
                    </Grid>
                </Grid>
            </Container>

        </section>
    );
};

export default _Apps;
