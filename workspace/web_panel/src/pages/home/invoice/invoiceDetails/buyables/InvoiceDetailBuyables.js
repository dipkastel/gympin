import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {buyable_query} from "../../../../../network/api/buyable.api";
import {genders} from "../../../../../helper/enums/genders";
import {DeleteRounded, KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {BuyableType} from "../../../../../helper/enums/BuyableType";
import {toPriceWithComma} from "../../../../../helper";
import {
    invoice_addBuyable,
    invoice_changeInvoiceBuyableCount,
    invoice_deleteBuyable
} from "../../../../../network/api/invoice.api";
import {getRppInvoiceDetailBuyables, SetRppInvoiceDetailBuyables} from "../../../../../helper/pocket/pocket";

const InvoiceDetailBuyables = ({invoice, updatePage}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const [searchedPage, setSearchedPage] = useState(0);
    const [rowsSearchedPerPage, setRowsSearchedPerPage] = useState(getRppInvoiceDetailBuyables());
    const [searchedBuyable, SetSearchedBuyable] = useState(null);
    const [searchText, SetSearchText] = useState(null);


    useEffect(() => {
        getBuyables();
    }, [searchText, searchedPage, rowsSearchedPerPage]);

    function getBuyables() {
        buyable_query({
            queryType: "SEARCH",
            Name: searchText,
            paging: {
                Page: searchedPage,
                Size: rowsSearchedPerPage,
                Desc: true
            }
        }).then((result) => {
            SetSearchedBuyable(result.data.Data)
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function updateInvoiceBuyableCount(e, item, isPlus) {
        e.preventDefault();
        if (!isPlus && item.Count < 2) {
            deleteBuyable(e, item);
            return;
        }
        invoice_changeInvoiceBuyableCount({
            Id: item.Id,
            Count: isPlus ? ++item.Count : --item.Count
        }).then(result => {
            updatePage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function deleteBuyable(e, item) {
        e.preventDefault();
        invoice_deleteBuyable({id: item.Id})
            .then(data => {
                error.showError({message: "عملیات موفق",});
                updatePage();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function RenderModalAdd() {
        function addBuyableToInvoice(e, item) {
            e.preventDefault();
            invoice_addBuyable({
                Invoice: {Id: invoice.Id},
                Buyable: {Id: item.Id},
                Count: 1
            }).then(result => {
                updatePage();
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
                    <Form
                        noValidate
                        autoComplete="off">
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن خرید به سبد"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Control
                                    name="PageName"
                                    type="Text"
                                    placeholder="جستجو"
                                    onChange={(e) => SetSearchText(e.target.value)}
                                />
                            </Form.Group>

                            <Table className={"table"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">مرکز</TableCell>
                                        <TableCell align="right">نام</TableCell>
                                        <TableCell align="right">قیمت</TableCell>
                                        <TableCell align="right">جنسیت</TableCell>
                                        <TableCell align="left">action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {searchedBuyable && searchedBuyable.content.map((item, number) => (
                                        <TableRow hover role={"checkbox"} tabIndex={-1}
                                                  key={"searched" + item.Id.toString()}>
                                            <TableCell align="right">{item.Place.Name}</TableCell>
                                            <TableCell align="right">{item.Name}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(item.Price)}</TableCell>
                                            <TableCell align="right">{genders[item.Gender]}</TableCell>
                                            <TableCell align="left">
                                                <Button color={"error"} variant={"contained"} size={"small"}
                                                        onClick={(e) => addBuyableToInvoice(e, item)}>افزودن</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>


                        </Modal.Body>
                        <Modal.Footer>
                            {(searchedBuyable) && <TablePagination
                                rowsPerPageOptions={[10, 20, 50, 100]}
                                component="div"
                                count={searchedBuyable.totalElements || 0}
                                labelRowsPerPage={"تعداد نمایش"}
                                labelDisplayedRows={(param) => {
                                    return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                                }}
                                rowsPerPage={rowsSearchedPerPage}
                                page={searchedPage}
                                onPageChange={(event, newPage) => setSearchedPage(newPage)}
                                onRowsPerPageChange={(event) => {
                                    setRowsSearchedPerPage(parseInt(event.target.value, 10));
                                    SetRppInvoiceDetailBuyables(parseInt(event.target.value, 10));
                                    setSearchedPage(0);
                                }}
                            />}
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }


    function RenderModalDelete() {

        return (
            <>
                <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => deleteBuyable(e,itemToDelete)}>
                        <Modal.Header closeButton>
                            <Modal.Title>حذف</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.Name}
                        </Modal.Body>
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
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="سبد خرید کاربر"
                               toolbar={
                                   <PortletHeaderToolbar>
                                       <button
                                           type="button"
                                           className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                           onClick={(e) => setOpenModalAdd(true)}
                                           disabled={invoice.Status !== "DRAFT"}
                                       >
                                           <AddIcon/>
                                       </button>
                                   </PortletHeaderToolbar>
                               }/>
                <PortletBody>
                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">شماره</TableCell>
                                <TableCell align="right">نوع خرید</TableCell>
                                <TableCell align="right">خرید</TableCell>
                                <TableCell align="right">مرکز</TableCell>
                                <TableCell align="right">جنسیت</TableCell>
                                <TableCell align="right">قیمت واحد</TableCell>
                                <TableCell align="right">تعداد</TableCell>
                                <TableCell align="right">قابل پرداخت</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {invoice.InvoiceBuyables && invoice.InvoiceBuyables.map((row, index) => (
                                <TableRow hover role={"checkbox"} tabIndex={-1}
                                          key={"InvoiceBuyable" + row.Id.toString()}>
                                    <TableCell align="right">{row.Id}</TableCell>
                                    <TableCell align="right">{BuyableType[row.BuyableType]}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="right">{row.Place.Name}</TableCell>
                                    <TableCell align="right">{genders[row.Gender]}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(row.UnitPrice)}</TableCell>
                                    <TableCell align="right">
                                        <button
                                            type="button"
                                            className="btn btn-clean btn-sm btn-icon btn-icon-sm ng-star-inserted h-25"
                                            onClick={(e) => updateInvoiceBuyableCount(e, row, true)}
                                        >
                                            <KeyboardArrowUp/>
                                        </button>
                                        {row.Count}
                                        <button
                                            type="button"
                                            className="btn btn-clean btn-sm btn-icon btn-icon-sm ng-star-inserted h-25"
                                            onClick={(e) => updateInvoiceBuyableCount(e, row, false)}
                                        >
                                            <KeyboardArrowDown/>
                                        </button>
                                    </TableCell>
                                    <TableCell align="right">{toPriceWithComma(row.UnitPrice * row.Count)}</TableCell>
                                    <TableCell align="left">
                                        <button
                                            type="button"
                                            className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted h-25"
                                            onClick={(e) => setItemToDelete(row)}
                                            disabled={invoice.Status !== "DRAFT"}
                                        >
                                            <DeleteRounded color={"error"}/>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
            {RenderModalDelete()}
        </>
    );
};

export default InvoiceDetailBuyables;
