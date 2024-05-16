import React, {useContext, useEffect, useState} from "react";
import {
    Portlet,
    PortletBody,
    PortletFooter,
    PortletHeader,
    PortletHeaderToolbar,
} from "../../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button, Chip, TextField, Typography} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import AddIcon from "@mui/icons-material/Add";
import {
    IncreaseUserDeposit_add,
    IncreaseUserDeposit_confirmIncreaseRequest,
    IncreaseUserDeposit_query
} from "../../../../../network/api/increaseUserDeposit.api";
import {getRppUserIncreaseDeposit, SetRppUserIncreaseDeposit} from "../../../../../helper/pocket/pocket";
import {GatewayType} from "../../../../../helper/enums/GatewayType";

function UserIncreaseDeposit({currentUser, updatePage}) {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppUserIncreaseDeposit());
    const [userIncreaseDepositInvoice, SetUserIncreaseDepositInvoice] = useState({});
    const [transactionToSettle, setTransactionToSettle] = useState(null);
    const [acceptTransaction, setAcceptTransaction] = useState(null);
    const [transactionText, setTransactionText] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [amountToPay, setAmountToPay] = useState(null);

    useEffect(() => {
        getInvoiceIncreaseUserDeposit()
    }, [page, rowsPerPage]);

    function getInvoiceIncreaseUserDeposit() {
        IncreaseUserDeposit_query({
            queryType: "FILTER",
            UserId: currentUser.Id,
            paging: {Page: page, Size: (rowsPerPage), orderBy: "Serial", Desc: true}
        }).then((data) => {
            SetUserIncreaseDepositInvoice(data.data.Data)
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
            IncreaseUserDeposit_confirmIncreaseRequest({
                Id: transactionToSettle.Id,
                Accept: acceptTransaction,
                Description: e.target.TransactionText.value
            }).then(result => {
                error.showError({message: "عملیات موفق",});
                getInvoiceIncreaseUserDeposit();
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
                            <Modal.Title>{"تایید یا رد درخواست افزایش اعتبار"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {console.log(transactionToSettle)}
                            <p>{transactionToSettle && toPriceWithComma(transactionToSettle.Amount)} تومان</p>
                            <p>{transactionToSettle?.GatewayType && "نوع تراکنش :  "+ GatewayType[transactionToSettle.GatewayType]}</p>
                            <p>{transactionToSettle?.Refrence && transactionToSettle.Refrence}</p>
                            <p>{transactionToSettle && transactionToSettle.Description}</p>
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
            IncreaseUserDeposit_add({
                Amount: amountToPay,
                UserId: currentUser.Id
            }).then(result => {
                setOpenModalAdd(false)
                getInvoiceIncreaseUserDeposit()
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
                            <Modal.Title>{"افزودن اعتبار به کاربر "}</Modal.Title>
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

    const groupBySerial = (result, {Serial, ...cats}) => {
        if (!result.some(r => r.Serial == Serial)) result.push({Serial: Serial, Items: []})
        result.find(r => r.Serial == Serial).Items.push(cats);
        return result;
    }
    const getRequest = (items) => {
        return items.Items.find(o => o.TransactionStatus == "REQUEST");
    }
    const getPayment = (items) => {
        return items.Items.find(o => o.TransactionStatus != "REQUEST");
    }

    function checkForAccept(row) {
        switch (row.DepositStatus) {
            case "CONFIRMED":
                return <Chip color={"success"} size={"small"} label={"پرداخت شده"}/>
            case "REJECTED":
                return <Chip color={"error"} size={"small"} label={"پرداخت رد شده"}/>
            case "REQUESTED":
                return <Chip color={"warning"} size={"small"} label={"در انتظار بررسی"}/>
        }
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
                                    <TableCell align="right">مبلغ</TableCell>
                                    <TableCell align="right">توضیحات</TableCell>
                                    <TableCell align="right">سریال</TableCell>
                                    <TableCell align="left">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userIncreaseDepositInvoice.content && userIncreaseDepositInvoice.content.map((row, index) => {
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
                                                {row.DepositStatus == "REQUESTED" ?
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
                    {(userIncreaseDepositInvoice.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[10, 20, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={userIncreaseDepositInvoice.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppUserIncreaseDeposit(parseInt(event.target.value, 10));
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

export default UserIncreaseDeposit;
