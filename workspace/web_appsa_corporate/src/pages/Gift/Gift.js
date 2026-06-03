import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";

const Gift = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/welcom.jpg"},
                        {Image: "/assets/banners/gift.jpg"},
                    ]}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"جیم پین کارت"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/sportIcon.png"}/>}
                        describe={"جیم پین پل ارتباطی مراکز ورزشی و سازمان ها. اعتبار دهی گروهی و شخصی به کارمندان برای استفاده از مجموعه‌های ورزشی در اپلیکیشن جیم پین."}
                        status={"PREREGISTER"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"هدایا"} />
                </Grid>



                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            هدایا و بسته های مناسبتی
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            سفارش هدایای سازمانی، مناسبتی و قدردانی و بسته‌های خوشامد توسط سازمان، راهی مؤثر برای تاثیرگذاری قوی، تقویت رابطه با کارمندان و افزایش احساس رضایت و تعهد در آن‌هاست. این هدایا با ایجاد حس ارزشمندی و قدردانی، انگیزه و وفاداری کارمندان را بالا می‌برند، روحیه تیمی را بهبود داده و به حفظ استعدادها کمک می‌کنند؛ همچنین، این اقدامات، فرهنگ سازمانی مثبت را ترویج می‌دهند و با تقویت برند کارفرمایی، سازمان را به‌عنوان محیطی جذاب و حمایتگر برای کارمندان فعلی و آینده معرفی می‌کنند، که در نهایت به افزایش بهره‌وری و موفقیت سازمان منجر می‌شود.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Gift;
