import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";

const Consult = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/moshaver-maliat.jpg"},
                    ]}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"مشاوره"} />
                </Grid>


                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            مشاوره برای سازمان
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            استفاده از خدمات مشاوره بیمه، مالی، مالیاتی، حقوقی، شغلی و تیمی در پلتفرم جیم پین، ضمن رفع نیاز سازمانها، سرمایه‌گذاری هوشمندانه‌ای برای مراقبت و پیشبرد سازمان است. این خدمات با ارائه راهکارهای تخصصی، به سوالات سازمانها پاسخ داده و امنیت مالی و حقوقی سازمان را تقویت می‌کند و با کاهش ریسک‌های قانونی، مالی و شغلی در مسیر حرفه‌ای‌، از سازمانها حمایت می کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Consult;
