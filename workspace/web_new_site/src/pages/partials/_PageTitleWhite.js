import React from 'react';
import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";

const _PageTitle = ({title,subtitle}) => {
    return (
        <section>
            <Grid className={"headerw"} direction={"column"} alignContent={"center"} textAlign={"center"}>
                <Typography className={"title"} variant={"h1"} sx={{fontSize:"1.5rem",fontWeight:600,p:1}}>{title}</Typography>
                <Typography className={"subtitle"} variant={"h2"} sx={{fontSize:"1rem",fontWeight:400,p:3}}>{subtitle}</Typography>
            </Grid>
        </section>
    );
};

export default _PageTitle;
