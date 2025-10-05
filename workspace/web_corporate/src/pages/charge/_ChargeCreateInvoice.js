import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid2 as Grid,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Form, Image} from "react-bootstrap";
import {gatewayApplication_query} from "../../network/api/gatewayApplication.api";
import {suggest_query} from "../../network/api/suggest.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {getTax} from "../../helper/serverSettingsHelper";
import {
    increaseCorporateDeposit_requestIncreaseCorporateDeposits,
    increaseCorporateDeposit_requestIncreaseCorporateDepositsDraft
} from "../../network/api/increaseCorporateDeposit.api";

const _ChargeCreateInvoice = ({refreshList}) => {


    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [paymentGatewaysApplication, setPaymentGatewaysApplication] = useState({});
    const [suggests, setSuggests] = useState(null);
    const [amountToPay, SetAmountToPay] = useState(null);
    const [transactionReference, SetTransactionRefrence] = useState(null);
    const [transactionDescription, SetTransactionDescription] = useState(null);
    const [chequeDate, setChequeDate] = useState(null);
    const [requestInvoice, setRequestInvoice] = useState(false);
    const [selectedGateway, setSelectedGatewayApplication] = useState(null);
    const [requestProFormaInvoice, setRequestProFormaInvoice] = useState(false);
    const [openModalFastPay, setOpenModalFastPay] = useState(false);

    const [serverSettings] = useState(useSelector(settings => settings));
    const taxPrice = getTax(serverSettings)


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


    function changeGateway(item) {
        if (corporate?.Status === "DEMO" || corporate?.Status == "SECURE_DEMO") {
            error.showError({message: "این عملکرد در حالت DEMO فعال نیست",});
        } else {
            if(item?.Gateway?.GatewayType=="BANK_PORTAL")
                setRequestProFormaInvoice(false)
            setSelectedGatewayApplication(item);
        }
    }

    function submitPaymentDraft(e) {
        e.preventDefault()
        if (!getAmountToPay() || parseInt(getAmountToPay()) < 500000) {
            error.showError({message: "حداقل مبلغ شارژ 500،000 تومان می باشد",});
            return;
        }
        if (!selectedGateway) {
            error.showError({message: "درگاه انتخاب نشده",});
            return;
        }

        if (corporate?.Status == "DEMO" || corporate?.Status == "SECURE_DEMO") {
            error.showError({message: "برای وضعیت DEMO امکان شارژ وجود ندارد",});
            return;
        }
        increaseCorporateDeposit_requestIncreaseCorporateDepositsDraft({
            GatewayApplication: {Id: selectedGateway?.Id},
            TransactionReference: transactionReference,
            Application: "WEBCORPORATE",
            ChequeDate: chequeDate,
            Draft: true,
            RequestInvoice: requestInvoice,
            TransactionType: "CHARGE_CORPORATE",
            Description: transactionDescription,
            Amount: getAmountToPay(),
            CorporateId: corporate.Id
        }).then(result => {
            refreshList();
            // if (result.data.Data.startsWith("http"))
            //     window.location.href = result.data.Data;
            // else {
            //     setChequeDate(null);
            //     SetAmountToPay(null);
            //     SetTransactionRefrence(null);
            //     SetTransactionDescription(null);
            //     setCommentToggle(false);
            //     setOpenConfirmPage(false);
            //     error.showError({message: "درخواست شما با موفقیت ثبت شد شماره پیگیری : " + result.data.Data,});
            // }
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


    function getTaxAmount() {
        return parseInt(amountToPay) * (parseInt(taxPrice) / 100);
    }

    function getAmountToPay() {
        return parseInt(amountToPay) + getTaxAmount();
    }


    function renderModalFastPay() {

        function pay(e) {
            e.preventDefault();
            if(!transactionReference){
                error.showError({message: getlabelOfRefrence()+" الزامی است",});
                return;
            }
            increaseCorporateDeposit_requestIncreaseCorporateDeposits({
                GatewayApplication: {Id: selectedGateway?.Id},
                TransactionReference: transactionReference,
                Application: "WEBCORPORATE",
                ChequeDate: chequeDate,
                Draft: true,
                RequestInvoice: requestInvoice,
                TransactionType: "CHARGE_CORPORATE",
                Description: transactionDescription,
                Amount: getAmountToPay(),
                CorporateId: corporate.Id
            }).then(result => {
                if (result.data.Data.startsWith("http"))
                    window.location.href = result.data.Data;
                else {
                    setChequeDate(null);
                    SetAmountToPay(null);
                    SetTransactionRefrence(null);
                    SetTransactionDescription(null);
                    setOpenModalFastPay(false);
                    error.showError({message: "درخواست شما با موفقیت ثبت شد شماره پیگیری : " + result.data.Data,});
                }
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (<Dialog open={openModalFastPay} onClose={() => setOpenModalFastPay(false)}>
            <Form onSubmit={(e) => pay(e)}>
                <DialogTitle>پرداخت سریع</DialogTitle>
                <DialogContent>
                    <TableContainer fullWidth>
                        <Table aria-label="invoice">
                            <TableHead>
                                <TableRow sx={{bgcolor: "primary.boxBg"}}>
                                    <TableCell align="start">مورد</TableCell>
                                    <TableCell align="right">قیمت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell align="start">افزایش شارژ</TableCell>
                                    <TableCell align="right">{toPriceWithComma(amountToPay)}</TableCell>
                                </TableRow>
                                {/*<TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}}}>*/}
                                {/*    <TableCell align="start">{taxPrice + "%"} مالیات بر ارزش افزوده</TableCell>*/}
                                {/*    <TableCell align="right">{toPriceWithComma(getTaxAmount())}</TableCell>*/}
                                {/*</TableRow>*/}
                                <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}, bgcolor: "primary.boxBg"}}>
                                    <TableCell align="start">قابل پرداخت</TableCell>
                                    <TableCell align="right">{toPriceWithComma(getAmountToPay())}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography hidden={!selectedGateway?.Gateway?.Description} sx={{width: "100%", textAlign: "justify", pt: 3, pr: 3}}
                                variant={"h6"}>
                        {selectedGateway?.Gateway?.Description}
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems="center"
                        sx={{padding: 1}}
                    >

                        <TextField
                            hidden={selectedGateway?.Gateway?.GatewayType == 'BANK_PORTAL'}
                            variant="outlined"
                            margin="normal"
                            sx={{flex: "auto"}}
                            type="text"
                            name="code"
                            value={transactionReference || ""}
                            onChange={e => SetTransactionRefrence(e.target.value)}
                            label={getlabelOfRefrence()}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"error"}
                            onClick={() => setOpenModalFastPay(false)}>لغو</Button>
                    <Button type={"submit"} variant={"contained"} color={"success"}>پرداخت</Button>

                </DialogActions>
            </Form>
        </Dialog>);
    }

    function openModalFastPayAction() {

        if (!getAmountToPay() || parseInt(getAmountToPay()) < 500000) {
            error.showError({message: "حداقل مبلغ شارژ 500،000 تومان می باشد",});
            return;
        }
        if (!selectedGateway) {
            error.showError({message: "درگاه انتخاب نشده",});
            return;
        }

        if (corporate?.Status == "DEMO" || corporate?.Status == "SECURE_DEMO") {
            error.showError({message: "برای وضعیت DEMO امکان شارژ وجود ندارد",});
            return;
        }
        setOpenModalFastPay(true);
    }

    return (
        <>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{padding: 1}}
                size={6}
            >

                <Card elevation={3} sx={{p: 2, borderRadius: 5, width: "100%", mb: 2}}>
                    <Grid
                        container
                        sx={{width: "100%", justifyContent: "space-around"}}
                        direction="row"
                        textAlign={"center"}
                        alignItems="center"
                    >
                        {suggests && suggests.map((item, number) => (
                            <Grid key={number} size={{md: 6, sx: 6}}>
                                <Button onClick={() => SetAmountToPay(toPriceWithoutComma(item.Amount))}
                                        color={"info"}
                                        sx={{px: 5, py: 2, m: 1}}
                                        variant={"outlined"}>{toPriceWithComma(item.Amount) + ' تومان'}</Button>
                            </Grid>
                        ))}
                    </Grid>
                </Card>

                <Card elevation={3} sx={{p: 2, borderRadius: 5, width: "100%", mb: 2}}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1, mb: 2}}
                    >

                        {paymentGatewaysApplication.content && paymentGatewaysApplication.content.map(item => (

                            <Grid
                                key={item.Id}
                                size={{xs: 3}}
                                onClick={() => changeGateway(item)}
                            >
                                <Box
                                    sx={{
                                        border: (item.Gateway.Id == selectedGateway.Gateway.Id) ? "2px solid #37aa60" : "0px solid #ddd",
                                        maxWidth: 200,
                                        borderRadius: 2,
                                        p: (item.Gateway.Id == selectedGateway.Gateway.Id) ? 1 : 0,
                                    }}>
                                    <Image width={"100%"} rounded={"8px"} src={item?.Gateway?.Image?.Url}/>
                                    <Typography sx={{width: "100%", textAlign: "center", minHeight: 55, mt: 2}}
                                                variant={"subtitle1"}>
                                        {item.Gateway.Name}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
                <Card elevation={3} sx={{p: 2, borderRadius: 5, width: "100%", mb: 2}}>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1}}
                        columns={1}
                    >
                        <Grid size={1}>
                            <FormControlLabel
                                name={"Renew"}
                                hidden={selectedGateway?.Gateway?.GatewayType=="BANK_PORTAL"}
                                checked={requestProFormaInvoice}
                                onChange={(e) => setRequestProFormaInvoice(e.target.checked)}
                                control={<Switch/>}
                                label={"درخواست پیش فاکتور"}/>
                        </Grid>
                        {/*<Grid size={1}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        name={"Renew"}*/}
                        {/*        checked={requestInvoice}*/}
                        {/*        onChange={(e) => setRequestInvoice(e.target.checked)}*/}
                        {/*        control={<Switch/>}*/}
                        {/*        label={"درخواست فاکتور رسمی"}/>*/}
                        {/*</Grid>*/}
                    </Grid>
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

                        <Button hidden={requestProFormaInvoice} edge="end" aria-label="Toggle password visibility" variant={"contained"}
                                fullWidth
                                onClick={(e) => openModalFastPayAction()}> پرداخت سریع </Button>
                        <Button hidden={!requestProFormaInvoice} edge="end" aria-label="Toggle password visibility" variant={"contained"}
                                fullWidth
                                onClick={(e) => submitPaymentDraft(e)}> ایجاد و دریافت پیش فاکتور </Button>
                    </Grid>
                </Card>
            </Grid>

            {renderModalFastPay()}
        </>
    );
};

export default _ChargeCreateInvoice;
