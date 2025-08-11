import React, {useContext, useEffect, useState} from 'react';
import {Badge} from "@mui/material";
import {useNavigate} from "react-router";
import {ErrorContext} from "../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {invoice_query} from "../network/api/invoice.api";

const _OrderCount = () => {

    const error = useContext(ErrorContext);
    const catering = useSelector(({catering}) => catering.catering);
    const [Orders, setOrders] = useState(null);
    useEffect(() => {
        getPreOrders();
    }, [catering]);

    function getPreOrders() {
        if (!catering) return;
        invoice_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
            Status: "PROCESSING",
            paging: {
                Page: 0,
                Size: 1,
                Desc: true
            }
        })
            .then((result) => {
                setOrders(result.data.Data);
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
        <Badge sx={{mr:1}} badgeContent={Orders?.totalElements||0} color={"error"} size="small"/>
    );
};

export default _OrderCount;
