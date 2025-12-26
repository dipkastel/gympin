import React, {useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Avatar, Card, Typography} from "@mui/material";
import Slider from "react-slick";
import {useNavigate} from "react-router";

const _DashSlider = () => {

    const navigate = useNavigate();
    const [ww,setWw] = useState(window.innerWidth);

    const settings = {
        centerMode: false,
        infinite: true,
        slidesToShow: 1,
        dots: false,
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

    function SliderItem({bigImage,smallImage,alt,onclick}){
        return(
            <div>
                <Card className={"rtl"} elevation={4}  sx={{borderRadius: 4,mx:"1VW",my:"1VW"}} onClick={onclick}>
                    <img alt={alt} width={"100%"} className={"slider-img"} src={ww>600?bigImage:smallImage}/>
                </Card>
            </div>)
    }
    return (
        <section>
            <div>
                <Slider  {...settings}>
                    <SliderItem
                        bigImage={"/assets/images/slide2.jpg"}
                        smallImage={"/assets/images/slide12.jpg"}
                        alt={"تجربه جدید"}
                    />
                    <SliderItem
                        bigImage={"/assets/images/slide3.jpg"}
                        smallImage={"/assets/images/slide13.jpg"}
                        alt={"اعتبار دهی به کارمندان"}
                    />
                </Slider>
            </div>
        </section>
    );
};

export default _DashSlider;
