import React, {useContext, useEffect, useState} from 'react';
import {Badge} from "@mui/material";
import {useNavigate} from "react-router";
import {ErrorContext} from "../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {invoice_query} from "../network/api/invoice.api";

const _preOrderCount = () => {

    const error = useContext(ErrorContext);
    const catering = useSelector(({catering}) => catering.catering);
    const [preOrders, setPreOrders] = useState(null);
    useEffect(() => {
        getPreOrders();
    }, [catering]);

    function getPreOrders() {
        if (!catering) return;
        invoice_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
            Status: "NEED_REVIEW",
            paging: {
                Page: 0,
                Size: 1,
                Desc: true
            }
        })
            .then((result) => {
                setPreOrders(result.data.Data);
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
        <Badge sx={{mr:1}} badgeContent={preOrders?.totalElements||0} color={"error"} size="small"/>
    );
};

export default _preOrderCount;
