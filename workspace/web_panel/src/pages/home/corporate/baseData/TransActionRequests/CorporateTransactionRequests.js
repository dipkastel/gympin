import React, {useContext, useEffect, useState} from "react";
import {
    Portlet,
    PortletBody,
    PortletFooter,
    PortletHeader, PortletHeaderToolbar,
} from "../../../../partials/content/Portlet";
import {
    transaction_handCheckPayment,
    transaction_placeSetteling,
    transaction_query, transaction_setPaymentRequest
} from "../../../../../network/api/transactions.api";
import TableContainer from "@mui/material/TableContainer";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button, Chip, TextField, Tooltip, Typography} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import {TransactionTypes} from "../../../../../helper/enums/TransactionTypes";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import TablePagination from "@mui/material/TablePagination";
import FeedIcon from "@mui/icons-material/Feed";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import AddIcon from "@mui/icons-material/Add";

function CorporateTransactionRequests({ currentCorporate }) {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(14);
    const [transactions, SetTransactions] = useState({});
    const [transactionToSettle,setTransactionToSettle] = useState(null)
    const [acceptTransaction, setAcceptTransaction] = useState(null)
    const [transactionText, setTransactionText] = useState(null)
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [amountToPay, setAmountToPay] = useState(null)

    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage]);

    function getTransactions() {
        transaction_query({
            queryType: "FILTER",
            CorporateId:currentCorporate.Id,
            TransactionType:"CHARGE_Corporate",
            paging: {Page: page, Size: rowsPerPage*2, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        });
    }


    function renderModalsettling() {
        function submitTransaction(e) {
            e.preventDefault()
            if (!e.target.TransactionText.value) {
                error.showError({message: "یادداشت تایید یا رد تراکنش اجباری است"});
                return;
            }
            transaction_handCheckPayment({
                Serial: transactionToSettle.Serial,
                Accept: acceptTransaction,
                Description: e.target.TransactionText.value
            }).then(result => {
                error.showError({message: "عملیات موفق",});
                getTransactions();
                closeModal()
            }).catch(e => {
                closeModal()
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        function closeModal(){
            setTransactionText("")
            setTransactionToSettle(null);
            setAcceptTransaction(null);
        }
        return (
            <>
                <Modal show={transactionToSettle} onHide={() => closeModal()}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => submitTransaction(e, true)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"تایید یا رد درخواست افزایش اعتبار"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <p>{transactionToSettle && getRequest(transactionToSettle).Description}</p>
                            <p>{transactionToSettle && toPriceWithComma(getRequest(transactionToSettle).Amount)} تومان</p>
                            <Form.Group controlId="formCorporateName">
                                {(acceptTransaction != null) && (acceptTransaction ?
                                        (<>
                                                <Typography color={"success"} variant={"body2"}>
                                                    لطفا دلیل تایید تراکنش را یادداشت کنید :
                                                </Typography>
                                                <Chip color={"success"} size={"small"} label={"تراکنش بررسی و تایید شد"} onClick={(e)=>setTransactionText("تراکنش بررسی و تایید شد.")}/>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <Typography color={"error"} variant={"body2"}>
                                                    لطفا دلیل رد تراکنش را یادداشت کنید :
                                                </Typography>
                                                <Chip color={"error"} size={"small"} label={"تراکنش تکراری"} onClick={(e)=>setTransactionText("تراکنش تکراری")}/>
                                                <Chip color={"error"} size={"small"} label={"تراکنش یافت نشد"} onClick={(e)=>setTransactionText("تراکنش یافت نشد")}/>
                                                <Chip color={"error"} size={"small"} label={"مبلغ تراکنش نامعتبر"} onClick={(e)=>setTransactionText("مبلغ تراکنش نامعتبر")}/>
                                                <Chip color={"error"} size={"small"} label={"تاریخ تراکنش نامعتبر"} onClick={(e)=>setTransactionText("تاریخ تراکنش نامعتبر")}/>
                                            </>)
                                )}
                                <TextField
                                    hidden={acceptTransaction == null}

                                    label="یادداشت"
                                    multiline
                                    name={"TransactionText"}
                                    rows="4"
                                    value={transactionText}
                                    onChange={(e)=>setTransactionText(e.target.value)}
                                    className="textField"
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="یادداشت تایید یا رد درخواست شرکت"
                                />
                            </Form.Group>

                            <Button
                                hidden={acceptTransaction != null}
                                sx={{width: "50%", height: "150px"}}
                                className={"button_edit"}
                                variant={"contained"}
                                color={"error"}
                                onClick={() => {
                                    setAcceptTransaction(false)
                                }}
                            >
                                لغو تراکنش
                            </Button>
                            <Button
                                hidden={acceptTransaction != null}
                                sx={{width: "50%", height: "150px"}}
                                className={"button_danger"}
                                variant={"contained"}
                                color={"success"}
                                onClick={() => {
                                    setAcceptTransaction(true)
                                }}
                            >
                                تایید
                            </Button>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                hidden={acceptTransaction == null}
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


    function renderModalAdd() {
        function addOption(e) {
            e.preventDefault()
            transaction_setPaymentRequest({
                SelectedPaymentId: 99,
                TransactionType: "CHARGE_CORPORATE",
                TransactionReference: " ",
                Amount: amountToPay,
                CorporateId: currentCorporate.Id
            }).then(result => {
                setOpenModalAdd(false)
                getTransactions()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addOption(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن اعتبار به شرکت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="amount"
                                value={toPriceWithComma(amountToPay)}
                                type="text"
                                onChange={e => setAmountToPay(toPriceWithoutComma(e.target.value))}
                                label={"مبلغ دلخواه به تومان"}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                لغو
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                ثبت
                            </Button>
                        </Modal.Footer>
                    </form>
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
        return items.Items.find(o=>o.TransactionStatus=="REQUEST");
    }
    const getPayment = (items) =>{
        return items.Items.find(o=>o.TransactionStatus!="REQUEST");
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="درخواست های افزایش اعتبار"
                               toolbar={
                                   <PortletHeaderToolbar>
                                       <button
                                           type="button"
                                           className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                           onClick={(e) => setOpenModalAdd(true)}
                                       >
                                           <AddIcon/>
                                       </button>
                                   </PortletHeaderToolbar>
                               }
                />

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
                                {transactions.content && transactions.content.reduce(groupBySerial, []).filter(row => getRequest(row)).map((row, index) => {
                                    return (
                                        <TableRow key={row.Serial}>
                                            <TableCell align="right" component="th"
                                                       scope="row">{getRequest(row).Id + (getPayment(row) ? "-" + getPayment(row).Id : "")}</TableCell>
                                            <TableCell
                                                align="right">{new Date(getRequest(row).CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell align="right">
                                                {getPayment(row) && (
                                                    <Tooltip placement={"top"} title={getPayment(row).Description}>
                                                        <FeedIcon
                                                            color={getPayment(row).TransactionStatus == "PAYMENT_COMPLETE" ? "success" : "error"}/>
                                                    </Tooltip>
                                                )}{getRequest(row) && (
                                                <Tooltip placement={"top"} title={getRequest(row).Description}>
                                                    <FeedIcon color={"success"}/>
                                                </Tooltip>
                                            )}</TableCell>
                                            <TableCell
                                                align="right">{toPriceWithComma(getRequest(row).Amount)}</TableCell>
                                            <TableCell align="left">{!getPayment(row) ?
                                                <Button variant={"contained"} size={"small"} color={"error"}
                                                        onClick={(e) => setTransactionToSettle(row)}>تسویه</Button> : ""}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PortletBody>

                <PortletFooter>
                    {(transactions.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[14, 28, 50, 100]}
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
            {renderModalAdd()}
        </>
    );
}

export default CorporateTransactionRequests;
