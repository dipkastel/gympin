import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {getUserFixedName, toPriceWithComma} from "../../../../helper";
import {TransactionStatus} from "../../../../helper/enums/TransactionStatus";
import {transactionCorporate_query} from "../../../../network/api/transactionsCorporate.api";
import {TransactionCorporateTypes} from "../../../../helper/enums/TransactionCorporateTypes";
import {transactionIncome_query} from "../../../../network/api/transactionsIncome.api";
import {TransactionBaseTypes} from "../../../../helper/enums/TransactionBaseTypes";
import {getRppTransactionIncomeManagement, SetRppTransactionIncomeManagement} from "../../../../helper/pocket/pocket";

const TransactionsIncomeManagement = () => {
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppTransactionIncomeManagement());
    const [transactions, SetTransactions] = useState({});


    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage]);

    function getTransactions() {
        transactionIncome_query({
            queryType: "FILTER",
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((result) => {
            console.log(result.data.Data)
            SetTransactions(result.data.Data)
        });
    }


    return (
        <>

            <Portlet>
                <PortletHeader title="تراکنش های درامد"/>
                <PortletBody>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium">

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>حساب قبل از تراکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت تراکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نوع تراکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>بلیط</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مجموعه</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ایجاد کننده</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.content && transactions.content.map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox"
                                                  sx={{backgroundColor: (row.Amount > 0) ? "#d3fcef" : "#f5d2d2"}}
                                                  key={row.Id.toString()}>

                                            <TableCell component="th" id={`transaction-${index}`} scope="row"
                                                       padding="normal" align="right">{row.Id}</TableCell>
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
                                                {TransactionBaseTypes[row.TransactionType]}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {getUserFixedName(row.Purchased?.Customer)}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {row.Purchased?.Name}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {row.Purchased?.Place?.Name}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {getUserFixedName(row.CreatorUser)}
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
                            SetRppTransactionIncomeManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default TransactionsIncomeManagement;
