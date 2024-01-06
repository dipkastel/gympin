import React from 'react';
import Slick from "react-slick";
import {Card, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import HomeTitle from "./HomeTitle";

const HomeSingleDiscount = (props) => {
    return (<>
                <div >
                    <Card elevation={3} sx={{margin: 1}}>
                        <Link href={"/" + props?.item?.Data} underline="none" color="inherit" fontWeight="800">
                            <div className={"discount"}>
                                <div className={"percent"}>
                                    <Typography variant={"subtitle2"} sx={{padding:0.5}} textAlign={"start"} color={"red"}>
                                        {props?.item?.Description}
                                    </Typography>
                                </div>
                                <div className={"discountbg"}/>
                            </div>
                            <div className={"title"}>
                                <Typography variant={"subtitle1"}  textAlign={"end"} color={"red"}>
                                    {props?.item?.Title}
                                </Typography>
                            </div>
                            <Image width={"100%"} src={props?.item?.multimedia?.Url}/>
                        </Link>
                    </Card>
                </div>
    </>

    );
};


export default HomeSingleDiscount;
