import React from 'react';
import Grid from "@mui/material/Grid2";
import {Avatar, Card, Typography} from "@mui/material";
import Slider from "react-slick";

const _Slider = () => {

    const settings = {
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        dots: true,
        rtl:true,
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

    function SliderItem({src}){
        return(
            <div>
                <Card className={"rtl"} elevation={4}  sx={{borderRadius: 4,mx:"1VW",my:"1VW"}}>
                    <img alt={"درگاه ملی مجوز‌ها"} width={"100%"} className={"slider-img"} src={src}/>
                </Card>
            </div>)
    }
    return (
        <section>

            <div>
                <Slider  {...settings}>
                    <SliderItem src={"/assets/images/slide1.jpg"} />
                    <SliderItem src={"/assets/images/slide2.jpg"}/>
                    <SliderItem src={"/assets/images/slide3.jpg"}/>
                </Slider>
            </div>
        </section>
    );
};

export default _Slider;
