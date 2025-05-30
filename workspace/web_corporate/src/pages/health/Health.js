import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Typography} from "@mui/material";
import _InSectionSlider from "../../components/_InSectionSlider";
import _NeedNewService from "../../components/_NeedNewService";

const Health = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/medical-dash.jpg"},
                        {Image: "/assets/banners/nutration-dash.jpg"},
                        {Image: "/assets/banners/psy-dash.jpg"},
                    ]}/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"سلامت"} />
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            خدمات سلامت سازمانی
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            سفارش خدمات سلامت مانند آزمایش های خون دوره‌ای، رژیم‌های غذایی و مشاوره سبک زندگی از طریق پلتفرم جیم پین، سرمایه‌گذاری ارزشمندی برای سلامت کارمندان و موفقیت سازمان است. این خدمات با پایش منظم سلامت، ترویج تغذیه سالم و ایجاد عادات مثبت، انرژی و بهره‌وری کارمندان را افزایش داده و نرخ غیبت و هزینه‌های درمانی رو کاهش می‌دهند. در نتیجه، سازمان نه تنها تیمی سالم‌تر و پرانرژی‌تر می‌سازد، بلکه با تقویت رضایت و وفاداری کارمندان، برند کارفرمایی خودش رو به‌عنوان محیطی حامی و جذاب تثبیت می‌کند که به حفظ استعدادها و بهبود عملکرد کلی کمک می‌کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Health;

