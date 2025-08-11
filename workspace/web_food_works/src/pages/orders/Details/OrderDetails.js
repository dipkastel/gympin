import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {invoice_getById} from "../../../network/api/invoice.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Card, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _OrderItems from "./partials/_OrderItems";
import _OrderExtras from "./partials/_OrderExtras";
import _OrderInfo from "./partials/_OrderInfo";
import _OrderCalculate from "./partials/_OrderCalculate";
import _OrderAction from "./partials/_OrderAction";

const OrderDetails = () => {


    let {invoiceId} = useParams();
    const [invoice, SetInvoice] = useState(null);
    const catering = useSelector(({catering}) => catering.catering);
    const error = useContext(ErrorContext);

    useEffect(() => {
        if (!catering) return;
        getInvoice();
    }, [catering]);

    function getInvoice() {
        invoice_getById(invoiceId).then(result => {
            if (result.data.Data.InvoiceFoods[0].Place.Id == catering.Id)
                SetInvoice(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    return (
        <>
            {!!invoice && <>
                <Grid container columns={12}>
                    <Grid size={12}>
                        <Card sx={{m: 2, p: 2}} variant={"outlined"}>
                            <Grid container direction={"row"} justifyContent={"space-between"}>
                                <Typography>مشاهده و انجام سفارش پرداخت شده</Typography>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid size={8}>
                        <_OrderItems invoice={invoice} getInvoice={getInvoice} />
                        <_OrderExtras invoice={invoice}  getInvoice={getInvoice} />
                    </Grid>
                    <Grid size={4}>
                        <_OrderInfo invoice={invoice} />
                        <_OrderCalculate invoice={invoice}  />
                        <_OrderAction invoice={invoice} />
                    </Grid>
                </Grid>
            </>}
            {!invoice && <Grid container alignContent={"center"} justifyContent={"center"} alignItems={"center"}
                               sx={{height: "100%", width: "100%"}}><CircularProgress/></Grid>}

        </>
    );
};

export default OrderDetails;
