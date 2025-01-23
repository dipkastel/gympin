import React from 'react';
import {Card, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import clickHandler from "../homeClick";
import {useNavigate} from "react-router";

const HomeSingleDiscount = (props) => {
    const navigate = useNavigate()
    return (<>
                <div >
                    <Card elevation={3} sx={{margin: 1}}>
                        <Link onClick={()=>clickHandler(props.item,navigate)} underline="none" color="inherit" fontWeight="800">
                            <div className={"discount"}>
                                <div className={"percent"}>
                                    <Typography variant={"subtitle2"} sx={{padding:0.5}} textAlign={"start"} color={"red"}>
                                        {props.item.Description}
                                    </Typography>
                                </div>
                                <div className={"discountbg"}/>
                            </div>
                            <div className={"title"}>
                                <Typography variant={"subtitle1"}  textAlign={"end"} color={"red"}>
                                    {props.item.Title}
                                </Typography>
                            </div>
                            <Image width={"100%"} src={props.item.multimedia.Url}/>
                        </Link>
                    </Card>
                </div>
    </>

    );
};


export default HomeSingleDiscount;
