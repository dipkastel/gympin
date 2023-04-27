import React from 'react';
import Slick from "react-slick";
import {Card, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import HomeTitle from "./HomeTitle";
import {useNavigate} from "react-router-dom";
import clickHandler from "../homeClick";

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
        <Slick {...settings}>
            {props.item.Items&&props.item.Items.map((singleItem, index) => (
                <div key={index}>
                    <Card elevation={3} sx={{margin: 1}}>
                        <Link onClick={()=>clickHandler(singleItem,navigate)} underline="none" color="inherit" fontWeight="800">
                            <div className={"discount"}>
                                <div className={"percent"}>
                                    <Typography variant={"subtitle2"} sx={{padding:0.5}} textAlign={"start"} color={"red"}>
                                        {singleItem.Description}
                                    </Typography>
                                </div>
                                <div className={"discountbg"}/>
                            </div>
                            <div className={"title"}>
                                <Typography variant={"subtitle1"}  textAlign={"end"} color={"red"}>
                                    {singleItem.Title}
                                </Typography>
                            </div>
                            <Image width={"100%"} src={singleItem.multimedia.Url}/>
                        </Link>
                    </Card>
                </div>
            ))}
        </Slick>
    </>

    );
};


export default HomeDiscountList;
