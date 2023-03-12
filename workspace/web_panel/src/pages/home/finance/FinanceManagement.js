import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {transaction_query} from "../../../network/api/transactions.api";
import {toPriceWithComma} from "../../../helper";
import {TransactionTypes} from "../../../helper/enums/TransactionTypes";
import {TransactionStatus} from "../../../helper/enums/TransactionStatus";
import {FilterAlt} from "@mui/icons-material";
import _financeFilter, {defaultFilterFinance} from "./_financeFilter";


const FinanceManagement = () => {
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [transactions, SetTransactions] = useState({});

    const [openModalFilter, setOpenModalFilter] = useState(false);
    const [filter, SetFilter] = useState(defaultFilterFinance);


    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage, filter]);

    function getTransactions() {
        transaction_query({
            queryType: filter.queryType,
            TransactionStatus: filter.TransactionStatus,
            TransactionType: filter.TransactionType,
            UserId: filter.UserId,
            PlaceId: filter.PlaceId,
            CorporateId: filter.CorporateId,
            Serial:filter.Serial,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        });
    }



    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>بخش مالی برای درستی سنجی عملکرد سیستم راه اندازی شده است.</p>
                <p>یک نسخه از تراکنش های سیستم در این قسمت گردآوری شده تا عملکرد مالی را بتوان با جزئیات بیشتری بررسی
                    نمود</p>
            </Notice>

            <Portlet>
                <PortletHeader
                    title="تراکنش ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <IconButton aria-label="fingerprint"
                                        color={JSON.stringify(filter) == JSON.stringify(defaultFilterFinance) ? "default" : "secondary"}
                                        onClick={() => setOpenModalFilter(true)}>
                                <FilterAlt fontSize={"large"}/>
                            </IconButton>
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مربوط</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نوع
                                        ترکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>باقی مانده حساب
                                        مربوطه</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت
                                        تراکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>سریال ارتباطی تراکنش
                                        ها</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.content && transactions.content.map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" key={row.Id.toString()}>

                                            <TableCell component="th" id={`transaction-${index}`} scope="row"
                                                       padding="normal" align="right">{row.Id}</TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {row.Corporate &&
                                                <Button href={"/corporate/details/" + row.Corporate.Id}
                                                        variant={"contained"}
                                                        color={"secondary"}>{'شرکت ' + row.Corporate.Name}</Button>}
                                                {row.CorporatePersonnel &&
                                                <Button href={"/corporate/personnel/" + row.CorporatePersonnel.Id}
                                                        variant={"contained"} color={"primary"}>
                                                    {row.CorporatePersonnel.User.FullName + " پرسنل " + row.CorporatePersonnel.Corporate.Name}
                                                </Button>}
                                                {row.Place &&
                                                <Button href={"/place/data/" + row.Place.Id} variant={"contained"}
                                                        color={"warning"}>{'مرکز ' + row.Place.Name}</Button>}
                                                {row.User &&
                                                <Button href={"/users/details/" + row.User.Id} variant={"contained"}
                                                        color={"info"}>{'کاربر ' + row.User.Username + `(${row.User.FullName})`}</Button>}
                                                {!(row.Corporate || row.CorporatePersonnel || row.Place || row.User) &&
                                                <Button variant={"contained"} color={"error"}>جیم پین</Button>}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {toPriceWithComma(row.Amount)}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {TransactionTypes[row.TransactionType]}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {toPriceWithComma(row.Balance)}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {TransactionStatus[row.TransactionStatus]}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {row.Serial}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                </PortletBody>
            </Portlet>
            <_financeFilter filter={filter} setFilter={SetFilter} openModal={openModalFilter} setOpenModal={(e)=>setOpenModalFilter(e)}/>
        </>
    );
};

export default FinanceManagement;
