import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../helper/utils";
import {useSelector} from "react-redux";

const _OrderCalculate = ({invoice}) => {

    const catering = useSelector(({catering}) => catering.catering);
    return (
        <>

            <Card elevation={10} sx={{m:2}}>
                <CardHeader sx={{borderBottom:"1px solid #909090"}} title={"جمع سفارش"}/>
                <CardContent>
                    <Typography variant={"h6"}>{"جمع سفارش "+toPriceWithComma(invoice?.TotalPrice)+" تومان"}</Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default _OrderCalculate;
