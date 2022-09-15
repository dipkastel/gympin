import React from 'react';
import Slick from "react-slick";
import {Card, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";

const HomeDiscountList = (props) => {
    console.log(props)
    const settings = {
        dots: false,
        infinite: true,
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
        <Slick {...settings}>
            {props.item.Items.map((item, index) => (
                <div key={index}>
                    <Card elevation={3} sx={{margin: 1}}>
                        <Link href={"/" + item.Destination} underline="none" color="inherit" fontWeight="800">
                            <div className={"discount"}>
                                <div className={"percent"}>
                                    <Typography variant={"subtitle2"} sx={{padding:0.5}} textAlign={"start"} color={"white"}>
                                        {item.Description}
                                    </Typography>
                                </div>
                                <div className={"discountbg"}/>
                            </div>
                            <div className={"title"}>
                                <Typography variant={"subtitle1"}  textAlign={"end"} color={"white"}>
                                    {item.Title}
                                </Typography>
                            </div>
                            <Image width={"100%"} src={item.ImageUrl}/>
                        </Link>
                    </Card>
                </div>
            ))}
        </Slick>
    );
};


export default HomeDiscountList;
