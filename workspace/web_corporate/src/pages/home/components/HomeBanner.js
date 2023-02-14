import React from 'react';
import Slick from "react-slick";
import {Box, Link} from "@mui/material";
import {Image} from "react-bootstrap";

const HomeBanner =(props) => {
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
        <Slick {...settings}>
            {props.item.Items.map((item, index) => (
                <div key={index} >
                    <Link href={"/"+item.Destination} underline="none" color="inherit" fontWeight="800">
                        <Box>
                            <Image  height={"200px"} width={"100%"}  src={item.ImageUrl}/>
                        </Box>
                    </Link>
                </div>
            ))}
        </Slick>
    );
};


export default HomeBanner;
