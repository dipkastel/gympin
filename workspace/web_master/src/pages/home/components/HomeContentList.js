import React from 'react';
import Slick from "react-slick";
import {Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import clickHandler from "../homeClick";
import {useNavigate} from "react-router-dom";

const HomeContentList = (props) => {
    const navigate = useNavigate()
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
            <Slick className={"content-list"} {...settings}>
                {props.item.Items && props.item.Items.map((item, index) => (
                    <div key={index}>
                        <Link onClick={()=>clickHandler(item,navigate)} underline="none" color="inherit" fontWeight="800">
                            <Card sx={{margin:1,borderRadius: 3,direction:"rtl"}} elevation={3} >

                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={item.multimedia.Url}
                                    alt={item.Title}
                                />

                                {item.Title&&item.Description&&<CardContent>
                                    {item.Title&&<Typography  variant={"subtitle1"} textAlign={"center"} color="text.secondary">
                                        {item.Title.substr(0,15)+"..."}
                                    </Typography>}
                                    {item.Description&&<Typography sx={{mt: 1}} variant={"body2"} textAlign={"center"}
                                                color="text.secondary">
                                        {item.Description.substr(0,99)+"..."}
                                    </Typography>}
                                </CardContent>}
                            </Card>
                        </Link>
                    </div>
                ))}
            </Slick>
        </>
    );
};


export default HomeContentList;
