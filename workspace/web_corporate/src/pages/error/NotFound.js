import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";

export function  NotFound(){
    useEffect(() => {
        document.title = 'صفحه یافت نشد';
    }, []);

    return (
        <Grid container sx={{textAlign:"center",p:5}} >
            <Typography variant={"h3"} sx={{width:"100%"}}>موردی یافت نشد</Typography>
        </Grid>
    );
}

