import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {invoice_getById} from "../../../network/api/invoice.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Card, CardContent, CardHeader, CircularProgress, IconButton, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {FileDownload, ImportExport} from "@mui/icons-material";
import _EditPreOrderItems from "./partials/_EditPreOrderItems";
import _EditPreOrderExtras from "./partials/_EditPreOrderExtras";
import _EditPreOrderInfo from "./partials/_EditPreOrderInfo";
import _EditPreOrderCalculate from "./partials/_EditPreOrderCalculate";
import _EditPreOrderAction from "./partials/_EditPreOrderAction";

const EditPreOrder = () => {


    let { invoiceId } = useParams();
    const [invoice,SetInvoice] = useState(null);
    const catering = useSelector(({catering}) => catering.catering);
    const error = useContext(ErrorContext);

    useEffect(() => {
        if(!catering)return;
        getInvoice();
    }, [catering]);

    function getInvoice() {
        invoice_getById(invoiceId).then(result=>{
            if(result.data.Data.InvoiceFoods[0].Place.Id==catering.Id)
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
            {!!invoice&&<>
                <Grid container columns={12}>
                        <Grid size={12}>
                            <Card sx={{m: 2, p: 2}} variant={"outlined"}>
                                <Grid container direction={"row"} justifyContent={"space-between"}>
                                    <Typography>ویرایش و تایید سفارش</Typography>
                                </Grid>
                            </Card>
                        </Grid>
                    <Grid size={8}>
                        <_EditPreOrderItems invoice={invoice} getInvoice={getInvoice} />
                        <_EditPreOrderExtras invoice={invoice}  getInvoice={getInvoice} />
                    </Grid>
                    <Grid size={4}>
                        <_EditPreOrderInfo invoice={invoice} />
                        <_EditPreOrderCalculate invoice={invoice}  />
                        <_EditPreOrderAction invoice={invoice} />
                    </Grid>
                </Grid>
            </>}
            {!invoice&&<Grid container alignContent={"center"} justifyContent={"center"} alignItems={"center"} sx={{height:"100%",width:"100%"}}><CircularProgress /></Grid>}

        </>
    );
};

export default EditPreOrder;
