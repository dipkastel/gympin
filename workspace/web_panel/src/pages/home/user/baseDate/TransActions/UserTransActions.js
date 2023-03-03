import React, {useEffect, useState} from "react";
import {
  Portlet,
  PortletBody,
  PortletFooter,
  PortletHeader,
} from "../../../../partials/content/Portlet";
import {transaction_query} from "../../../../../network/api/transactions.api";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {TransactionTypes} from "../../../../../helper/enums/TransactionTypes";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import TablePagination from "@mui/material/TablePagination";

function UserTransActions({ currentUser }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [transactions, SetTransactions] = useState({});

    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage]);

    function getTransactions() {
        transaction_query({
            queryType: "FILTER",
            UserId:currentUser.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        });
    }


    return (
    <Portlet>
      <PortletHeader title="تراکنش های کاربر" />

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
  );
}

export default UserTransActions;
