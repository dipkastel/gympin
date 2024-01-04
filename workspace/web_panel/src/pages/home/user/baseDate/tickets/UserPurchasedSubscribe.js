import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {Table} from "react-bootstrap";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {purchasedSubscribe_query} from "../../../../../network/api/purchasedSubscribes.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";

const PurchasedSubscribeManagement = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [purchasedSubscribe, SetPurchasedSubscribe] = useState({});

    useEffect(() => {
        getSubscribes()
    }, [page, rowsPerPage]);

    function getSubscribes() {
        purchasedSubscribe_query({
            queryType: "FILTER",
            UserId:currentUser.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((result) => {
            SetPurchasedSubscribe(result.data.Data)
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
            <Portlet>
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مرکز</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>عضویت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ورود</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>قیمت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>انقضا</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {purchasedSubscribe.content && purchasedSubscribe.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "/subscribe/data/" + row.Id});
                                        }} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell align="right">{getUserFixedName(row.User)}</TableCell>
                                            <TableCell
                                                align="right">{row?.TicketSubscribe.Place?.Name || "ثبت نشده"}</TableCell>
                                            <TableCell align="right">{row.Name || "ثبت نشده"}</TableCell>
                                            <TableCell
                                                align="right">{row.EntryList.length + "/" + row.EntryTotalCount}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row.Price)}</TableCell>
                                            <TableCell align="right">

                                                <Tooltip
                                                    title={"تاریخ طبق بلیط : " + (new Date(row.TicketSubscribeExpireDate).toLocaleDateString('fa-IR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    }))} >
                                                    <span>
                                                    {new Date(row.ExpireDate).toLocaleDateString('fa-IR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(purchasedSubscribe.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={purchasedSubscribe.totalElements || 0}
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
        </>
    );
};

export default PurchasedSubscribeManagement;
