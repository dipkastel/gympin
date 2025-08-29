import React, {useContext, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, LinearProgress,
    Typography
} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import _invoiceAgreements from "./_invoiceAgreements";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {invoice_SmartisCheckOut, invoice_userCheckout} from "../../../network/api/invoice.api";
import {useNavigate} from "react-router-dom";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";

const _InvoiceAction = ({userBasket, userCanPay, invoiceCredits,checkoutType}) => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth.user);
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [acceptAgreements, setAcceptAgreements] = useState(false)
    const [loading, setLoading] = useState(false)


    function renderModalConfirm() {
        function onConfirm() {

            if (!acceptAgreements) {
                error.showError({message: "تمام قوانین باید خوانده و تایید شوند.",});
                return;
            }
            setOpenModalConfirm(false);
            setLoading(true);

            if(checkoutType=="SMARTIS"){
                SmartisPay();
            }else{
                GympinPay();
            }

        }

        function SmartisPay(){
            var postData = {
                Invoice: {Id: userBasket.Id},
                Price: userBasket.TotalPrice,
                CheckoutType:checkoutType,
            }

            console.log(postData)
            invoice_SmartisCheckOut(postData).then(result => {
                console.log(result)
                window.location = result.data.Data.toString();
            }).catch(e => {
                setLoading(false);
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log("خطا - 22")
                }
            })
        }
        function GympinPay(){
            var checkout = [];
            invoiceCredits.filter(p => p.CreditPayableAmount > 0).map((invoiceCredit,Number) => {
                checkout.push({
                    CreditType: invoiceCredit.CreditType,
                    PersonnelId: invoiceCredit.PersonnelId,
                    priority: Number,
                    amount: invoiceCredit.CreditPayableAmount,
                })
            });
            var postData = {
                Invoice: {Id: userBasket.Id},
                Price: userBasket.TotalPrice,
                CheckoutType:checkoutType,
                Checkout: checkout,
            }
            invoice_userCheckout(postData).then(result => {
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
            sx={{zIndex: 99999999}}
            className={"w-100"}
            open={openModalConfirm} onClose={() => setOpenModalConfirm(false)}>
            <DialogTitle>{"تایید نهایی"}</DialogTitle>
            <DialogContent className={"w-100"}>
                <Typography variant={"subtitle2"} sx={{mb:2}}>
                    توجه داشته باشید امکان لغو یا بازپرداخت بلیط های خریداری شده وجود ندارد!
                </Typography>
                {userBasket && <_invoiceAgreements userBasket={userBasket} setAcceptAgreements={setAcceptAgreements}/>}
                <Alert sx={{mt:2}} severity={"warning"} >
                    <Typography variant={"subtitle2"}>
                        مهلت مراجعه به مرکز و اولین استفاده بلیط ها، از زمان خرید تا 72 ساعت می باشد.
                    </Typography>
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button sx={{bgcolor: "#e7333e", borderRadius: 3, fontWeight: "bold", fontSize: 18, m: 1}}
                        size={"large"} disabled={!acceptAgreements} variant={"contained"} fullWidth
                        onClick={() => onConfirm()}>تایید خرید</Button>
            </DialogActions>
        </Dialog>);
    }

    return (
        <>

            <Card elevation={6} sx={{p: 0, mx: 1, my: 2, borderRadius: 3}}>

                <Typography sx={{textAlign: "center", mt: 2, mb: 1}} variant={"h6"} color={"#14757e"}>
                    {"مجموع پرداخت : " + toPriceWithComma(userBasket.PriceToPay)}
                </Typography>
                {!loading&&<Button sx={{bgcolor: "#e7333e", borderRadius: 3, fontWeight: "bold", fontSize: 18}} size={"large"}
                        disabled={!userCanPay} variant={"contained"} fullWidth
                        onClick={(e) => setOpenModalConfirm(true)}>تایید قوانین</Button>}
                {loading&&<LinearProgress />}
            </Card>
            {renderModalConfirm()}
        </>
    );
};

export default _InvoiceAction;
