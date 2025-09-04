import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";

const _InvoiceTitle = () => {
    return (
        <Grid container>
                <Typography sx={{py:1.5,pr:2,pl:5,mt:2,mb:1,bgcolor:"#e7333e",borderRadius:"0px 30px 30px 0px",color:"#fff"}} variant={"h5"} color={"#000000"} >
                    {"سبد خرید (رزرو)"}
                </Typography>
        </Grid>
    );
};

export default _InvoiceTitle;
