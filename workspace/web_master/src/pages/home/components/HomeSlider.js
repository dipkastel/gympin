import React from 'react';
import Slick from "react-slick"
import {Box, Link} from "@mui/material";
import {Image} from "react-bootstrap";
import clickHandler from "../homeClick";
import {useNavigate} from "react-router-dom";

const HomeSlider = (props) => {
    const navigate = useNavigate()
    const settings = {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        initialSlide: 1,
        autoplay: true,
        rows: 1,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        rtl: true

    };

    return (
            <Slick className={"slider-main"} {...settings}>
                {props.item.Items&&props.item.Items.map((singleItem, index) => (
                    <div className={"slider-item"} key={index} >
                        <Link onClick={()=>clickHandler(singleItem,navigate)} underline="none" color="inherit" fontWeight="800">
                            <Box>
                                <Image className={"slider-item-image"}  height={"50%"} width={"100%"}  src={singleItem.multimedia.Url}/>
                            </Box>
                        </Link>
                    </div>
                ))}
            </Slick>
    );
};

export default HomeSlider;
