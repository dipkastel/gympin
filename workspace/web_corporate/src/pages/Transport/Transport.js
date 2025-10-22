import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";

const Transport = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/service.jpg"},
                    ]}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"حمل و نقل"} />
                </Grid>

                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            خدمات حمل و نقل
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            سفارش خدمات حمل و نقل از طریق پلتفرم جیم پین، راهکاری مؤثر برای صرفه جویی در وقت و هزینه و بهبود تجربه کاری برای سازمانها است. وجود گزینه‌های انعطاف‌پذیر مثل اجاره تاکسی و اتوبوس، این خدمات جابه‌جایی راحت و به‌موقع را برای رفت‌وآمد روزانه یا رویدادهای سازمانی تضمین می‌کنند، استرس کارمندان را کاهش می‌دهند و از اتلاف وقت و انرژی در سازمان می کاهند. در نتیجه، سازمان نه تنها از افزایش رضایت و حضور به‌موقع کارمندان بهره‌مند می‌شود، بلکه با اطمینان از کیفیت خدمات و آسودگی خاطر، از صرف وقت بیشتر برای همکاری با شرکت های متفاوت و مقایسه و انتخاب، آزاد می شود.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Transport;
