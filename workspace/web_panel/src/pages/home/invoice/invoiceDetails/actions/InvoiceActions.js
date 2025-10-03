import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Alert, Button, Collapse, FormControlLabel, Grid, Slider, Stack, Switch, TableCell, TableRow, TextField} from "@mui/material";
import {Form, Modal} from "react-bootstrap";
import {User_getUserCredits} from "../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma} from "../../../../../helper";
import {invoice_advancedCheckout} from "../../../../../network/api/invoice.api";
import {creditTypes} from "../../../../../helper/enums/creditTypes";
import {CreditStatusEnum} from "../../../../../helper/enums/CreditStatusEnum";


const InvoiceActions = ({invoice, updatePage}) => {

    const error = useContext(ErrorContext);
    const [openModalPey, setOpenModalPey] = useState(false);
    const [userCredits, SetUserCredits] = useState(null)
    const [showZiroCredits, SetShowZiroCredit] = useState(false);
    const [howToPay, SetHowToPay] = useState([])

    useEffect(() => {
        User_getUserCredits({Id: invoice.User.Id}).then(result => {
            SetUserCredits(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [invoice]);


    function renderModalPayInvoice() {

        function payInvoice(e) {
            e.preventDefault();
            var checkout = [];
            howToPay.map((credit,number) => {
                checkout.push({
                    Id:credit.Id,
                    CreditType: credit.CreditType,
                    PersonnelId: credit.PersonnelId,
                    Priority: number,
                    Amount: credit.CreditPayableAmount,
                })
            });
            var postData = {
                Invoice: {Id: invoice.Id},
                Price: getTotalHowToPay(),
                Checkout: checkout,
            }
            invoice_advancedCheckout(postData).then(result => {
                updatePage();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        function toggleItemInHowToPay(item) {
            if (howToPay?.some(d => d?.Id === item?.Id)) {
                //remove
                SetHowToPay(howToPay.filter(o => o.Id !== item.Id));
            } else {
                //add
                if (item.CreditPayableAmount < 1) {
                    error.showError({message: "مبلغ قابل پرداخت وجود ندارد",});
                    return false;
                }
                SetHowToPay([...howToPay, {...item, CreditPayableAmount: 0}])
            }
        }

        function getHowToPayItem(credit) {
            return howToPay.find(h => h.Id === credit.Id);
        }

        function getTotalHowToPay() {
            return howToPay.map(h => h.CreditPayableAmount).reduce((a, b) => a + b, 0);
        }

        function setCreaditPayableAmouunt(item,value) {
            var htpitem = {...item, CreditPayableAmount: Number(value)};
            SetHowToPay([...(howToPay.filter(h => h.Id !== item.Id)), htpitem])
        }

        function getMaxPayableAmount(item) {
            var total =  howToPay.filter(h=>h.Id!==item.Id).map(h => h.CreditPayableAmount).reduce((a, b) => a + b, 0);
            var remindprice =  invoice?.TotalPrice-total;
            return Math.min(remindprice,item.CreditPayableAmount)
        }

        return (
            <>
                <Modal show={openModalPey} size={"xl"} onHide={() => setOpenModalPey(false)}>
                    <form onSubmit={(e) => payInvoice(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"پرداخت فاکتور"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Stack sx={{width: '100%'}} spacing={2}>
                                <Alert
                                    severity={"info"}>{" جمع کیف پول : " + toPriceWithComma(userCredits?.TotalCredit)}</Alert>
                                <Alert
                                    severity={"info"}>{" مجموع فاکتور : " + toPriceWithComma(invoice?.TotalPrice)}</Alert>
                                {userCredits?.TotalCredit < invoice?.TotalPrice &&
                                <Alert severity="error">مجموع اعتبار کاربر کمتر از پرداخت
                                    بلیط میباشد!</Alert>}
                                {getTotalHowToPay() > invoice?.TotalPrice &&
                                <Alert severity={"warning"}>مبلغ انتخاب شده بیش از فاکتور است</Alert>}
                                {getTotalHowToPay() === invoice?.TotalPrice &&
                                <Alert severity={"success"}>مبلغ فاکتور به طور کامل پوشش داده شده.</Alert>}
                                {getTotalHowToPay() < invoice?.TotalPrice &&
                                <Alert severity={"warning"}>مبلغ فاکتور پوشش داده نشده </Alert>}
                            </Stack>
                            <FormControlLabel
                                checked={showZiroCredits}
                                onChange={(e) => SetShowZiroCredit(e.target.checked)}
                                control={<Switch
                                    value="gilad"/>}
                                label={"نمایش همه اعتبار ها"}
                            />
                            <Table className={"table"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">مرجع</TableCell>
                                        <TableCell align="right">نوع</TableCell>
                                        <TableCell align="right">منبع</TableCell>
                                        <TableCell align="right">وضعیت</TableCell>
                                        <TableCell align="right">تاریخ انقضا</TableCell>
                                        <TableCell align="right">مبلغ</TableCell>
                                        <TableCell align="right">قابل پرداخت</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userCredits?.CreditDetails && userCredits?.CreditDetails.filter(c => !showZiroCredits ? c.CreditPayableAmount > 0 : c).map((item, number) => (

                                        <React.Fragment key={"89" + number}>
                                            <TableRow
                                                sx={{"background-color": !!getHowToPayItem(item) ? "#b6f6e3" : "#e8e8e8"}}
                                            >
                                                <TableCell align="right">
                                                    <FormControlLabel
                                                        checked={!!getHowToPayItem(item)}
                                                        onChange={(e) => toggleItemInHowToPay(item)}
                                                        control={<Switch
                                                            value="gilad"/>}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">{creditTypes[item?.CreditType]}</TableCell>
                                                <TableCell align="right">{item?.Corporate?.Name}</TableCell>
                                                <TableCell
                                                    align="right">{CreditStatusEnum[item?.CreditStatus]}</TableCell>
                                                <TableCell
                                                    align="right">{item.ExpireDate&&new Date(item.ExpireDate).toLocaleDateString('fa-IR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</TableCell>
                                                <TableCell
                                                    align="right">{toPriceWithComma(item?.CreditAmount)}</TableCell>
                                                <TableCell
                                                    align="right">{toPriceWithComma(item?.CreditPayableAmount)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={7}>
                                                    <Collapse aria-rowspan={2}
                                                              in={!!getHowToPayItem(item)}>
                                                        <Grid container direction={"row"} alignItems={"center"}
                                                              justifyContent={"space-around"}>
                                                            <Slider
                                                                valueLabelDisplay={"on"}
                                                                value={getHowToPayItem(item)?.CreditPayableAmount}
                                                                step={1000}
                                                                max={getMaxPayableAmount(item)}
                                                                min={1000}
                                                                color={"secondary"}
                                                                sx={{width: "30%"}}
                                                                onChangeCommitted={(event, value) => {
                                                                    setCreaditPayableAmouunt(getHowToPayItem(item), value)
                                                                }}

                                                            />

                                                            <Form.Group>
                                                                <TextField
                                                                    name="name"
                                                                    type={"number"}
                                                                    label={"مبلغ"}
                                                                    onChange={e=>setCreaditPayableAmouunt(getHowToPayItem(item), e.target.value)}
                                                                    value={getHowToPayItem(item)?.CreditPayableAmount}
                                                                    variant={"outlined"}
                                                                />
                                                            </Form.Group>

                                                        </Grid>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"contained"} color={"warning"} className={"mx-1"}
                                    onClick={() => setOpenModalPey(false)}> لغو </Button>
                            <Button disabled={getTotalHowToPay() !== invoice?.TotalPrice} variant={"contained"} className={"mx-1"} type={"submit"}> پرداخت </Button>
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
                </PortletBody>
            </Portlet>
            {renderModalPayInvoice()}
        </>

    );
};

export default InvoiceActions;
