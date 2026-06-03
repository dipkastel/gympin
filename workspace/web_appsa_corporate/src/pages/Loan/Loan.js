import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";

const Loan = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/vaam.jpg"},
                    ]}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"اقساط و تسهیلات"} />
                </Grid>

                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            اقساط و تسهیلات
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            سفارش خدمات اقساط و تسهیلات جیم پین، با همکاری فروشگاه‌های بزرگ برای خرید اقساطی، راهکاری مؤثر برای افزایش رفاه و رضایت کارمندان است. این خدمات با فراهم کردن امکان خرید آسان کالاهای متنوع، از لوازم دیجیتال تا خانگی، فشار مالی کارمندان را کم می‌کنن و حس حمایت سازمان را به آن‌ها القا می‌کند. با فرآیند ساده رزرو و اعتبارسنجی، سازمان می‌تواند به‌راحتی این خدمات را مدیریت کند و همزمان با تقویت وفاداری و انگیزه کارمندان، برند کارفرمایی خودش رو به‌عنوان محیطی حامی و جذاب تثبیت کند، که به حفظ استعدادها و بهبود فرهنگ سازمانی کمک شایانی می‌کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Loan;
