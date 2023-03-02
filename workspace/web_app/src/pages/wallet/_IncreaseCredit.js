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
    const [paymentGateways, setPaymentGateways] = useState([]);

    useEffect(() => {
        getPaymentGateways();
    }, []);

    function getPaymentGateways() {
        transactions_getPaymentGateways({}).then(result => {
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
        if (!amountToPay || parseInt(amountToPay) < 5000) {
            error.showError({message: "حداقل مبلغ شارژ 5،000 تومان می باشد",});
            return;
        }
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
            else
                error.showError({message: "درخواست شما با موفقیت ثبت شد شماره پیگیری : "+result.data.Data,});
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
            <Card elevation={3} sx={{margin: 1}}>


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
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(200000)} color={"info"} variant={"contained"}>200,000
                            تومان</Button>
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(400000)} color={"info"} variant={"contained"}>400,000
                            تومان</Button>
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(800000)} color={"info"} variant={"contained"}>800,000
                            تومان</Button>
                        <Button sx={{m: 2}} onClick={() => SetAmountToPay(1000000)} color={"info"}
                                variant={"contained"}>1,000,000 تومان</Button>
                    </Grid>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="div"/>
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
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default _IncreaseCredit;
