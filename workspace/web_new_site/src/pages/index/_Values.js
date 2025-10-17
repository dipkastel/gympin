import React from 'react';
import Slider from "react-slick";
import {Card, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

const _Experiences = () => {

    const settings = {
        className: "experienceSlider",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        dots: false,
        rtl:true,
        autoplay: true,
        speed: 300,
        autoplaySpeed: 3000,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />

    };


    function Arrow() {
        return (
            <div
                style={{ display: "none" }}
            />
        );
    }

    return (
        <section>
                {/*<Grid sx={{mt:5}} container columns={4} alignContent={"center"} textAlign={"center"}>*/}
                {/*    <Grid item size={4}>*/}
                {/*        <Typography color={"primary"}  sx={{fontWeight: 600, mt: 8, mb: 3}} variant={"h1"}>مزایای جیم پین</Typography>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                <div className="slider-container">
                    <Slider  {...settings}>
                        <SliderItem text={"تعداد زیاد و رو به افزایش مراکز ورزشی"} />
                        <SliderItem text={"پوشش دهی تمام مناطق استان تهران و البرز"} />
                        <SliderItem text={"تنوع بی‌نظیر و گسترده رشته‌های ورزشی"} />
                        <SliderItem text={"قدرتی، آبی، هوازی، توپی، رزمی، راکتی، ماساژ و ... "} />
                        <SliderItem text={"تخفیف‌های شگفت انگیز برای کارمندان"} />
                        <SliderItem text={"عضویت رایگان سازمان‌ها در جیم پین"} />
                        <SliderItem text={"مشاوره رایگان حضوری برای شرکت‌ها"} />
                        <SliderItem text={"امکان استفاده هر سازمان با هر بودجه ای"} />
                        <SliderItem text={"گزارش‌های عمومی‌عملکرد کارمندان (ماهیانه)"} />
                        <SliderItem text={"گزارش‌های اختصاصی عملکرد سازمان (سالیانه)"} />
                        <SliderItem text={"عدم سوخت و حفظ بودجه رفاهی سازمان"} />
                        <SliderItem text={"استفاده از باقی‌مانده مبلغ برای شارژ مجدد"} />
                        <SliderItem text={"امکان تعریف تاریخ انقضا برای اعتبار کارمندان"} />
                        <SliderItem text={"درگاه پرداخت برای افزایش اعتبار توسط کارمندان"} />
                        <SliderItem text={"افزودن مراکز درخواستی شرکت‌ها و کارمندان"} />
                        <SliderItem text={"هدایای مناسبتی(نوروز، یلدا، تولد، روز زن)"} />
                        <SliderItem text={"نظرسنجی در راستای بهبود کیفیت و ارتقا خدمات"} />
                        <SliderItem text={"ارتقا برند کارفرمایی از طریق پوشش هزینه ورزشی"} />
                        <SliderItem text={"جشنواره‌های فصلی و فروش‌های ویژه"} />
                        <SliderItem text={"پنل اختصاصی مدیریت بودجه منابع انسانی"} />
                        <SliderItem text={"اپلیکیشن ویژه کارمندان با امکان مشاهده‌ی مراکز"} />
                        <SliderItem text={"پاسخگویی و پشتیبانی کامل و سریع جیم پین"} />
                    </Slider>
                </div>
        </section>
    );

    function SliderItem({text}){
        return(
            <div>
                <Container>
                    <Card className={"valueCard rtl"} elevation={0} sx={{ color:"#FFFFFF",bgcolor:"#e22430",borderRadius:8}}>
                        <Grid width={"100%"}  container justifyContent={"center"} columns={8} >
                            <Typography>{text}</Typography>
                        </Grid>
                    </Card>
                </Container>
            </div>)
    }
};



export default _Experiences;
