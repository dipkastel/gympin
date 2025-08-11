import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {invoice_query} from "../../../network/api/invoice.api";
import {useSelector} from "react-redux";
import _SingleInvoiceToPay from "./_SingleInvoiceToPay";
import Grid from "@mui/material/Grid2";


const PayCateringInvoices = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    let {cateringId} = useParams();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [invoiceToPay, SetInvoiceToPay] = useState([]);

    useEffect(() => {
        getInvoiceToPay()
    }, [cateringId, corporate]);

    function getInvoiceToPay() {
        if (!cateringId) return;
        if (!corporate) return;
        invoice_query({
            queryType: "FILTER",
            PlaceId: cateringId,
            Corporate: corporate.Id,
            Status: "NEED_TO_PAY",
            paging: {
                Page: 0,
                Size: 50,
                Desc: true
            }
        })
            .then((result) => {
                SetInvoiceToPay(result.data.Data);
            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }

    return (
        <>

            <Grid container spacing={2} sx={{p:2}}>
                {invoiceToPay?.content?.map(item => (<_SingleInvoiceToPay Invoice={item} getInvoices={getInvoiceToPay} />))}
            </Grid>
        </>
    );
};

export default PayCateringInvoices;
