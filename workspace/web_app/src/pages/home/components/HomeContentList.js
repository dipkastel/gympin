import React from 'react';
import Slick from "react-slick";
import {Box, Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";

const HomeContentList =(props) => {
    console.log(props)
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
                        <Card sx={{margin:1}} elevation={3}>

                            <CardMedia
                                component="img"
                                height="194"
                                image={item.ImageUrl}
                                alt={item.Title}
                            />

                            <CardContent>
                                <Typography variant="h5" textAlign={"center"} color="text.secondary">
                                    {item.Title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            ))}
        </Slick>
    );
};


export default HomeContentList;
