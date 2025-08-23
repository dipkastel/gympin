import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {Card, CardContent, Typography} from "@mui/material";
import {User_getMyCredits} from "../../../network/api/user.api";
import {creditTypes} from "../../../helper/enums/creditTypes";
import {getCheckoutType} from "../../../helper/serverSettingsHelper";

const _InvoiceHowToPaySmartis = ({userBasket, setUserCanPay, invoiceCredits, SetInvoiceCredits}) => {


    useEffect(()=>{
        setUserCanPay(true);
    },[])

    return (
            <Card elevation={3} sx={{m: 1}}>
                <CardContent>
                    <Typography variant={"subtitle1"}>پرداخت از طریق اسمارتیز</Typography>
                </CardContent>
            </Card>

    );
};

export default _InvoiceHowToPaySmartis;
