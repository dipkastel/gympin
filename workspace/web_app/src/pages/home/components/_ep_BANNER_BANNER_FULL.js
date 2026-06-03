import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const _ep_BANNER_BANNER_FULL = ({banners}) => {



    const navigate = useNavigate();
    const display = {xs:"none",sm:"none",md:"none"}
    return (
        <Grid>

            <Grid sx={{mt:4,mb:2}} direction={"row"} container justifyContent={"center"} >
                <Grid sx={{width:"100%"}}>
                    {banners?.map(item=>(
                        <Card key={"baner-ful"+item.Id} onClick={()=>{navigate(item?.Url)}} sx={{display:{...display,[Object(item?.ViewType)]:"inherit"},borderRadius:4,mx:2}} elevation={4} >
                            <img width={"100%"} src={item?.multimedia?.Url}/>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );

};

export default _ep_BANNER_BANNER_FULL;
