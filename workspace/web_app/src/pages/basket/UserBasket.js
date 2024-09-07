import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import _InvoiceBuyableCard from "./partial/_InvoiceBuyableCard";
import _InvoiceHowToPayModirate from "./partial/_InvoiceHowToPayModirate";
import _InvoiceTitle from "./partial/_InvoiceTitle";
import _InvoiceAction from "./partial/_InvoiceAction";
import {CircularProgress, Grid} from "@mui/material";
import {getCheckoutType} from "../../helper/serverSettingsHelper";
import _InvoiceEmptyBasket from "./partial/_InvoiceEmptyBasket";
import _InvoiceHowToPaySimple from "./partial/_InvoiceHowToPaySimple";
import _InvoiceHowToPayAdvanced from "./partial/_InvoiceHowToPayAdvanced";
import {invoice_getBasketByUserId} from "../../network/api/invoice.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {invoiceActions} from "../../helper/redux/actions/InvoiceActions";
import store from "../../helper/redux/store";

const UserBasket = () => {
    const error = useContext(ErrorContext);
    const [CurrentBasket, SetCurrentBasket] = useState(null);
    const currentUser = useSelector(state => state.auth.user);
    const [invoiceCredits, SetInvoiceCredits] = useState(null)
    const [userCanPay, setUserCanPay] = useState(false);

    const [serverSettings] = useState(useSelector(settings => settings));
    const [currentCheckoutType] = useState(getCheckoutType(serverSettings)||"SIMPLE")


    useEffect(() => {
        updatePage();
    }, []);


    function updatePage() {
        document.title = 'سبد خرید';
        SetCurrentBasket(null);
        invoice_getBasketByUserId(currentUser.Id).then(result => {
            SetCurrentBasket(result.data.Data);
            store.dispatch(invoiceActions.SetUserBasket(result.data.Data));
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if (!CurrentBasket)
        return (<>
            <Grid
                container
                sx={{width: "100%", height: "80vh"}}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <CircularProgress/>

            </Grid>
        </>);
    return (CurrentBasket?.InvoiceBuyables?.length || 0 > 0) ? (
        <>
            <_InvoiceTitle/>
            {CurrentBasket?.InvoiceBuyables?.map((item, number) => (
                <_InvoiceBuyableCard key={"buyable" + item.Id} buyable={item} updatePage={updatePage}/>
            ))}
            {/*<_InvoiceVocher />}*/}
            {currentCheckoutType === "SIMPLE" &&
            <_InvoiceHowToPaySimple userBasket={CurrentBasket} setUserCanPay={setUserCanPay}
                                    invoiceCredits={invoiceCredits}
                                    SetInvoiceCredits={SetInvoiceCredits}/>}
            {currentCheckoutType === "MODERATE" &&
            <_InvoiceHowToPayModirate userBasket={CurrentBasket} setUserCanPay={setUserCanPay}
                                      invoiceCredits={invoiceCredits}
                                      SetInvoiceCredits={SetInvoiceCredits}/>}
            {currentCheckoutType === "ADVANCED" &&
            <_InvoiceHowToPayAdvanced userBasket={CurrentBasket} setUserCanPay={setUserCanPay}
                                      invoiceCredits={invoiceCredits}
                                      SetInvoiceCredits={SetInvoiceCredits}/>}
            <_InvoiceAction userBasket={CurrentBasket} userCanPay={userCanPay} invoiceCredits={invoiceCredits}
                            checkoutType={currentCheckoutType}/>
        </>
    ) : (<_InvoiceEmptyBasket/>);
};

export default UserBasket;
