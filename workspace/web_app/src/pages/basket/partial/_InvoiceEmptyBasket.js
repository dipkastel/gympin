import React from 'react';
import {Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../helper/utils";

const _InvoiceEmptyBasket = () => {
    return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={toAbsoluteUrl("/assets/images/noBastket.png")} width={"40%"}  style={{maxWidth: "300px"}} />
            <Typography variant={"body1"} sx={{m: 2}}>
                سبد خرید شما خالی است
            </Typography>

        </Grid>);
};

export default _InvoiceEmptyBasket;
