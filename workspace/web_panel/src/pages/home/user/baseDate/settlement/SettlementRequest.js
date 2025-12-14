import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Alert, Button, Chip, TableCell, TextField, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {
    SettlementUserDeposit_add,
    SettlementUserDeposit_confirmSettlementRequest,
    SettlementUserDeposit_query
} from "../../../../../network/api/settlementUserDeposit.api";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import {getRppSettlementsRequest, SetRppSettlementsRequest} from "../../../../../helper/pocket/pocket";
import {creditTypes} from "../../../../../helper/enums/creditTypes";

const SettlementRequest = ({currentUser,userFinance, updatePage}) => {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppSettlementsRequest());
    const [userSettlementDepositInvoice, SetUserSettlementDepositInvoice] = useState({});
    const [transactionToSettle, setTransactionToSettle] = useState(null);
    const [acceptTransaction, setAcceptTransaction] = useState(null);
    const [transactionText, setTransactionText] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [amountToPay, setAmountToPay] = useState(null);

    useEffect(() => {
        getInvoiceSettlementUserDeposit()
    }, [page, rowsPerPage]);

    function getInvoiceSettlementUserDeposit() {
        SettlementUserDeposit_query({
            queryType: "FILTER",
            FinanceUserId: userFinance.Id,
            paging: {Page: page, Size: (rowsPerPage), orderBy: "Serial", Desc: true}
        }).then((data) => {
            SetUserSettlementDepositInvoice(data.data.Data)
        });
    }


    function renderModalsettling() {
        function submitTransaction(e) {
            e.preventDefault()
            if (!e.target.TransactionText.value) {
                error.showError({message: "یادداشت تایید یا رد تراکنش اجباری است"});
                return;
            }
            closeModal()
            SettlementUserDeposit_confirmSettlementRequest({
                Id: transactionToSettle.Id,
                Accept: acceptTransaction,
                Description: e.target.TransactionText.value
            }).then(result => {
                error.showError({message: "عملیات موفق",});
                getInvoiceSettlementUserDeposit();
                updatePage();
            }).catch(e => {
                closeModal()
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        function closeModal() {
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
                            <Modal.Title>{"تایید یا رد درخواست تسویه سپرده"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <p>{transactionToSettle && transactionToSettle.Description}</p>
                            <p>{transactionToSettle && toPriceWithComma(transactionToSettle.Amount)} تومان</p>
                            <Form.Group controlId="formCorporateName">
                                {(acceptTransaction != null) && (acceptTransaction ?
                                        (<>
                                                <Typography color={"success"} variant={"body2"}>
                                                    لطفا دلیل تایید تراکنش را یادداشت کنید :
                                                </Typography>
                                                <Chip color={"success"} size={"small"} label={"تراکنش بررسی و تایید شد"}
                                                      onClick={(e) => setTransactionText("تراکنش بررسی و تایید شد.")}/>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <Typography color={"error"} variant={"body2"}>
                                                    لطفا دلیل رد تراکنش را یادداشت کنید :
                                                </Typography>
                                                <Chip color={"error"} size={"small"} label={"تراکنش تکراری"}
                                                      onClick={(e) => setTransactionText("تراکنش تکراری")}/>
                                                <Chip color={"error"} size={"small"} label={"تراکنش یافت نشد"}
                                                      onClick={(e) => setTransactionText("تراکنش یافت نشد")}/>
                                                <Chip color={"error"} size={"small"} label={"مبلغ تراکنش نامعتبر"}
                                                      onClick={(e) => setTransactionText("مبلغ تراکنش نامعتبر")}/>
                                                <Chip color={"error"} size={"small"} label={"تاریخ تراکنش نامعتبر"}
                                                      onClick={(e) => setTransactionText("تاریخ تراکنش نامعتبر")}/>
                                            </>)
                                )}
                                <TextField
                                    hidden={acceptTransaction == null}

                                    label="یادداشت"
                                    multiline
                                    name={"TransactionText"}
                                    rows="4"
                                    value={transactionText}
                                    onChange={(e) => setTransactionText(e.target.value)}
                                    className="textField"
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="یادداشت تایید یا رد درخواست کاربر"
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
            SettlementUserDeposit_add({
                Amount: amountToPay,
                UserFinanceId: userFinance.Id
            }).then(result => {
                setOpenModalAdd(false)
                getInvoiceSettlementUserDeposit()
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
                            <Modal.Title>{"درخواست تسویه "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="amount"
                                value={amountToPay}
                                type="text"
                                onChange={e => setAmountToPay(e.target.value)}
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

    function checkForAccept(row) {
        switch (row.SettlementStatus) {
            case "CONFIRMED":
                return <Chip color={"success"} size={"small"} label={"پرداخت شده"}/>
            case "REJECTED":
                return <Chip color={"error"} size={"small"} label={"پرداخت رد شده"}/>
            case "REQUESTED":
                return <Chip color={"warning"} size={"small"} label={"در انتظار بررسی"}/>
        }
    }

    if(userFinance.CreditType==="NON_WITHDRAWABLE") return <></>
    if(userFinance.CreditType==="SPONSOR") return <></>
    if(userFinance.CreditPayableAmount<1&&!userSettlementDepositInvoice.content) return <></>
    return (
        <>
            <Portlet>
                <PortletHeader title={"تسویه حساب "+creditTypes[userFinance.CreditType]+
                (userFinance?.Corporate?(" ( "+userFinance?.Corporate?.Name+" ) "):"") +
                (userFinance?.Place?(" ( "+userFinance?.Place?.Name+" ) "):"")
                }
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
                    <Alert variant={"outlined"} >
                        <Typography variant={"body1"}>
                            { "مبلغ قابل تسویه برای این حساب : "+toPriceWithComma(userFinance.CreditPayableAmount)+" تومان"}
                        </Typography>
                    </Alert>
                    <TableContainer hidden={userSettlementDepositInvoice?.content?.length<1}>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>

                                <TableRow>
                                    <TableCell align="right">Ids</TableCell>
                                    <TableCell align="right">تاریخ درخواست</TableCell>
                                    <TableCell align="right">مبلغ</TableCell>
                                    <TableCell align="right">توضیحات</TableCell>
                                    <TableCell align="right">سریال</TableCell>
                                    <TableCell align="left">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userSettlementDepositInvoice.content && userSettlementDepositInvoice.content.map((row, index) => {
                                    return (
                                        <TableRow key={row.Serial.Serial}>
                                            <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                            <TableCell
                                                align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row.Amount)}</TableCell>
                                            <TableCell align="right">{row.Description}</TableCell>
                                            <TableCell align="right">{row.Serial.Serial}</TableCell>
                                            <TableCell align="left">
                                                {row.SettlementStatus == "REQUESTED" ?
                                                    <Button variant={"contained"} size={"small"} color={"error"}
                                                            onClick={(e) => setTransactionToSettle(row)}>تسویه</Button> : checkForAccept(row)}

                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PortletBody>

                <PortletFooter>
                    {(userSettlementDepositInvoice.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[10, 20, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={userSettlementDepositInvoice.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(rowsPerPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppSettlementsRequest(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletFooter>
            </Portlet>
            {renderModalsettling()}
            {renderModalAdd()}
        </>
    );
};

export default SettlementRequest;
