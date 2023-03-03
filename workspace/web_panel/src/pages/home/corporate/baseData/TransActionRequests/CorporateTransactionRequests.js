import React, {useContext, useEffect, useState} from "react";
import {
  Portlet,
  PortletBody,
  PortletFooter,
  PortletHeader,
} from "../../../../partials/content/Portlet";
import {
    transaction_handCheckPayment,
    transaction_placeSetteling,
    transaction_query
} from "../../../../../network/api/transactions.api";
import TableContainer from "@mui/material/TableContainer";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button, TextField, Tooltip} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {TransactionTypes} from "../../../../../helper/enums/TransactionTypes";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import TablePagination from "@mui/material/TablePagination";
import FeedIcon from "@mui/icons-material/Feed";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

function CorporateTransactionRequests({ currentCorporate }) {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [transactions, SetTransactions] = useState({});
    const [transactionToSettle,setTransactionToSettle] = useState(null)

    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage]);

    function getTransactions() {
        transaction_query({
            queryType: "FILTER",
            CorporateId:currentCorporate.Id,
            TransactionType:"CHARGE_Corporate",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        });
    }


    function renderModalsettling() {

        function submitTransaction(e,AcceptPeyment) {
            e.preventDefault()
            if(!e.target.TransactionText.value){
                error.showError({message: "یادداشت تایید یا رد تراکنش اجباری است"});
                return;
            }
            console.log(transactionToSettle);
            transaction_handCheckPayment({Serial:transactionToSettle.Serial,Accept:AcceptPeyment,Description:e.target.TransactionText.value}).then(result=>{
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
                        onReset={(e) => submitTransaction(e,false)}
                        onSubmit={(e) => submitTransaction(e,true)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"تایید یا رد درخواست افزایش اعتبار"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <p>{transactionToSettle&&getRequest(transactionToSettle).Description}</p>
                            <p>{transactionToSettle&&toPriceWithComma(getRequest(transactionToSettle).Amount)} تومان</p>
                            <Form.Group controlId="formCorporateName">

                                <TextField
                                    label="یادداشت"
                                    multiline
                                    name={"TransactionText"}
                                    rows="4"
                                    className="textField"
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="یادداشت تایید یا رد درخواست شرکت"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                variant={"contained"}
                                color={"error"}
                                type={"reset"}
                            >
                                لغو تراکنش
                            </Button>
                            <Button
                                className={"button_danger"}
                                variant={"contained"}
                                color={"success"}
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

    const groupBySerial = (result, { Serial, ...cats }) => {
        if (!result.some(r=>r.Serial==Serial))result.push({Serial:Serial,Items:[]})
        result.find(r=>r.Serial==Serial).Items.push(cats);
        return result;
    }
    const getRequest = (items) =>{
        console.log("pa",items)
        return items.Items.find(o=>o.TransactionStatus=="REQUEST");
    }
    const getPayment = (items) =>{
        console.log("pa",items)
        return items.Items.find(o=>o.TransactionStatus!="REQUEST");
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="درخواست های افزایش اعتبار" />

                <PortletBody>

                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

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
                                {transactions.content && transactions.content.reduce(groupBySerial, []).filter(row=>getRequest(row)).map((row, index) => {
                                    return (
                                         <TableRow key={row.Serial}>
                                               <TableCell align="right" component="th" scope="row" >{getRequest(row).Id+(getPayment(row)?"-"+getPayment(row).Id:"")}</TableCell>
                                            <TableCell align="right">{new Date(getRequest(row).CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell align="right">
                                                {getPayment(row)&&(
                                                <Tooltip placement={"top"} title={getPayment(row).Description}>
                                                    <FeedIcon color={getPayment(row).TransactionStatus=="PAYMENT_COMPLETE"?"success":"error"} />
                                                </Tooltip>
                                            )}{getRequest(row)&&(
                                                <Tooltip placement={"top"} title={getRequest(row).Description}>
                                                    <FeedIcon color={"success"} />
                                                </Tooltip>
                                            )}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(getRequest(row).Amount)}</TableCell>
                                            <TableCell align="left">{!getPayment(row)?<Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>setTransactionToSettle(row)}>تسویه</Button>:""}</TableCell>
                                             </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PortletBody>

                <PortletFooter>
                    {(transactions.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={transactions.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletFooter>
            </Portlet>
            {renderModalsettling()}
        </>
  );
}

export default CorporateTransactionRequests;
