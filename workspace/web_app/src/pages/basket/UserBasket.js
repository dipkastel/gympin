import React, {useState} from 'react';
import {useSelector} from "react-redux";
import _InvoiceBuyableCard from "./partial/_InvoiceBuyableCard";
import _InvoiceVocher from "./partial/_InvoiceVocher";
import store from "../../helper/redux/store";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import _InvoiceHowToPay from "./partial/_InvoiceHowToPay";
import _InvoiceTotalPrice from "./partial/_InvoiceTotalPrice";
import _InvoiceTitle from "./partial/_InvoiceTitle";
import _InvoiceAction from "./partial/_InvoiceAction";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../helper/utils";

const UserBasket = () => {
    const userBasket = useSelector(state => state.invoice.userBasket);
    const currentUser = useSelector(state => state.auth.user);
    const [invoiceCredits, SetInvoiceCredits] = useState(null)
    const [userCanPay,setUserCanPay] = useState(false);

    function updatePage() {
        if(currentUser)
            store.dispatch(sagaActions.RequestUserInvoices(currentUser));
    }

    if(!userBasket)
        return (<>
            <Grid
                container
                sx={{width:"100%",height:"80vh"}}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <CircularProgress />

            </Grid>
        </>);
    return (userBasket?.InvoiceBuyables?.length||0>0)? (
        <>
            {userBasket&&<_InvoiceTitle />}
            {userBasket?.InvoiceBuyables?.map((item, number) => (
                <_InvoiceBuyableCard key={"buyable"+item.Id} buyable={item} updatePage={updatePage}/>
            ))}

            {userBasket&&<_InvoiceVocher />}
            {userBasket&&<_InvoiceTotalPrice totalPrice={userBasket.PriceToPay}/> }
            {userBasket&&<_InvoiceHowToPay userBasket={userBasket} setUserCanPay={setUserCanPay} invoiceCredits={invoiceCredits} SetInvoiceCredits={SetInvoiceCredits}/>}
            {userBasket&&<_InvoiceAction userBasket={userBasket} userCanPay={userCanPay} invoiceCredits={invoiceCredits} />}






        </>
    ):(<>
        <Grid
            container
            sx={{width:"100%",height:"80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={toAbsoluteUrl("/assets/images/shoping-basket.png")}  width={"40%"}/>
            <Typography variant={"body"} sx={{m:2}} >
                سبد خرید شما خالی است
            </Typography>

        </Grid>
    </>);
};

export default UserBasket;
