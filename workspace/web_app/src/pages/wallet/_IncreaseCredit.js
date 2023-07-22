import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Card, Divider, Grid, TextField, Typography} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {transactions_getPaymentGateways, transactions_setPaymentRequest} from "../../network/api/transactions.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Image} from "react-bootstrap";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import AdapterJalali from "@date-io/date-fns-jalali";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

const _IncreaseCredit = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [amountToPay, SetAmountToPay] = useState(null);
    const [transactionReference, SetTransactionRefrence] = useState(null);
    const [chequeDate, setChequeDate] = useState(null);
    const [paymentGateways, setPaymentGateways] = useState(null);

    useEffect(() => {
        getPaymentGateways();
    }, []);

    function getPaymentGateways() {
        transactions_getPaymentGateways({Application:"WEBAPP"}).then(result => {
            setPaymentGateways(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getlabelOfRefrence() {
        if(!paymentGateways.find(p => p.IsDefault))
        return "نوع تراکنش انتخاب نشده";
        switch (paymentGateways.find(p => p.IsDefault).Id) {
            case 90:
                return "کد مرجع تراکنش";
                break;
            case 95:
                return "کد رهگیری پرداخت";
                break;
            case 98:
                return "شماره سریال چک";
                break;
            default:
                return "شناسایی ربات";
                break;
        }
    }
    function submitPayment(e) {
        e.preventDefault()
        if (!amountToPay || parseInt(amountToPay) < 0) {
            error.showError({message: "حداقل مبلغ شارژ 50،000 تومان می باشد",});
            return;
        }
        // if (!transactionReference) {
        //     error.showError({message: "کد مرجع تراکنش نمیتواند خالی باشد",});
        //     return;
        // }
        var selectedGatway = paymentGateways.filter(item => item.IsDefault == true)[0];
        transactions_setPaymentRequest({
            SelectedPaymentId: selectedGatway.Id,
            TransactionType: "CHARGE_USER",
            TransactionReference: transactionReference,
            ChequeDate: chequeDate,
            Amount: amountToPay,
            UserId: currentUser.Id
        }).then(result => {
            if(result.data.Data.startsWith("http"))
                window.location.href = result.data.Data;
            else{
                SetTransactionRefrence("");
                SetAmountToPay(null);
                error.showError({message: "درخواست شما با موفقیت ثبت شد برای پیگیری به تاریخچه مراجعه نمایید.",duration:5000});

            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function changePaymentType(selected) {
        let items = paymentGateways.map(item => {
            if (item.IsDefault) item.IsDefault = false;
            return item;
        });
        var newItems = items.map(item => {
            if (item.Id == selected.Id)
                item.IsDefault = true;
            return item;
        })
        SetTransactionRefrence("");
        setPaymentGateways(newItems);
    }


    return (<>
            {paymentGateways&& <Card elevation={3} sx={{margin: 1}}>


                <Typography
                    sx={{display: "inline", margin: 1}}
                    component="p"
                    variant="subtitle1"
                    color="text.primary"
                >
                    افزایش اعتبار شخصی
                </Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{padding: 1}}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1}}
                    >
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(1000000)} color={"info"} variant={"contained"}>1,000,000
                            تومان</Button>
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(2000000)} color={"info"} variant={"contained"}>2,000,000
                            تومان</Button>
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(4000000)} color={"info"} variant={"contained"}>4,000,000
                            تومان</Button>
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(5000000)} color={"info"}
                                variant={"contained"}>5,000,000 تومان</Button>
                    </Grid>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>

                    <Typography sx={{width: "100%", textAlign: "start",pt: 3,pr: 3}} variant={"subtitle1"}>
                       نوع پرداخت
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1}}
                        md={6}
                        lg={4}
                        xs={12}
                    >

                        {paymentGateways.map(item => (

                            <Grid
                                xs={3}
                                item
                                onClick={() => changePaymentType(item)}
                            >
                                <Box sx={(item.IsDefault) ? {border: "2px solid #37aa60"} : {border: "1px solid #ddd"}}>
                                    <Image width={"100%"} rounded={"8px"} src={item.ImageUrl}/>
                                    <Typography sx={{width: "100%", textAlign: "center"}} variant={"subtitle1"}>
                                        {item.Name}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>

                    <Typography sx={{width: "100%", textAlign: "start",pt: 3,pr: 3}} variant={"h5"}>
                        {paymentGateways.find(p => p.IsDefault)&&paymentGateways.find(p => p.IsDefault).Description}
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1}}
                    >


                        <TextField
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="code"
                            value={toPriceWithComma(amountToPay)}
                            type="text"
                            onChange={e => SetAmountToPay(toPriceWithoutComma(e.target.value))}
                            label={"مبلغ دلخواه به تومان"}
                        />
                        <TextField
                            hidden={paymentGateways.length > 0 ? (![95, 98, 90].includes(paymentGateways.find(p => p.IsDefault).Id)) : false}
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="code"
                            value={transactionReference}
                            type="text"
                            onChange={e => SetTransactionRefrence(e.target.value)}
                            label={getlabelOfRefrence()}
                        />


                        <LocalizationProvider
                           dateAdapter={AdapterJalali}>
                            <DatePicker
                                variant="outlined"
                                mask="____/__/__"
                                value={chequeDate||""}
                                onChange={(e,w)=>{
                                    setChequeDate(Date.parse(e))
                                }}
                                renderInput={(params) =>

                                    <TextField
                                        hidden={paymentGateways.length > 0 ? (![98].includes(paymentGateways.find(p => p.IsDefault).Id)) : false}
                                        {...params}
                                        fullWidth
                                        sx={{mt:3,direction:"ltr"}}
                                        className="w-100"
                                        variant="outlined"
                                        margin="normal"
                                        label={"تاریخ چک"}
                                    />
                                }
                            />
                        </LocalizationProvider>

                        <Button
                            edge="end"
                            aria-label="Toggle password visibility"
                            variant={"contained"}
                            fullWidth
                            onClick={(e) => submitPayment(e)}
                        > پرداخت
                        </Button>
                        <form action={"http://localhost:8080/api/v1/parsianGateway/CallbackMethod?ref=WEBAPP"} method={"post"} content>

                            <input name="OrderId" id="OrderId" value="495" />
                            <input name="Token" id="Token" value="244692623186415" />
                            <input name="TerminalNo" id="TerminalNo" value="45028996" />
                            <input name="RRN" id="RRN" value="739090967988" />
                            <input name="status" id="status" value="0" />
                            <input name="Amount" id="Amount" value="100000" />
                            <input name="SwAmount" id="SwAmount" value="" />
                            <input name="HashCardNumber" id="HashCardNumber" value="E12B95B96392499B1AC6A613309233C5127EB7CA220BFC7402959B9E796D5B5E" />
                            <Button
                                edge="end"
                                aria-label="Toggle password visibility"
                                variant={"contained"}
                                fullWidth
                                type={"submit"}
                            >Go
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Card>}
        </>
    );
};

export default _IncreaseCredit;
