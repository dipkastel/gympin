import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Avatar, Card, Divider, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const _Experiences = () => {

    const settings = {
        className: "experienceSlider",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        dots: true,
        rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
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
                <Grid sx={{mt:5}} container columns={4} alignContent={"center"} textAlign={"center"}>
                    <Grid item size={4}>
                        <Typography color={"primary"} sx={{fontWeight: 600, mt: 8, mb: 3}} variant={"h1"}>تجربه همراهان ما</Typography>
                    </Grid>
                </Grid>

                <div className="slider-container">
                    <Slider  {...settings}>
                        <SliderItem />
                        <SliderItem />
                        <SliderItem />
                        <SliderItem />
                    </Slider>
                </div>
        </section>
    );

    function SliderItem(){
        return(
            <div>
                {/*<Card className={"card rtl"} elevation={18} sx={{borderRadius: 8}}>*/}
                {/*    <Avatar className={"image"} alt={"نظر مثبت کارفرما"} src={"/assets/images/logo300.png"}/>*/}
                {/*    <Grid width={"100%"} container justifyContent={"space-between"} columns={8} >*/}
                {/*        <Grid size={3}></Grid>*/}
                {/*        <Grid size={5} container direction={"column"} alignItems={"center"} textAlign={"center"} sx={{px:0,pt:2}}>*/}
                {/*            <Typography sx={{fontWeight:600}} color={"primary"} variant={"subtitle1"}>محمود کلاکله</Typography>*/}
                {/*            <Typography variant={"subtitle2"}>مدیر عامل</Typography>*/}
                {/*            <Avatar  alt={"نظر مثبت کارفرما"} src={"/assets/images/logo300.png"}/>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*    <Divider> - </Divider>*/}
                {/*    <Grid className={"experience-text"} container direction={"column"} alignItems={"start"} textAlign={"center"}>*/}
                {/*        <Typography sx={{px:2,pt:2,textAlign:"justify"}} variant={"body1"}>خیلی خوبه از وقتی با جیم پین آشنا شدم موهام کمتر میریزه رشد پاهام بیشتر شده و شکمم هم بهتر کار میکنه </Typography>*/}
                {/*        <Typography sx={{px:2,textAlign:"justify"}} variant={"body1"}>تازه مادر خانومم بیشتر دوسم داره خواهر زادم هم توی درساش پیشرفت کرده  </Typography>*/}
                {/*        <Typography sx={{px:2,textAlign:"justify"}} variant={"body1"}>در روز برنج کمتری می‌خورم درد همیشگی پشت گردنم هم رفع شده</Typography>*/}
                {/*        <Typography sx={{px:2,pb:2,textAlign:"justify"}} variant={"body1"}>مدرسه دخترم هم نزدیک تر شده</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid className={"experience-date"} container direction={"row"} alignItems={"start"} textAlign={"start"}>*/}
                {/*        <CalendarMonthIcon sx={{ml:2,mr:0,color:"#999999"}} />*/}
                {/*        <Typography sx={{pt:0.3,pb:2,textAlign:"justify",color:"#999999"}} variant={"body1"}>۱۴۰۳/۱۰/۱۱</Typography>*/}
                {/*    </Grid>*/}
                {/*</Card>*/}
            </div>)
    }
};



export default _Experiences;
