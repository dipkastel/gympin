import React, {useEffect, useState} from 'react';
import {PortletBody, PortletFooter} from "../../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {Tooltip} from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import {SupervisorAccount} from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import {transactionCorporate_query} from "../../../../../network/api/transactionsCorporate.api";

const _PersonnelTransactions = ({ currentUser ,updatePage}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [transactions, SetTransactions] = useState({});
    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage]);

    function getTransactions() {
        transactionCorporate_query({
            queryType: "FILTER",
            Type:"CREDIT",
            CorporatePersonnelUserId:currentUser.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
            console.log(data.data.Data)
        });
    }


    return (
        <>
            <PortletBody>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="right" padding="normal" sortDirection={false}>طرف</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>وضعیت تراکنش</TableCell>
                                <TableCell align="left" padding="normal" sortDirection={false}>جزئیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.content && transactions.content.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" sx={{backgroundColor:(row.Amount>0)?"#d3fcef":"#f5d2d2"}} key={row.Id.toString()}>
                                        <TableCell component="th" padding="normal" align="right">
                                            {row?.CorporatePersonnel?.Corporate?.Name}
                                        </TableCell>
                                        <TableCell component="th" padding="normal" align="right">
                                            {toPriceWithComma(row.Amount)}
                                        </TableCell>
                                        <TableCell component="th" padding="normal" align="right">
                                            {TransactionStatus[row.TransactionStatus]}
                                        </TableCell>
                                        <TableCell component="th" padding="normal" align="left">

                                            {row.Serial&&<Tooltip title={row.Serial?.Serial} placement="top">
                                                <QrCodeIcon color={"success"}/>
                                            </Tooltip>}
                                            {row.Place&&<Tooltip title={row.Place?.Name} placement="top">
                                                <ApartmentIcon color={"success"}/>
                                            </Tooltip>}
                                            {row.Purchased&&<Tooltip title={row.Purchased?.Name} placement="top">
                                                <ConfirmationNumberIcon color={"success"}/>
                                            </Tooltip>}
                                            {row.CreatorUser&&<Tooltip title={getUserFixedName(row.CreatorUser)} placement="top">
                                                <SupervisorAccount color={"success"}/>
                                            </Tooltip>}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PortletBody>

            <PortletFooter >
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
        </>
    );
};

export default _PersonnelTransactions;
