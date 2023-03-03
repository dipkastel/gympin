import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, Grid,
    Stack, TextField,
    Typography
} from "@mui/material";
import {corporate_getTotalDeposit} from "../../network/api/corporate.api";
import {useSelector} from "react-redux";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Image} from "react-bootstrap";
import {transactions_getPaymentGateways, transactions_setPaymentRequest} from "../../network/api/transactions.api";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import AdapterJalali from "@date-io/date-fns-jalali";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

const _Wallet = () => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [totalDeposit, setTotalDeposit] = useState(0);

    const [amountToPay, SetAmountToPay] = useState(null);
    const [transactionReference, SetTransactionRefrence] = useState(null);
    const [chequeDate, setChequeDate] = useState(null);
    const [paymentGateways, setPaymentGateways] = useState([]);

    useEffect(() => {
        getTotalDeposit();
        getPaymentGateways();
    }, []);

    function getTotalDeposit() {
        corporate_getTotalDeposit({CorporateId:corporate.Id}).then(result=>{
            setTotalDeposit(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }
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

    function submitPayment(e) {
        e.preventDefault()
        if (!amountToPay || parseInt(amountToPay) < 50000) {
            error.showError({message: "حداقل مبلغ شارژ 50،000 تومان می باشد",});
            return;
        }
        var selectedGatway = paymentGateways.filter(item => item.IsDefault == true)[0];
        setOpenModalAdd(false)
        transactions_setPaymentRequest({
            SelectedPaymentId: selectedGatway.Id,
            TransactionReference: transactionReference,
            ChequeDate: chequeDate,
            TransactionType: "CHARGE_CORPORATE",
            Amount: amountToPay,
            CorporateId: corporate.Id
        }).then(result => {
            if(result.data.Data.startsWith("http"))
                window.location.href = result.data.Data;
            else{
                setChequeDate(null);
                SetAmountToPay(0);
                SetTransactionRefrence(null);
                error.showError({message: "درخواست شما با موفقیت ثبت شد شماره پیگیری : "+result.data.Data,});
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


    function ModalDemandPayment(){
        return (
            <div>
                <Dialog open={openModalAdd} onClose={()=>setOpenModalAdd(false)}>
                    <DialogTitle>افزایش اعتبار</DialogTitle>
                    <DialogContent >
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
                                <Button sx={{m: 2}} onClick={() => SetAmountToPay(5000000)} color={"info"} variant={"contained"}>5,000,000
                                    تومان</Button>
                                <Button sx={{m: 2}} onClick={() => SetAmountToPay(10000000)} color={"info"} variant={"contained"}>10,000,000
                                    تومان</Button>
                                <Button sx={{m: 2}} onClick={() => SetAmountToPay(30000000)} color={"info"} variant={"contained"}>30,000,000
                                    تومان</Button>
                                <Button sx={{m: 2}} onClick={() => SetAmountToPay(60000000)} color={"info"}
                                        variant={"contained"}>60,000,000 تومان</Button>
                                <Button sx={{m: 2}} onClick={() => SetAmountToPay(80000000)} color={"info"}
                                        variant={"contained"}>80,000,000 تومان</Button>
                                <Button sx={{m: 2}} onClick={() => SetAmountToPay(100000000)} color={"info"}
                                        variant={"contained"}>100,000,000 تومان</Button>
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
                            >

                                {paymentGateways.map(item => (

                                    <Grid
                                        key={item.Id}
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
                                    value={toPriceWithComma(amountToPay||0)}
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
                                    value={transactionReference||""}
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
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent
                    >
                    مانده شارژ شما :
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6" >
                            {toPriceWithComma(totalDeposit)+" تومان"}
                        </Typography>
                        <Button variant={"contained"} onClick={()=>setOpenModalAdd(true)}>افزایش اعتبار</Button>
                    </Stack>
                    <Typography  variant="caption"
                                 component={"a"}
                                 href={"/finance/IncreaseList"}
                                 sx={{textDecoration:"none",color:"#000000"}}>
                        مشاهده تاریخچه افزایش اعتبار
                    </Typography>
                </CardContent>
            </Card>
            {ModalDemandPayment()}
        </>
    );
};

export default _Wallet;
