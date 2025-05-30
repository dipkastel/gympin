import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";

const Cult = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/cinema1.jpg"},
                    ]}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"فرهنگ و هنر"} />
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            فرهنگی، هنری و تفریحی
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            سفارش خدمات فرهنگی، هنری و تفریحی جیم پین، شامل رزرو بلیط سینما، تئاتر، بازدید از موزه‌ها و گشت‌وگذار در گالری ها و استفاده از کافی‌شاپ‌ها، راهکاری مؤثر برای ارتقای روحیه و خلاقیت کارمندان است. این خدمات با ایجاد تجربه‌های لذت‌بخش و گروهی، استرس را کاهش می‌دن، نشاط کارمندان را افزایش می دهد و باعث حس رضایت و وفاداری کارمندان می شود. با رزرو آسان و تخفیف‌های ویژه، سازمان نه تنها هزینه‌ها را بهینه می‌کند، بلکه با ترویج فرهنگ مثبت و خلاق، برند کارفرمایی خودش را تقویت کرده و محیطی جذاب برای حفظ و جذب استعدادها ایجاد می‌کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Cult;
