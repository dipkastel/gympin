import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {DinnerDining} from "@mui/icons-material";
import {toPriceWithComma} from "../../../helper/utils";
import TableContainer from "@mui/material/TableContainer";
import {Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {invoice_confirmFoodPayment} from "../../../network/api/invoice.api";
import {useNavigate} from "react-router";

const _SingleInvoiceProcessing = ({Invoice, getInvoices}) => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    const corporate = useSelector(({corporate}) => corporate.corporate);
    useEffect(() => {
        store.dispatch(sagaActions.RequestCorporate(corporate));
    }, []);


    function RenderModalConfirm() {
        function inConfirmOrder(e) {
            e.preventDefault();
            setOpenModalConfirm(false);
            invoice_confirmFoodPayment({id: Invoice.Id})
                .then((result) => {
                    getInvoices();
                })
                .catch((e) => {
                    try {
                        error.showError({message: e.response.data.Message});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص"});
                    }
                });
        }

        return (
            <Dialog open={openModalConfirm} onClose={() => setOpenModalConfirm(false)}>
                <Form onSubmit={(e) => inConfirmOrder(e)}>
                    <DialogTitle>{"پرداخت مبلغ سفارش به " + Invoice?.InvoiceBuyables[0]?.Place?.Name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant={"subtitle1"}>
                                با این تایید، امکان تغییر آیتم های سفارش دیگر وجود نخواهد داشت.
                            </Typography>
                            <Typography variant={"subtitle1"}>
                                {"مبلغ " + toPriceWithComma(Invoice?.TotalPrice) + " تومان از شارژ سازمان کسر خواهد شد"}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"}
                                onClick={() => setOpenModalConfirm(false)}>لغو</Button>
                        <Button type={"submit"} variant={"contained"} color={"success"}>تایید میکنم</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }


    function corporateCanPay() {
        return Invoice?.TotalPrice < corporate?.FinanceCorporate?.TotalDeposit;
    }
    function getInvoiceDate(Invoice){
        return new Date(Invoice?.InvoiceFoods[0]?.Date).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <>
            <Grid size={12}>
                <Card elevation={3}>
                    <CardHeader
                        title={"فاکتور خرید غذا از " + Invoice?.InvoiceBuyables[0]?.Place?.Name+ " برای " +getInvoiceDate(Invoice)}
                        action={"کد شناسایی سفارش : " + Invoice.Serial.Serial.split("-")[0]}
                    />
                    <CardContent>
                        <Grid container spacing={1} columns={12}>
                            <Grid size={{md: 12, lg: Invoice?.InvoiceExtras?.length > 0 ? 7 : 12}}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>آیتم</TableCell>
                                                <TableCell align="left">قیمت</TableCell>
                                                <TableCell align="left">تعداد</TableCell>
                                                <TableCell align="left">مجموع</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Invoice.InvoiceFoods.map((row) => (
                                                <TableRow
                                                    hover={true}
                                                    key={"items-" + Invoice.Id + "-" + row.Id}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.IsCount && <DinnerDining sx={{mr: 1}}/>}
                                                        {row.Name}
                                                    </TableCell>
                                                    <TableCell>{toPriceWithComma(row?.UnitPrice) + " تومان"}</TableCell>
                                                    <TableCell>{toPriceWithComma(row?.Count)}</TableCell>
                                                    <TableCell>{toPriceWithComma(row?.Count * row?.UnitPrice) + " تومان"}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            {Invoice?.InvoiceExtras?.length > 0 && <Grid size={{md: 12, lg: 5}}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>آیتم</TableCell>
                                                <TableCell align="left">قیمت</TableCell>
                                                <TableCell align="left">تعداد</TableCell>
                                                <TableCell align="left">مجموع</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Invoice?.InvoiceExtras?.map((row) => (
                                                <TableRow
                                                    hover={true}
                                                    key={row.Id + "-" + Invoice.Id}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row?.Name}
                                                    </TableCell>
                                                    <TableCell>{toPriceWithComma(row?.UnitPrice) + " تومان"}</TableCell>
                                                    <TableCell>{toPriceWithComma(row?.Count)}</TableCell>
                                                    <TableCell>{toPriceWithComma(row?.Count * row?.UnitPrice) + " تومان"}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {RenderModalConfirm()}
        </>

    );
};

export default _SingleInvoiceProcessing;
