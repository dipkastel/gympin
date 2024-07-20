import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {purchasedSubscribe_checkout} from "../../../network/api/purchasedSubscribe.api";
import {toPriceWithComma} from "../../../helper/utils";
import _invoiceAgreements from "./_invoiceAgreements";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {invoice_checkout, invoice_userCheckout} from "../../../network/api/invoice.api";
import {useNavigate} from "react-router-dom";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";

const _InvoiceAction = ({userBasket,userCanPay,invoiceCredits}) => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth.user);
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [acceptAgreements, setAcceptAgreements] = useState(false)
    const [loading, setLoading] = useState(false)




    function renderModalConfirm() {
        function onConfirm(){
            if(!acceptAgreements){
                        error.showError({message: "تمام قوانین باید خوانده و تایید شوند.",});
                    return;
            }
            setOpenModalConfirm(false);
            setLoading(true);
            var checkout = [];
            invoiceCredits.filter(p => p.ReducedPrice > 0).map(invoiceCredit => {
                checkout.push({
                    CreditType: invoiceCredit.Credit.CreditType,
                    PersonnelId: invoiceCredit.Credit.PersonnelId,
                    priority: invoiceCredit.Periority,
                    amount: invoiceCredit.ReducedPrice,

                })
            });
            var postData = {
                Invoice: {Id: userBasket.Id},
                Price: userBasket.TotalPrice,
                Checkout: checkout,
            }
            invoice_userCheckout(postData).then(result=>{
                error.showError({message: "پرداخت انجام شد.",});
                store.dispatch(sagaActions.RequestUserInvoices(currentUser))
                store.dispatch(sagaActions.RequestUser())
                navigate("/tickets", {replace: false});
            }).catch(e => {
                setLoading(false);
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (<Dialog
            sx={{zIndex:99999999}}
            className={"w-100"}
            open={openModalConfirm} onClose={() => setOpenModalConfirm(false)}>
            <DialogTitle>{"آیا از خرید عضویت اطمینان دارید"}</DialogTitle>
            <DialogContent className={"w-100"}>
                <Typography variant={"subtitle2"}>
                    توجه داشته باشید امکان لغو یا بازپرداخت بلیط های خریداری شده وجود ندارد!
                </Typography>
                {userBasket&&<_invoiceAgreements userBasket={userBasket} setAcceptAgreements={setAcceptAgreements}/>}
            </DialogContent>
            <DialogActions>
                <Button disabled={!acceptAgreements} sx={{m: 1}} variant={"contained"} color={"success"}
                        onClick={() => onConfirm()}>تایید خرید</Button>
            </DialogActions>
        </Dialog>);
    }

    return (
        <>
            <Card elevation={3} sx={{m: 1}}>
                <CardContent>
                    <Button  disabled={!userCanPay||loading} variant={"contained"} fullWidth color={"success"} onClick={(e)=>setOpenModalConfirm(true)} >تکمیل خرید</Button>
                </CardContent>
            </Card>
            {renderModalConfirm()}
        </>
    );
};

export default _InvoiceAction;
