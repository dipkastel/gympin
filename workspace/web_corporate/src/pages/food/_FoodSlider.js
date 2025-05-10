import React, {useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Avatar, Card, Typography} from "@mui/material";
import Slider from "react-slick";

const _FoodSlider = () => {

    const [ww,setWw] = useState(window.innerWidth);

    const settings = {
        centerMode: false,
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

    function SliderItem({src,alt}){
        return(
            <div>
                <Card className={"rtl"} elevation={4}  sx={{borderRadius: 4,mx:"1VW",my:"1VW"}}>
                    <img alt={alt} width={"100%"} className={"slider-img"} src={src}/>
                </Card>
            </div>)
    }
    return (
        <section>

            <div>
                <Slider  {...settings}>
                    <SliderItem src={ww>600?"/assets/banners/food1.jpg":"/assets/banners/food1.jpg"} alt={"غدای سالم"}/>
                    <SliderItem src={ww>600?"/assets/banners/food2.jpg":"/assets/banners/food2.jpg"} alt={"تجربه جدید"}/>
                </Slider>
            </div>
        </section>
    );
};

export default _FoodSlider;
