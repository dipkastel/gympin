import React, {useState} from 'react';
import {Alert, Box, Card, Chip, Collapse, Divider, Grid2 as Grid, ListItemText, Paper, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {
    AvTimerOutlined,
    ChildCare,
    Face2Outlined,
    Face3Outlined,
    Face6Outlined,
    GroupOutlined,
    NewReleases,
    SentimentSatisfiedAltOutlined,
    SupervisedUserCircleOutlined
} from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {fixTextToSlug, toPriceWithComma} from "../../../helper/utils";
import {useNavigate} from "react-router-dom";

const _ep_CAROUSEL_BUTTON_LIST_ITEM = ({item}) => {

    const navigate = useNavigate();
    return (
        <Grid sx={{placeItems: "center", alignItems: "center", alignContent: "center", mt: 1}} alignItems={"center"}
                  alignContent={"center"} textAlign={"center"} direction={"column"} container
                  onClick={() => navigate(item?.Url)}>
            <Paper sx={{m: "auto", width: "100px", borderRadius: 8, p: 2 }} elevation={8}>
                {item.ViewType=="NEW_SPORT_CAT"&&<Typography className={"animate__animated animate__repeat-3 animate__flash"} sx={{mt:-3,mr:-2,fontSize:"0.7rem",borderRadius:3,color:"#fff",backgroundColor:"#e7333e",position:"absolute",px:1,py:0.2}}>جدید</Typography>}
                <img width={64} src={item?.multimedia?.Url}/>
            </Paper>
            <Typography sx={{fontWeight: "600", textAlign: "center", mt: 1}} variant={"body2"}>{item?.Title}</Typography>
        </Grid>
    );
};

export default _ep_CAROUSEL_BUTTON_LIST_ITEM;
