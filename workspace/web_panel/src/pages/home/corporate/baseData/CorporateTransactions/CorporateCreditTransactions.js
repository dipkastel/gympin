import React, {useEffect, useState} from "react";
import {
    Portlet,
    PortletBody,
    PortletFooter,
    PortletHeader,
    PortletHeaderToolbar,
} from "../../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma} from "../../../../../helper";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import TablePagination from "@mui/material/TablePagination";
import {transactionCorporate_query} from "../../../../../network/api/transactionsCorporate.api";
import {TransactionCorporateTypes} from "../../../../../helper/enums/TransactionCorporateTypes";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getRppCorporateTransactions, SetRppCorporateTransactions} from "../../../../../helper/pocket/pocket";

function CorporateCreditTransactions({currentCorporate, updatePage}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppCorporateTransactions());
    const [transactions, SetTransactions] = useState({});

    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage]);

    function getTransactions() {
        transactionCorporate_query({
            queryType: "FILTER",
            Type: "CREDIT",
            FinanceCorporateId: currentCorporate.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        });
    }


    return (
        <Portlet>
            <PortletHeader
                title="تراکنش های اعتبار سازمان"
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
                                <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>حساب قبل
                                    تراکنش</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>وضعیت
                                    تراکنش</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>سریال ارتباطی تراکنش
                                    ها</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.content && transactions.content.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox"
                                              sx={{backgroundColor: (row.Amount > 0) ? "#d3fcef" : "#f5d2d2"}}
                                              key={row.Id.toString()}>
                                        <TableCell component="th" padding="normal" align="right">
                                            {toPriceWithComma(row.Amount)}
                                        </TableCell>
                                        <TableCell component="th" padding="normal" align="right">
                                            {toPriceWithComma(row.LatestBalance)}
                                        </TableCell>
                                        <TableCell component="th" padding="normal" align="right">
                                            {TransactionStatus[row.TransactionStatus]}
                                        </TableCell>
                                        <TableCell component="th" padding="normal" align="right">
                                            {row.Serial.Serial}
                                        </TableCell>
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
                        SetRppCorporateTransactions(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />}
            </PortletFooter>
        </Portlet>
    );
}

export default CorporateCreditTransactions;
