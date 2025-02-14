import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Dialog,
    DialogTitle,
    Divider,
    Grid2 as Grid,
    IconButton,
    TextField,
    ToggleButton,
    Typography
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {gatewayApplication_query} from "../../network/api/gatewayApplication.api";
import {suggest_query} from "../../network/api/suggest.api";
import {InsertComment, QrCode} from "@mui/icons-material";
import {increaseUserDeposit_requestIncreaseUserDeposits} from "../../network/api/increaseUserDeposit.api";
import _ScannerCore from "../qrCode/scanner/_ScannerCore";
import {gift_claim} from "../../network/api/GiftCredits.api";
import store from "../../helper/redux/store";
import {sagaActions} from "../../helper/redux/actions/SagaActions";

const _IncreaseCredit = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [amountToPay, SetAmountToPay] = useState(null);
    const [transactionReference, SetTransactionRefrence] = useState(null);
    const [chequeDate, setChequeDate] = useState(null);
    const [paymentGatewaysApplication, setPaymentGatewaysApplication] = useState(null);
    const [selectedGateway, setSelectedGatewayApplication] = useState(null);
    const [giftLoading, setGiftLoading] = useState(false);
    const [suggests, setSuggests] = useState(null);
    const [commentToggle, setCommentToggle] = useState(false);
    const [transactionDescription, SetTransactionDescription] = useState(null);
    const [openModalScan, setOpenModalScan] = useState(false);
    const [scannedCode, SetScannedCode] = useState(null);
    const [lastScanedCode, SetLastScanedCode] = useState(null);

    useEffect(() => {
        getPaymentGateways();
        getPaymentSuggest();
    }, []);


    useEffect(() => {
        if (scannedCode&&scannedCode !== lastScanedCode) {
            SetLastScanedCode(scannedCode);
            claimGift();
        }
    }, [scannedCode]);


    function claimGift() {
        setGiftLoading(true);
        var code = "";
        try {
            if (scannedCode.startsWith("G"))
                code = scannedCode
            else
                code = scannedCode.split('/')[scannedCode.split('/').length - 1];
        } catch (ex) {
            error.showError({message: "کد نامعتبر",});
        }
        gift_claim({Code: code, User: {Id: currentUser.Id}}).then(result => {
            try {
            setGiftLoading(false);
            SetScannedCode(null);
            setOpenModalScan(false);
            } catch (e) {
            }
            try {
                error.showError({message: "با موفقیت وارد شد",});
                store.dispatch(sagaActions.RequestUser())
            } catch (e) {
            }
        }).catch(e => {
            setGiftLoading(false);
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function getPaymentGateways() {
        gatewayApplication_query({
            queryType: "FILTER",
            Application: "WEBAPP",
            paging: {Page: 0, Size: 300, orderBy: "Id", Desc: false}
        }).then(result => {
            setPaymentGatewaysApplication(result.data.Data);
            try {
                setSelectedGatewayApplication(result.data.Data.content.filter(g => g.IsDefault == true)[0])
            } catch (e) {
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getPaymentSuggest() {
        suggest_query({
            queryType: "FILTER",
            Application: "WEBAPP",
            paging: {Page: 0, Size: 300, orderBy: "amount", Desc: false}
        }).then(result => {
            setSuggests(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function getlabelOfRefrence() {
        if (!selectedGateway)
            return "نوع تراکنش انتخاب نشده";
        switch (selectedGateway?.Gateway?.GatewayType) {
            case 'CARD_TRANSFER':
                return "کد مرجع تراکنش";
                break;
            case 'BANK_TRANSFER':
                return "کد رهگیری پرداخت";
                break;
            case 'CHEQUE':
                return "شماره سریال چک";
                break;
            default:
                return "شناسایی ربات";
                break;
        }
    }

    function submitPayment(e) {
        e.preventDefault()
        if (!amountToPay || parseInt(amountToPay) < 10000) {
            error.showError({message: "حداقل مبلغ شارژ 10000 تومان می باشد",});
            return;
        }
        if (!selectedGateway) {
            error.showError({message: "درگاه انتخاب نشده",});
            return;
        }
        // if (!transactionReference) {
        //     error.showError({message: "کد مرجع تراکنش نمیتواند خالی باشد",});
        //     return;
        // }

        increaseUserDeposit_requestIncreaseUserDeposits({
            GatewayApplication: {Id: selectedGateway?.Id},
            TransactionReference: transactionReference,
            Application: "WEBAPP",
            ChequeDate: chequeDate,
            TransactionType: "CHARGE_CORPORATE",
            Description: transactionDescription,
            Amount: amountToPay,
            UserId: currentUser.Id
        }).then(result => {
            if (result.data.Data.startsWith("http"))
                window.location.href = result.data.Data;
            else {
                SetTransactionRefrence("");
                SetTransactionDescription("");
                SetAmountToPay(null);
                error.showError({
                    message: "درخواست شما با موفقیت ثبت شد برای پیگیری به تاریخچه درخواست‌ها مراجعه نمایید.",
                    duration: 5000
                });

            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function renderModalScan() {
        return (<Dialog
            className={"w-100"}
            open={openModalScan} onClose={() => setOpenModalScan(false)}>
            <DialogTitle>{"کارت خود را اسکن کنید"}</DialogTitle>
            {giftLoading ? (<Grid sx={{p:2,textAlign:"center"}}><CircularProgress/></Grid>) : (<_ScannerCore scannWork={(!scannedCode)} onFind={(e) => {
                SetScannedCode(e);
            }}/>)}

        </Dialog>);
    }


    return (<>
            {paymentGatewaysApplication && <Card elevation={6} sx={{margin: 1, pb: 2}}>
                <CardHeader
                    title={<Typography
                        sx={{display: "inline", p: 1}}
                        component="p"
                        variant="subtitle1"
                        color="text.primary"
                    >
                        افزایش اعتبار شخصی
                    </Typography>}


                    action={<IconButton onClick={() => setOpenModalScan(true)}><QrCode/></IconButton>}

                >

                </CardHeader>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}} component="div"/>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{padding: 1}}
                >
                    {((amountToPay || 0) < 1) && <>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            sx={{padding: 1}}
                            columns={3}
                            spacing={1}
                        >
                            {suggests && suggests.map(suggest => (
                                <Grid size={1} key={"suggest-" + suggest.Id}>
                                    <Button sx={{m: 0.2, py: 2, boxShadow: "none"}} fullWidth
                                            onClick={() => SetAmountToPay(suggest.Amount)} color={"gray"}
                                            variant={"contained"}>{toPriceWithComma(suggest.Amount) + " تومان "}</Button>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider variant="inset" sx={{ml: 0, mr: 0, mt: 1, width: "100%"}} component="div"/>


                    </>}

                    {/*<Typography sx={{width: "100%", textAlign: "start", pt: 3, pr: 3}} variant={"subtitle1"}>*/}
                    {/*    نوع پرداخت*/}
                    {/*</Typography>*/}
                    {/*<Grid*/}
                    {/*    container*/}
                    {/*    direction="row"*/}
                    {/*    justifyContent="space-around"*/}
                    {/*    alignItems="center"*/}
                    {/*    sx={{padding: 1}}*/}
                    {/*    md={6}*/}
                    {/*    lg={4}*/}
                    {/*    item*/}
                    {/*    xs={12}*/}
                    {/*>*/}

                    {/*    {paymentGatewaysApplication.content && paymentGatewaysApplication.content.map(item => (*/}

                    {/*        <Grid*/}
                    {/*            key={item.Id}*/}
                    {/*            xs={3}*/}
                    {/*            item*/}
                    {/*            onClick={() => setSelectedGatewayApplication(item)}*/}
                    {/*        >*/}
                    {/*            <Box*/}
                    {/*                sx={{border: (item.Gateway.Id == selectedGateway.Gateway.Id) ? "2px solid #37aa60" : "1px solid #ddd"}}>*/}
                    {/*                <Image width={"100%"} rounded={"8px"} src={item?.Gateway?.Image?.Url}/>*/}
                    {/*                <Typography sx={{width: "100%", textAlign: "center", minHeight: 55}}*/}
                    {/*                            variant={"subtitle1"}>*/}
                    {/*                    {item.Gateway.Name}*/}
                    {/*                </Typography>*/}
                    {/*            </Box>*/}
                    {/*        </Grid>*/}
                    {/*    ))}*/}
                    {/*</Grid>*/}

                    {/*<Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}} component="div"/>*/}

                    <Typography sx={{width: "100%", textAlign: "start", pt: 1, pr: 3}} variant={"h5"}>
                        {selectedGateway?.Gateway?.Description}
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{px: 1}}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="code"
                            sx={{flex: "auto"}}
                            value={toPriceWithComma(amountToPay || 0)}
                            type="text"
                            onChange={e => SetAmountToPay(toPriceWithoutComma(e.target.value))}
                            label={"مبلغ دلخواه به تومان"}
                        />
                        <ToggleButton
                            sx={{margin: "9px 9px 0px 0px"}}
                            value="comment"
                            onClick={(e) => setCommentToggle(!commentToggle)}
                        >
                            <InsertComment/>
                        </ToggleButton>
                        <TextField
                            hidden={!commentToggle}
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="description"
                            value={transactionDescription || ""}
                            multiline={true}
                            minRows={3}
                            type="text"
                            onChange={e => SetTransactionDescription(e.target.value)}
                            label={"در صورت نیاز توضیح درج شود."}
                        />

                        <TextField
                            hidden={selectedGateway?.Gateway?.GatewayType == 'BANK_PORTAL'}
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="code"
                            value={transactionReference || ""}
                            type="text"
                            onChange={e => SetTransactionRefrence(e.target.value)}
                            label={getlabelOfRefrence()}
                        />


                        {/*<LocalizationProvider*/}
                        {/*    dateAdapter={AdapterDateFnsJalali}>*/}
                        {/*    <DatePicker*/}
                        {/*        variant="outlined"*/}
                        {/*        mask="____/__/__"*/}
                        {/*        value={chequeDate || ""}*/}
                        {/*        onChange={(e, w) => {*/}
                        {/*            setChequeDate(Date.parse(e))*/}
                        {/*        }}*/}
                        {/*        renderInput={(params) =>*/}

                        {/*            <TextField*/}
                        {/*                hidden={selectedGateway?.Gateway?.GatewayType !== 'CHEQUE'}*/}
                        {/*                {...params}*/}
                        {/*                fullWidth*/}
                        {/*                sx={{mt: 3, direction: "ltr"}}*/}
                        {/*                className="w-100"*/}
                        {/*                variant="outlined"*/}
                        {/*                margin="normal"*/}
                        {/*                label={"تاریخ چک"}*/}
                        {/*            />*/}
                        {/*        }*/}
                        {/*    />*/}
                        {/*</LocalizationProvider>*/}

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
            </Card>}
            {renderModalScan()}
        </>
    );
};

export default _IncreaseCredit;
