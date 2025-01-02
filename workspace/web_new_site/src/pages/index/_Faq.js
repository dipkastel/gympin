import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Container, Typography} from "@mui/material";
import Slider from "react-slick";

const _Faq = () => {

    const settings = {
        className: "experienceSlider",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        dots: true,
        autoplay: true,
        slidesToShow: 3,
        speed: 1000,
        rtl:true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
        nextArrow: <Arrow/>,
        prevArrow: <Arrow/>

    };


    function Arrow() {
        return (<div style={{display: "none"}}/>);
    }


    return (
        <section>
            <Grid sx={{mt: 12}} container columns={4} alignContent={"center"} textAlign={"center"}>
                <Grid item size={4}>
                    <Typography color={"primary"} sx={{fontWeight: 600, mt: 8, mb: 3}} variant={"h1"}>پاسخ به سوالات متداول</Typography>
                </Grid>
            </Grid>

            <div className="slider-container">
                <Slider  {...settings}>
                    <FaqSliderItem title={"از چه امکاناتی در جیم پین می‌توان استفاده کرد؟"} text={"از امکانات جیم پین می‌توان به جستجو و رزرو مجموعه‌های ورزشی، دسترسی به تخفیف‌ها و پیشنهادهای ویژه، دسترسی به برنامه‌های تمرینی و تغذیه‌ای و همچنین ارتباط با مربیان و اعضای دیگر جیم پین اشاره کرد."}/>
                    <FaqSliderItem title={"حق عضویت سازمان‌ها در جیم پین چقدر است؟"} text={"عضویت و استفاده از خدمات جیم پین برای سازمان‌ها هیچ هزینه ای ندارد و جیم پین برای خدمات خود هیچ هزینه ای از شرکت‌ها دریافت نمی‌کند. در واقع استفاده از جیم پین برای شرکت‌ها رایگان است."}/>
                    <FaqSliderItem title={"آیا امکان افزودن مجموعه ورزشی مورد نظر سازمان‌ها در جیم پین وجود دارد؟"} text={"بله، جیم پین از این پیشنهاد استقبال می‌کند و آمادگی همکاری با مراکز پیشنهادی شرکت‌ها را دارد."}/>
                    <FaqSliderItem title={"حداقل پرداختی شرکت به جیم پین چقدر است؟"} text={"شروع همکاری با جیم پین رایگان است. شرکت‌ها بر اساس تعداد پرسنل و بودجه رفاهی مد نظر خود اقدام به شارژ و اعتبار دهی به پرسنل خود می‌نمایند."}/>
                </Slider>
            </div>

            <Grid  container sx={{mb:6}} direction={"column"} alignItems={"end"} textAlign={"end"}>
                <Typography component={"a"} href={"/faq"} color={"primary"} sx={{ fontWeight:600, p: 4, textAlign: "justify"}} variant={"caption"}>ادامه سوالات ⮘</Typography>
            </Grid>
        </section>
    );

    function FaqSliderItem({title,text}) {
        return (
            <div>
                    <Card className={"faqTopCard rtl"} elevation={12} sx={{borderRadius: 8}}>
                        <Grid className={"experience-text"} container direction={"column"} alignItems={"start"} textAlign={"center"}>
                            <Typography sx={{px: 2, p: 2, textAlign: "justify"}} variant={"body1"}>{title}</Typography>
                        </Grid>
                    </Card>
                    <Card className={"faqBottomCard rtl"} elevation={12} sx={{borderRadius: 8}}>
                        <Grid className={"experience-text"} container direction={"column"} alignItems={"start"} textAlign={"center"}>
                            <Typography sx={{px: 2, p: 2, textAlign: "justify"}} variant={"body1"}>{text}</Typography>
                        </Grid>
                    </Card>

            </div>)
    }
};

export default _Faq;
