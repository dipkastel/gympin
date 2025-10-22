import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";
import _NeedNewService from "../../components/_NeedNewService";
import {Card, Typography} from "@mui/material";

const Survay = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/ques.jpg"},
                    ]}/>
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"نظر سنجی"} />
                </Grid>


                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            نظر سنجی
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            مجموعه‌ای از ابزارهای متنوع برای ارتقای سلامت سازمانی و بهبود تعامل تیم‌ها فراهم شده است. شما می‌توانید از نظر سنجی‌های سازمانی، تست‌های هوش، تست‌های روانشناسی و سایر ابزارهای ارزیابی استفاده کنید تا دیدگاهی دقیق از وضعیت پرسنل، نیازها و علاقه‌مندی‌های آن‌ها به دست آورده و برنامه‌های بهینه‌ای برای توسعه فردی و تیمی طراحی کنید. این خدمات با هدف افزایش بهره‌وری، تقویت روحیه تیمی و ارتقای رضایت کارکنان ارائه می‌شوند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Survay;
