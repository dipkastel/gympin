import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {serial_getBySerial} from "../../../../../network/api/serial.api";
import _CorporateTransactions from "./_CorporateTransactions";
import _UserTransactions from "./_UserTransactions";
import _InvoicePurchaseds from "./_InvoicePurchaseds";
import _DiscountTransaction from "./_DiscountTransactions";
import _IncomeTransactions from "./_IncomeTransactions";

const InvoiceBuysData = ({invoice, updatePage}) => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [serial, setSerial] = useState([]);


    useEffect(() => {
        serial_getBySerial({serial: invoice.Serial.Serial}).then((result) => {
            setSerial(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [invoice]);

    return (
        <>
            <div className={"col-md-6"}>
                <_InvoicePurchaseds PurchasedBases={serial?.PurchasedBases}/>
                <_IncomeTransactions transactions={serial?.IncomeTransactions}/>
                <_DiscountTransaction transactions={serial?.DiscountTransactions}/>
            </div>
            <div className={"col-md-6"}>
                <_CorporateTransactions transactions={serial?.CorporateTransactions}/>
                <_UserTransactions transactions={serial?.UserTransactions}/>
            </div>
        </>

    );
};

export default InvoiceBuysData;
