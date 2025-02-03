import React from 'react';
import {Card, Grid2 as Grid, Paper} from "@mui/material";

const _HomeBanner = ({smImage,xlImage,sx,onClick}) => {
    return (
        <Grid sx={sx} direction={"row"} container justifyContent={"center"} onClick={onClick}>
            <Grid sx={{width:"100%"}}>
                <Card sx={{display:{xs:"none",sm:"none",md:"inherit"},borderRadius:4,mx:2}} elevation={4} >
                    <img width={"100%"} src={xlImage}/>
                </Card>
                <Card sx={{display:{xs:"inherit",sm:"inherit",md:"none"},borderRadius:4,mx:1}} elevation={4} >
                    <img width={"100%"} src={smImage}/>
                </Card>
            </Grid>
        </Grid>
    );
};

export default _HomeBanner;
