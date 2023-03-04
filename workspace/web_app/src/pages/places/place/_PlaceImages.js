import React from 'react';
import Slick from "react-slick";
import {Box, Link} from "@mui/material";
import {Image} from "react-bootstrap";

const _PlaceImages = ({Multimedias}) => {
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
        <>

            <Slick {...settings}>
                {Multimedias.map((item, index) => (
                    <div key={index} >
                         <Link  underline="none" color="inherit" fontWeight="800">
                            <Box>
                                <Image width={"100%"} src={item.Url}/>
                            </Box>
                        </Link>
                    </div>
                ))}
            </Slick>
        </>
    );
};

export default _PlaceImages;
