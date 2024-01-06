import React from 'react';
import Slick from "react-slick";
import {Card, CardContent, CardMedia, Link, Typography} from "@mui/material";

const HomeContentList = (props) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 2,
        initialSlide: 2,
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
                {props?.item?.Items && props?.item?.Items?.map((item, index) => (
                    <div key={index}>
                        <Link href={"/" + item.Destination} underline="none" color="inherit" fontWeight="800">
                            <Card sx={{margin: 1}} elevation={3}>

                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={item?.multimedia?.Url}
                                    alt={item.Title}
                                />

                                <CardContent>
                                    <Typography variant="h5" textAlign={"center"} color="text.secondary">
                                        {item.Title}
                                    </Typography>
                                    <Typography sx={{mt: 1}} variant={"body2"} textAlign={"center"}
                                                color="text.secondary">
                                        {item.Description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                ))}
            </Slick>
            {!props?.item?.Items && <h5>لطفا به این لیست آیتم مطلب اضافه کنید</h5>}
        </>
    );
};


export default HomeContentList;
