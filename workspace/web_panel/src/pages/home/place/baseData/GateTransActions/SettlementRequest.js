import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {transaction_placeSetteling, transaction_query} from "../../../../../network/api/transactions.api";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, IconButton, TableCell, TextField, Tooltip} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma} from "../../../../../helper";
import FeedIcon from '@mui/icons-material/Feed';
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const SettlementRequest = ({place}) => {
    const error = useContext(ErrorContext);
    const [transactions,setTransactions] = useState([])
    const [transactionToSettle,setTransactionToSettle] = useState(null)
    useEffect(() => {
        getTransactions();
    }, []);


    function getTransactions() {
        transaction_query({
            queryType: "FILTER",
            PlaceId: place.Id,
            TransactionType:"PLACE_SETTLEMENT",
            paging: {Page: 0, Size: 50, Desc: true}
        }).then((result) => {
            setTransactions(result.data.Data.content)
        });
    }

    const groupBySerial = (result, { Serial, ...cats }) => {
        if (!result.some(r=>r.Serial==Serial))result.push({Serial:Serial,Items:[]})
        result.find(r=>r.Serial==Serial).Items.push(cats);
        return result;
    }

    function renderModalsettling() {

        function submitTransaction(e) {
            e.preventDefault()
            transaction_placeSetteling({TransactionId:transactionToSettle.Id,TransactionText:e.target.TransactionText.value}).then(result=>{
                error.showError({message: "عملیات موفق",});
                getTransactions();
                setTransactionToSettle(null);
            }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={transactionToSettle} onHide={() => setTransactionToSettle(null)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => submitTransaction(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"تسویه حساب با مجموعه"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formCorporateName">

                                <TextField
                                    label="متن تراکنش"
                                    multiline
                                    name={"TransactionText"}
                                    rows="4"
                                    className="textField"
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="متن تراکنش انجام شده شامل کد پیگیری و .."
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setTransactionToSettle(null)}
                            >
                                لغو
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                تایید
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    const getRequest = (items) =>{
        return items.Items.find(o=>o.TransactionStatus=="REQUEST");
    }
    const getPayment = (items) =>{
        return items.Items.find(o=>o.TransactionStatus=="PAYMENT_COMPLETE");
    }
    return (
        <>
            <Portlet>
                <PortletHeader title="درخواست های تسویه" />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Ids</TableCell>
                                <TableCell align="right">تاریخ درخواست</TableCell>
                                <TableCell align="right">اطلاعات تسویه</TableCell>
                                <TableCell align="right">مبلغ</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {transactions&&transactions.reduce(groupBySerial, []).map(row=>(
                                <TableRow key={row.Serial}>
                                    <TableCell align="right" component="th" scope="row" >{getRequest(row).Id+(getPayment(row)?"-"+getPayment(row).Id:"")}</TableCell>
                                    <TableCell align="right">{new Date(getRequest(row).CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</TableCell>
                                    <TableCell align="right">{getPayment(row)&&(
                                            <Tooltip placement={"top"} title={getPayment(row).Description}>
                                                    <FeedIcon color={"success"} />
                                            </Tooltip>
                                    )}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(getRequest(row).Amount)}</TableCell>
                                    <TableCell align="left">{!getPayment(row)?<Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>setTransactionToSettle(getRequest(row))}>تسویه</Button>:""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </PortletBody>
            </Portlet>
            {renderModalsettling()}
        </>

    );
};

export default SettlementRequest;
