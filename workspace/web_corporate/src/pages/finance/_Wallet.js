import React, {useContext, useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Stack,
    TextField,
    ToggleButton,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Image} from "react-bootstrap";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {suggest_query} from "../../network/api/suggest.api";
import {gatewayApplication_query} from "../../network/api/gatewayApplication.api";
import {increaseCorporateDeposit_requestIncreaseCorporateDeposits} from "../../network/api/increaseCorporateDeposit.api";
import {InsertComment} from "@mui/icons-material";
import AdapterJalaali from '@date-io/jalaali';

const _Wallet = () => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [suggests, setSuggests] = useState(null);


    const [amountToPay, SetAmountToPay] = useState(null);
    const [transactionReference, SetTransactionRefrence] = useState(null);
    const [transactionDescription, SetTransactionDescription] = useState(null);
    const [chequeDate, setChequeDate] = useState(null);
    const [paymentGatewaysApplication, setPaymentGatewaysApplication] = useState({});
    const [selectedGateway, setSelectedGatewayApplication] = useState(null);
    const [loading, setLoading] = useState(false);
    const [commentToggle, setCommentToggle] = useState(false);

    useEffect(() => {
        getPaymentGateways();
        getPaymentSuggest();
    }, []);

    function getPaymentGateways() {
        gatewayApplication_query({
            queryType: "FILTER",
            Application: "WEBCORPORATE",
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
            Application: "WEBCORPORATE",
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

    function submitPayment(e) {
        e.preventDefault()
        if (!amountToPay || parseInt(amountToPay) < 500000) {
            error.showError({message: "حداقل مبلغ شارژ 500،000 تومان می باشد",});
            return;
        }
        if (!selectedGateway) {
            error.showError({message: "درگاه انتخاب نشده",});
            return;
        }

        if(corporate?.Status=="DEMO"){
            error.showError({message: "برای وضعیت DEMO امکان شارژ وجود ندارد",});
            return;
        }


        setLoading(true);
        increaseCorporateDeposit_requestIncreaseCorporateDeposits({
            GatewayApplication: {Id: selectedGateway?.Id},
            TransactionReference: transactionReference,
            Application: "WEBCORPORATE",
            ChequeDate: chequeDate,
            TransactionType: "CHARGE_CORPORATE",
            Description: transactionDescription,
            Amount: amountToPay,
            CorporateId: corporate.Id
        }).then(result => {
            setLoading(false);
            if (result.data.Data.startsWith("http"))
                window.location.href = result.data.Data;
            else {
                setChequeDate(null);
                SetAmountToPay(0);
                SetTransactionRefrence(null);
                SetTransactionDescription(null);
                setOpenModalAdd(false);
                setCommentToggle(false);
                error.showError({message: "درخواست شما با موفقیت ثبت شد شماره پیگیری : " + result.data.Data,});
            }
        }).catch(e => {
            setLoading(false);
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

    function closeModal() {
        if (!loading) {
            setOpenModalAdd(false);
            setCommentToggle(false);
        }
    }

    function changeGateway(item){

        if(corporate?.Status==="DEMO"){
            error.showError({message: "این عملکرد در حالت DEMO فعال نیست",});
        }else{
            setSelectedGatewayApplication(item);
        }
    }

    function ModalDemandPayment() {
        return (
            <div>
                <Dialog open={openModalAdd} onClose={() => closeModal()}>
                    <DialogTitle>افزایش شارژ</DialogTitle>
                    <DialogContent>
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={loading}
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{padding: 1}}
                        >
                            <div className={"row"}>
                                {suggests && suggests.map((item, number) => (
                                    <div key={number} className={"col-6 p-2 text-center"}>
                                        <Button onClick={() => SetAmountToPay(item.Amount)}
                                                color={"info"}
                                                variant={"contained"}>{toPriceWithComma(item.Amount) + ' تومان'}</Button>
                                    </div>
                                ))}
                            </div>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                     component="div"/>

                            <Typography sx={{width: "100%", textAlign: "start", pt: 3, pr: 3}} variant={"subtitle1"}>
                                نوع پرداخت
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                                sx={{padding: 1}}
                            >

                                {paymentGatewaysApplication.content && paymentGatewaysApplication.content.map(item => (

                                    <Grid
                                        key={item.Id}
                                        xs={3}
                                        item
                                        onClick={() =>changeGateway(item)}
                                    >
                                        <Box
                                            sx={{border: (item.Gateway.Id == selectedGateway.Gateway.Id) ? "2px solid #37aa60" : "1px solid #ddd"}}>
                                            <Image width={"100%"} rounded={"8px"} src={item?.Gateway?.Image?.Url}/>
                                            <Typography sx={{width: "100%", textAlign: "center", minHeight: 55}}
                                                        variant={"subtitle1"}>
                                                {item.Gateway.Name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                     component="div"/>

                            <Typography sx={{width: "100%", textAlign: "start", pt: 3, pr: 3}} variant={"h5"}>
                                {selectedGateway?.Gateway?.Description}
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                                sx={{padding: 1}}
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


                                <LocalizationProvider
                                    dateAdapter={AdapterJalaali}>
                                    <DatePicker
                                        variant="outlined"
                                        mask="____/__/__"
                                        value={chequeDate || ""}
                                        onChange={(e, w) => {
                                            setChequeDate(Date.parse(e))
                                        }}
                                        renderInput={(params) =>

                                            <TextField
                                                hidden={selectedGateway?.Gateway?.GatewayType !== 'CHEQUE'}
                                                {...params}
                                                fullWidth
                                                sx={{mt: 3, direction: "ltr"}}
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

                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6">
                            {" شارژ : " + toPriceWithComma(corporate?.FinanceCorporate?.TotalDeposit || 0) + " تومان"}
                        </Typography>
                        <Button variant={"contained"} onClick={() => setOpenModalAdd(true)}>افزایش </Button>
                    </Stack>
                    <Typography variant="caption"
                                component={"a"}
                                href={"/finance/IncreaseHistory"}
                                sx={{textDecoration: "none", color: "#000000"}}>
                        مشاهده تاریخچه افزایش شارژ
                    </Typography>
                </CardContent>
            </Card>
            {ModalDemandPayment()}
        </>
    );
};

export default _Wallet;
