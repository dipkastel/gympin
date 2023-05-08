import React from 'react';
import Slick from "react-slick";
import {Card, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import HomeTitle from "./HomeTitle";
import clickHandler from "../homeClick";
import {useNavigate} from "react-router-dom";

const HomeDiscountList = (props) => {
    const navigate = useNavigate()
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
    return (<>
        {props.item.Title&&<HomeTitle item={props.item} />}
        <Slick  className={"content-list"} {...settings}>
            {props.item.Items&&props.item.Items.map((singleItem, index) => (
                <div key={index}>
                    <Card elevation={3} sx={{margin: 1,borderRadius:"10px"}}>
                        <Link onClick={()=>clickHandler(props.item,navigate)} underline="none" color="inherit" fontWeight="800">
                            <div className={"discount"}>
                                <div className={"percent"}>
                                    <Typography variant={"subtitle2"} sx={{padding:0.5}} textAlign={"start"} color={"white"}>
                                        {singleItem.Description}
                                    </Typography>
                                </div>
                                <div className={"discountbg"}/>
                            </div>
                            <Image width={"100%"} src={singleItem.multimedia.Url}/>
                            <div className={"title"}>
                                <Typography variant={"subtitle1"}  textAlign={"start"} sx={{pr:1}} color={"white"}>
                                    {singleItem.Title}
                                </Typography>
                            </div>
                        </Link>
                    </Card>
                </div>
            ))}
        </Slick>
    </>

    );
};


export default HomeDiscountList;
