import React, {useContext, useEffect, useState} from 'react';
import {serial_getById} from "../../../../network/api/serial.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {Grid, Typography} from "@mui/material";
import _BaseProcessDatas from "./partials/_BaseProcessDatas";
import _CorporateTransactions from "./partials/_CorporateTransactions";
import _UserTransactions from "./partials/_UserTransactions";
import _PersonnelCreditTransactions from "./partials/_PersonnelCreditTransactions";
import _CorporateIncreaseRequest from "./partials/_CorporateIncreaseRequest";
import _UserIncreaseRequest from "./partials/_UserIncreaseRequest";

const ProcessSerialDetail = () => {

    const error = useContext(ErrorContext);
    let {serialId} = useParams();
    const [serial, setSerial] = useState(null);

    useEffect(() => {
        serial_getById({id: serialId}).then((result) => {
            // console.log("serial : ", result.data.Data);
            setSerial(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);


    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <Typography variant={"h5"}>
                    {serial && (
                        <p>گزارش فرآیند با شماره سریال : {serial.Serial}</p>
                    )}
                </Typography>
            </Notice>
            <Grid container alignItems={"unset"} spacing={3} direction={"row"}>
                <Grid md={6} item>
                    <_BaseProcessDatas serial={serial}/>
                </Grid>
                <Grid md={6} item>
                    <_CorporateIncreaseRequest CorporateIncreaseRequest={serial?.CorporateIncreaseRequest}/>
                    <_CorporateTransactions corporateTransaction={serial?.CorporateTransactions}/>
                    <_UserIncreaseRequest UserIncreaseRequest={serial?.UserIncreaseRequest}/>
                    <_UserTransactions userTransactions={serial?.UserTransactions}/>
                    <_PersonnelCreditTransactions personelCreditTransaction={serial?.PersonnelCreditTransactions}/>
                </Grid>
            </Grid>
        </>
    );
};

export default ProcessSerialDetail;
