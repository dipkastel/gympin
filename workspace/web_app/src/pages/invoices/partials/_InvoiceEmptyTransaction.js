import React from 'react';
import {Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../helper/utils";

const _InvoiceEmptyTransaction = () => {
    return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={toAbsoluteUrl("/assets/images/noTransfer.png")} width={"40%"}  style={{maxWidth: "300px"}} />
            <Typography variant={"body1"} sx={{m: 2}}>
                تراکنشی وجود ندارد
            </Typography>

        </Grid>);
};

export default _InvoiceEmptyTransaction;
