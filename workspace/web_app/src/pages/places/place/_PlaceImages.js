import React, {useEffect, useState} from 'react';
import Slick from "react-slick";
import {Box, Card, Link, Typography, Grid2 as Grid} from "@mui/material";
import {Image} from "react-bootstrap";

const _PlaceImages = ({place}) => {
    const [itemToSlide,setItemToSlide] = useState(null);
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
        rtl: false

    };

    useEffect(() => {
        if(place){
            if(place.Multimedias.length<2){
                setItemToSlide([...place.Multimedias,...place.Multimedias])
            }else{
                setItemToSlide(place.Multimedias);
            }
        }
    }, [place]);

    return (
        <>
            <Slick className={"mb--8"} {...settings}>
                {itemToSlide&&itemToSlide?.map((item, index) => (
                    <Grid container sx={{p:2}} >
                        <Card elevation={5} key={index} >
                            <Link  underline="none" color="inherit" fontWeight="800">
                                <Box>
                                    <Image width={"100%"} src={item.Url}/>
                                </Box>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Slick>
        </>
    );
};

export default _PlaceImages;
