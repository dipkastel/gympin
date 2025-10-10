import React, {useContext, useState} from 'react';
import {Alert, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import _invoiceAgreements from "./_invoiceAgreements";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {invoice_SmartisCheckOut, invoice_userCheckout} from "../../../network/api/invoice.api";
import {useNavigate} from "react-router-dom";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";

const _InvoiceAction = ({userBasket, userCanPay, invoiceCredits, checkoutType}) => {

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

            if (checkoutType == "SMARTIS") {
                SmartisPay();
            } else {
                GympinPay();
            }

        }

        function SmartisPay() {
            var postData = {
                Invoice: {Id: userBasket.Id},
                Price: userBasket.TotalPrice,
                CheckoutType: checkoutType,
            }
            invoice_SmartisCheckOut(postData).then(result => {
                window.location = result.data.Data.toString();
            }).catch(e => {
                setLoading(false);
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        function GympinPay() {
            var checkout = [];
            invoiceCredits.filter(p => p.CreditPayableAmount > 0).map((invoiceCredit, Number) => {
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
                CheckoutType: checkoutType,
                Checkout: checkout,
            }
            invoice_userCheckout(postData).then(result => {
                error.showError({message: "پرداخت و رزرو انجام شد.",});
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
            <DialogTitle>{"تایید رزرو"}</DialogTitle>
            <DialogContent className={"w-100"}>
                <Alert sx={{mt: 2}} severity={"warning"}>
                    <Typography variant={"subtitle1"}>
                        مهلت مراجعه به مرکز و اولین استفاده بلیط، 72 ساعت از زمان رزرو می‌باشد
                    </Typography>
                    <Typography variant={"caption"}>◄ پس از این مدت، مبلغ بلیط به کیف پول مرجع برگشت داده میشود
                    </Typography>
                </Alert>
                <Alert sx={{mt: 2,mb:2}} severity={"info"}>
                    <Typography variant={"subtitle1"}>
                        رزرو به معنای پرداخت به مجموعه نیست! هنگام مراجعه به مجموعه، حتماً گوشی موبایل خود را به همراه داشته باشید و فرایند پرداخت را به یکی از روش های زیر تکمیل نمایید:
                    </Typography>
                    <Typography variant={"caption"}>◄ روش اول: QR کد داخل بلیط را برای اسکن، به متصدی مجموعه ورزشی ارائه کنید.
                    </Typography>
                    <br/>
                    <Typography variant={"caption"}>◄ روش دوم: از داخل بلیط، "توسط خودم" را انتخاب کرده و QR کد تابلو جیم پین در مجموعه ورزشی را اسکن کنید، سپس رسید را به متصدی ارائه دهید.
                    </Typography>
                </Alert>
                {userBasket && <_invoiceAgreements userBasket={userBasket} setAcceptAgreements={setAcceptAgreements}/>}
            </DialogContent>
            <DialogActions>
                <Button sx={{bgcolor: "#e7333e", borderRadius: 3, fontWeight: "bold", fontSize: 18, m: 1}}
                        size={"large"} disabled={!acceptAgreements} variant={"contained"} fullWidth
                        onClick={() => onConfirm()}>تایید رزرو</Button>
            </DialogActions>
        </Dialog>);
    }

    return (
        <>

            <Card elevation={6} sx={{p: 0, mx: 1, my: 2, borderRadius: 3}}>

                <Typography sx={{textAlign: "center", mt: 2, mb: 1}} variant={"h6"} color={"#14757e"}>
                    {"مجموع پرداخت : " + toPriceWithComma(userBasket.PriceToPay)}
                </Typography>
                {!loading && <Button sx={{bgcolor: "#e7333e", borderRadius: 3, fontWeight: "bold", fontSize: 18}} size={"large"}
                                     disabled={!userCanPay} variant={"contained"} fullWidth
                                     onClick={(e) => setOpenModalConfirm(true)}>تایید قوانین</Button>}
                {loading && <LinearProgress/>}
            </Card>
            {renderModalConfirm()}
        </>
    );
};

export default _InvoiceAction;
