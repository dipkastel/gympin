import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Button, IconButton, TableCell, TableRow} from "@mui/material";
import {Modal} from "react-bootstrap";
import {User_getUserCredits} from "../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import Notice from "../../../../partials/content/Notice";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma} from "../../../../../helper";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {invoice_checkout} from "../../../../../network/api/invoice.api";
import {creditTypes} from "../../../../../helper/enums/creditTypes";


const InvoiceActions = ({invoice, updatePage}) => {

    const error = useContext(ErrorContext);
    const [openModalPey, setOpenModalPey] = useState(false);
    const [userCredits, SetUserCredits] = useState({})
    const [invoiceCredits, SetInvoiceCredits] = useState(null)

    useEffect(() => {
        User_getUserCredits({Id: invoice.User.Id}).then(result => {
            var userC = {
                ...result.data.Data, CreditDetails: result.data.Data.CreditDetails.map((c, n) => {
                    return {...c, Periority: n}
                })
            };
            SetUserCredits(userC);
            computeCredits(userC);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [invoice]);


    function computeCredits(userC) {
        var newCredit = [];

        var remainedPrice = invoice.PriceToPay;
        var reducedPrice = 0;
        if (!userC.CreditDetails) return SetInvoiceCredits(newCredit);
        userC.CreditDetails.sort((a, b) => a.Periority - b.Periority).map(credit => {
            var remainedCredit;
            if (remainedPrice <= credit.CreditPayableAmount) {
                reducedPrice = remainedPrice;
                remainedCredit = credit.CreditPayableAmount - remainedPrice;
                remainedPrice = 0;
            } else {
                reducedPrice = credit.CreditPayableAmount;
                remainedPrice = remainedPrice - credit.CreditPayableAmount;
                remainedCredit = 0;
            }
            newCredit.push({
                Periority: credit.Periority,
                Source: credit.CreditType == "PERSONAL" ? creditTypes[credit.CreditType] : credit.Corporate.Name,
                Credit: credit,
                CreditAmount: credit.CreditAmount,
                CreditPayableAmount: credit.CreditPayableAmount,
                ReducedPrice: reducedPrice,
                RemainedPrice: remainedPrice,
                RemainedCredit: remainedCredit,
            });
        })
        SetInvoiceCredits(newCredit);
    }

    function renderModalPayInvoice() {

        function payInvoice(e) {
            e.preventDefault();
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
                Invoice: {Id: invoice.Id},
                Price: invoice.TotalPrice,
                Checkout: checkout,
            }

            invoice_checkout(postData).then(result => {
                updatePage();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        function changePriority(item) {
            var newUserCredit = [];
            userCredits.CreditDetails.map(p => {
                if (p.Periority == item.Periority)
                    newUserCredit.push({...p, Periority: ++p.Periority});
                else if (p.Periority == (item.Periority + 1))
                    newUserCredit.push({...p, Periority: --p.Periority});
                else
                    newUserCredit.push(p);
            });
            computeCredits({...userCredits, CreditDetails: newUserCredit});
        }

        return (
            <>
                <Modal show={openModalPey} size={"lg"} onHide={() => setOpenModalPey(false)}>
                    <form onSubmit={(e) => payInvoice(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"پرداخت فاکتور"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {userCredits.TotalCredit < invoice.TotalPrice &&
                            <Notice icon="flaticon-warning kt-Notice kt-font-primary">مجموع اعتبار کاربر کمتر از پرداخت بلیط میباشد!</Notice>}

                            <Table className={"table"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">اولویت</TableCell>
                                        <TableCell align="right">مرجع</TableCell>
                                        <TableCell align="right">مبلغ</TableCell>
                                        <TableCell align="right">قابل پرداخت</TableCell>
                                        <TableCell align="right">کسر شده</TableCell>
                                        <TableCell align="right">باقی مانده خرید</TableCell>
                                        <TableCell align="right">باقی مانده حساب</TableCell>
                                        <TableCell align="left">عملیات</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoiceCredits && invoiceCredits.sort((a, b) => a.Periority - b.Periority).map((item, number) => (
                                        <TableRow
                                            sx={{"background-color": (item.ReducedPrice > 0) ? "#b6f6e3" : "#e8e8e8"}}
                                            key={item.number}>
                                            <TableCell align="right">{item.Periority}</TableCell>
                                            <TableCell align="right">{item.Source}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(item.CreditAmount)}</TableCell>
                                            <TableCell
                                                align="right">{toPriceWithComma(item.CreditPayableAmount)}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(item.ReducedPrice)}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(item.RemainedPrice)}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(item.RemainedCredit)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="down" color={"inherit"}
                                                            disabled={(invoiceCredits.length - 1 == number)}
                                                            onClick={() => changePriority(item)}
                                                >
                                                    <ArrowDownwardIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"contained"} color={"warning"} className={"mx-1"}
                                    onClick={() => setOpenModalPey(false)}> لغو </Button>
                            <Button variant={"contained"} className={"mx-1"} type={"submit"}> پرداخت </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="عملیات"/>
                <PortletBody>
                    <Button
                        fullWidth
                        variant="contained" color={"primary"}
                        size="large"
                        sx={{my: 1}}
                        onClick={(e) => setOpenModalPey(true)}
                        disabled={invoice.Status !== "PROCESSING"}
                    >
                        پرداخت
                    </Button>
                    {/*<Button*/}
                    {/*    fullWidth*/}
                    {/*    variant="contained" color={"error"}*/}
                    {/*    size="large"*/}
                    {/*    sx={{my: 1}}*/}
                    {/*    // onClick={(e) => setItemToDelete(row)}*/}
                    {/*    disabled={invoice.Status !== "COMPLETED"}*/}
                    {/*>*/}
                    {/*    باز پرداخت*/}
                    {/*</Button>*/}
                </PortletBody>
            </Portlet>
            {renderModalPayInvoice()}
        </>

    );
};

export default InvoiceActions;
