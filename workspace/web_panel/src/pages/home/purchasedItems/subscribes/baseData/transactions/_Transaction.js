import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {transactionAll_query} from "../../../../../../network/api/transactionsAll.api";
import {Button, Typography} from "@mui/material";
import {TransactionCorporateTypes} from "../../../../../../helper/enums/TransactionCorporateTypes";
import {TransactionStatus} from "../../../../../../helper/enums/TransactionStatus";
import {toPriceWithComma} from "../../../../../../helper";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {serial_getBySerial} from "../../../../../../network/api/serial.api";
import {useHistory} from "react-router-dom";

const _Transactions = ({transactions,purchased,updatePage}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();

    return (
        <>
            {transactions&&<Portlet>
                <PortletHeader title="فاکتور مرتبط"/>
                <PortletBody>
                    {transactions.Invoices.map((item, Number) => (
                        <Button key={Number} fullWidth variant={"contained"} color={"error"} onClick={(event) => {
                            history.push({pathname: "/invoice/detail/" + item.Id});
                        }} > برو به فاکتور</Button>
                    ))}
                </PortletBody>
            </Portlet>}
        </>
    )
};

export default _Transactions;
