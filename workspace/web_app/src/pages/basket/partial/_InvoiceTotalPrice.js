import React from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";

const _InvoiceTotalPrice = ({totalPrice}) => {
    return (
        <Card elevation={3} sx={{m: 1,border:"1px solid #51a5f8"}}>
            <CardContent sx={{m: 0, py:"8px !important"}}>
                <Typography variant={"h4"} color={"#343434"} >
                    {"مجموع قابل پرداخت : " + toPriceWithComma(totalPrice)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default _InvoiceTotalPrice;
