import React from 'react';
import Slick from "react-slick";
import {Card, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";

const HomeUserList = (props) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        initialSlide: 4,
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
                {props?.item?.Items&&props?.item?.Items?.map((item, index) => (
                    <div key={index} >
                        <Link href={"/users/singleuser?id=1"} underline="none">
                            <Card sx={{
                                marginX:0.3,
                                marginY:1

                            }} elevation={3}>
                                <Image  height={"100%"} width={"100%"}  src={item?.multimedia?.Url}/>
                                <Typography width={"100%"} variant="overline"noWrap={true} textAlign={"center"} fontSize={"0.5em"} component="div" sx={{
                                    marginY:0.1
                                }}>
                                    {item?.Title}
                                </Typography>
                            </Card>
                        </Link>
                    </div>
                ))}
            </Slick>
            {!props?.item?.Items&&<h5>لطفا آیتم کاربر به این لیست اضافه کنید</h5>}
        </>
    );
};
export default HomeUserList;
