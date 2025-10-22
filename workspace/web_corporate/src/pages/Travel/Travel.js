import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";

const Travel = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/safar.jpg"},
                    ]}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"سفر و گردشگری"} />
                </Grid>


                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            سفر و گردشگری
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            استفاده از خدمات سفر و گردشگری شامل تورهای یک‌روزه، رزرو بلیط پرواز و هتل، راهکاری مؤثر برای ارتقای روحیه و بهره‌وری کارمندان است. این خدمات با فراهم کردن تجربه‌های تفریحی و کاری بدون دردسر، از زحمت سازمان برای جستجو و بستن قراردادهای متعدد کاسته و در کارمندان، استرس را کاهش داده، همکاری تیمی را تقویت کرده و حس رضایت و وفاداری آنها به سازمان را افزایش می‌دهد. سازمان با  استفاده از این خدمات متنوع و رزرو آسان، نه تنها هزینه‌های ارائه ی این خدمات را بهینه می‌کند، بلکه با ایجاد محیطی جذاب و حامی، برند کارفرمایی خودش رو تقویت کرده و به حفظ استعدادها و افزایش عملکرد کلی کمک می‌کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Travel;
