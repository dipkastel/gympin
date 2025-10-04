import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {DeleteRounded} from "@mui/icons-material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {invoice_add, invoice_delete, invoice_query} from "../../../../../network/api/invoice.api";
import {Form, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {toPriceWithComma} from "../../../../../helper";
import AddIcon from "@mui/icons-material/Add";
import {InvoiceStatus} from "../../../../../helper/enums/InvoiceStatus";
import {getRppUserInvoice, SetRppUserInvoice} from "../../../../../helper/pocket/pocket";

const UserInvoices = ({currentUser}) => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [invoices, SetInvoices] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppUserInvoice());
    const [itemToDelete, setItemToDelete] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(null);



    useEffect(() => {
        getUserInvoices();
    }, []);

    function getUserInvoices() {
        invoice_query({
            queryType: "FILTER",
            UserId:currentUser.Id,
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((result) => {
            SetInvoices(result.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function RenderModalDelete() {
        function deleteInvoice(e) {
            e.preventDefault()
            setItemToDelete(null);
            invoice_delete({Id:itemToDelete.Id}).then(data=>{
                getUserInvoices()
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
                <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => deleteInvoice(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف فاکتور "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                حذف
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function RenderModalAdd() {
        function addItem(e) {
            e.preventDefault();
            setItemToDelete(null);
            invoice_add({User:{Id:currentUser.Id}}).then(data=>{
                getUserInvoices();
                setOpenModalAdd(false);
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
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => addItem(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن فاکتور"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                افزودن فاکتور جدید فاکتور پیشنویس قبلی را کنسل خواهد کرد.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className={"button_edit"} onClick={() => setOpenModalAdd(false)}> خیر</Button>
                            <Button className={"button_danger"} type={"submit"}>افزودن</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }


    return (
        <>
            <Portlet>
                <PortletHeader
                    title="فاکتور های کاربر"
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
                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">شماره فاکتور</TableCell>
                                <TableCell align="right">ایجاد کننده</TableCell>
                                <TableCell align="right">تعداد آیتم</TableCell>
                                <TableCell align="right">قیمت</TableCell>
                                <TableCell align="right">وضعیت</TableCell>
                                <TableCell align="right">تاریخ</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {invoices.content && invoices.content.map((row, index) => (
                                <TableRow hover role={"checkbox"} tabIndex={-1} key={"Buyable" + row.Id.toString()}>
                                    <TableCell onClick={(event) => {history.push({pathname: "/invoice/detail/" + row.Id})}} align="right">{row.Id}</TableCell>
                                    <TableCell onClick={(event) => {history.push({pathname: "/invoice/detail/" + row.Id})}} align="right">{row.CreatorUser?.Username}</TableCell>
                                    <TableCell onClick={(event) => {history.push({pathname: "/invoice/detail/" + row.Id})}} align="right">{row.InvoiceBuyables?.reduce((a, b) => a + b.Count, 0)}</TableCell>
                                    <TableCell onClick={(event) => {history.push({pathname: "/invoice/detail/" + row.Id})}} align="right">{toPriceWithComma(row.TotalPrice)}</TableCell>
                                    <TableCell onClick={(event) => {history.push({pathname: "/invoice/detail/" + row.Id})}} align="right">{InvoiceStatus[row.Status]}</TableCell>
                                    <TableCell onClick={(event) => {history.push({pathname: "/invoice/detail/" + row.Id})}} align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}</TableCell>
                                    <TableCell align="left">
                                        <button
                                            type="button"
                                            className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted h-25"
                                            onClick={(e) => setItemToDelete(row)}
                                        >
                                            <DeleteRounded color={"error"}/>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
                <PortletFooter className={"p-3"}>
                        {(invoices.content) && <TablePagination
                            rowsPerPageOptions={[15, 25, 50, 100]}
                            component="div"
                            count={invoices.totalElements || 0}
                            labelRowsPerPage={"تعداد نمایش"}
                            labelDisplayedRows={(param) => {
                                return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                            }}
                            rowsPerPage={parseInt(rowsPerPage)}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                SetRppUserInvoice(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        />}
                </PortletFooter>

            </Portlet>
            {RenderModalAdd()}
            {RenderModalDelete()}
        </>
    );
};

export default UserInvoices;
