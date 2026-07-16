import {JSX} from "react";

import {Container, Grid, Typography} from "@mui/material";

export default function Apps(): JSX.Element {
    return (
        <section>
            <Container>
                <Grid
                    container
                    columns={4}
                    sx={{
                        mt: 16,
                        textAlign: "center",
                        alignContent: "center",
                    }}
                >
                    <Grid size={4}>
                        <Typography
                            color="primary"
                            variant="h1"
                            component="h2"
                            sx={{
                                fontWeight: 600,
                                mb: 3,
                            }}
                        >
                            اپلیکیشن‌های اختصاصی
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    columns={4}
                    sx={{
                        direction: "ltr",
                        textAlign: "left",
                        alignContent: "center",
                    }}
                >
                    <Grid
                        size={{md: 2, xs: 4}}
                        sx={{
                            p: 3,
                        }}
                    >
                        <img
                            src="/images/corporatelaptop.jpg"
                            alt="اپلیکیشن اختصاصی شرکت‌ها"
                            className="apps-img"
                        />
                    </Grid>

                    <Grid
                        size={{md: 2, xs: 4}}
                        sx={{
                            px: 6,
                            direction: "rtl",
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                mt: 8,
                            }}
                        >
                            داشبورد اختصاصی سازمان‌
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 400,
                                mt: 2,
                                mb: 0,
                                lineHeight: 2,
                                direction:"ltr",
                                textAlign: "justify",
                            }}
                        >
                            داشبورد اختصاصی سازمان‌ در جیم پین، ابزاری جامع برای
                            مدیریت فعالیت‌های کارکنان و تخصیص اعتبار به آن‌ها است.
                            این پنل امکان دسته‌بندی پرسنل و ارائه مشوق‌های مالی را
                            فراهم می‌کند. همچنین، مدیران می‌توانند اعتبارها را به
                            افراد جدید انتقال دهند یا دسترسی کارکنان را مسدود سازند.
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 400,
                                mt: 0,
                                mb: 0,
                                lineHeight: 2,
                                direction:"ltr",
                                textAlign: "justify",
                            }}
                        >
                            اعتبارهای استفاده‌نشده از بین نمی‌رود و مجدداً قابل
                            استفاده می‌باشد. به‌طور کلی، این داشبورد بار کاری
                            مدیران منابع انسانی را کاهش داده و به مدیریت هزینه‌ها
                            کمک می‌کند.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    columns={4}
                    sx={{
                        alignContent: "center",
                        textAlign: "left",
                        direction: "rtl",
                    }}
                >
                    <Grid
                        size={{md: 2, xs: 4}}
                        sx={{
                            p: 3,
                        }}
                    >
                        <img
                            src="/images/appuser.jpg"
                            alt="اپلیکیشن اختصاصی کارمندان"
                            className="apps-img"
                        />
                    </Grid>

                    <Grid
                        size={{md: 2, xs: 4}}
                        sx={{
                            px: 6,
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                lineHeight: 2,
                                mt: 8,
                            }}
                        >
                            اپلیکیشن اختصاصی کارمندان
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 400,
                                mt: 2,
                                mb: 3,
                                lineHeight: 2,
                                direction:"ltr",
                                textAlign: "justify",
                            }}
                        >
                            اپلیکیشن کارمندان یک ابزار کارآمد و چندمنظوره است که
                            در آن کارمندان از طریق حساب کاربری خود می‌توانند تمامی
                            اطلاعات لازم درباره‌ی مجموعه‌های ورزشی و امکانات آن‌ها
                            را کسب کنند. این اپلیکیشن دارای امکاناتی مانند مشاهده‌ی
                            عکس‌ها و امکانات مجموعه‌های ورزشی طرف قرارداد، رشته‌های
                            ورزشی هر مجموعه و روز و ساعت برگزاری هر کلاس، آدرس
                            مراکز ورزشی روی نقشه، امکان جستجوی نزدیک‌ترین مراکز
                            ورزشی و مسیریابی، رزرو کلاس‌ها، هماهنگی قبل از خرید،
                            پاسخگویی و پشتیبانی کامل است.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    columns={4}
                    sx={{
                        direction: "ltr",
                        alignContent: "center",
                        textAlign: "left",
                    }}
                >
                    <Grid
                        size={{md: 2, xs: 4}}
                        sx={{
                            p: 3,
                        }}
                    >
                        <img
                            src="/images/place-application.jpg"
                            alt="پنل اختصاصی مراکز ورزشی"
                            className="apps-img"
                        />
                    </Grid>

                    <Grid
                        size={{md: 2, xs: 4}}
                        sx={{
                            px: 6,
                            direction: "rtl",
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                mt: 8,
                            }}
                        >
                            پنل اختصاصی مراکز ورزشی
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 400,
                                mt: 0,
                                mb: 3,
                                lineHeight: 2,
                                direction:"ltr",
                                textAlign: "justify",
                            }}
                        >
                            این پنل در راستای سهولت به‌روزرسانی اطلاعات مجموعه‌های
                            ورزشی، مدیریت فروش و شفافیت در بخش مالی ایجاد شده است.
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 400,
                                mt: 2,
                                mb: 1,
                                lineHeight: 2,
                                direction:"ltr",
                                textAlign: "justify",
                            }}
                        >
                            پنل اختصاصی مراکز ورزشی جیم پین دارای امکاناتی مانند
                            به‌روزرسانی قیمت‌ها، ویرایش بلیط‌ها، به‌روزرسانی
                            اطلاعات مجموعه و اعلام تغییرات است. همچنین بخش مالی
                            شفاف و آسان، امکان اسکن بلیط و مشاهده بلیط‌های فروخته
                            شده از دیگر امکانات این پنل است.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}
