import React from 'react';
import {Box, Grid2 as Grid, Link, Paper, Typography} from "@mui/material";
import Slick from "react-slick";
import clickHandler from "../../home/homeClick";
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const _HomeCategories = () => {

    const navigate = useNavigate();
    const categories = [
        {id:1,name:"بدنسازی",icon:"/assets/images/icon/ico-badansazi.svg",sid:11},
        {id:2,name:"چربی سوزی",icon:"/assets/images/icon/ico-charbisoozi.svg",sid:66},
        {id:3,name:"فیتنس",icon:"/assets/images/icon/ico-fitness.svg",sid:58},
        {id:4,name:"حرکات اصلاحی",icon:"/assets/images/icon/ico-harkateslahi.svg",sid:80},
        {id:5,name:"ورزش‌های رزمی",icon:"/assets/images/icon/ico-razmi.svg",sid:29},
        {id:6,name:"ورزش‌های آبی",icon:"/assets/images/icon/ico-shena.svg",sid:36},
        {id:7,name:"ماساژ و اسپا",icon:"/assets/images/icon/ico-spa.svg",sid:49},
        {id:8,name:"یوگا",icon:"/assets/images/icon/ico-yoga.svg",sid:57}]


    const settings = {
        dots: false,
        infinite: true,

        initialSlide: categories.length,
        autoplay: true,
        rows: 1,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        arrows: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 2500,
                settings: {
                    slidesToShow: 10
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 8
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 3
                }
            }
        ]

    };

    return (
        <>

            <Slick {...settings}>
                {[...categories,...categories,...categories].map((item, index) => (
                    <Grid sx={{placeItems:"center"}} direction={"column"} container key={index}  onClick={()=>navigate("/places/"+item.sid)} >
                        <Paper sx={{m:1 ,width:"100px",borderRadius:8,p:2}} elevation={8} >
                            <img width={64} src={item.icon}/>
                        </Paper>
                        <Typography sx={{fontWeight:"600"}} variant={"body2"} >{item.name}</Typography>
                    </Grid>
                ))}
            </Slick>

    </>
    );
};

export default _HomeCategories;
