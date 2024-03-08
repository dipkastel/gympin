import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {Chip, Tooltip} from "@mui/material";
import {Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName, toPriceWithComma} from "../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {purchasedCourse_query} from "../../../../network/api/purchasedCourses.api";
import {PurchasedCourseStatus} from "../../../../helper/enums/PurchasedCourseStatus";
import {getRppPurchasedCourseManagement, SetRppPurchasedCourseManagement} from "../../../../helper/pocket/pocket";

const PurchasedCourseManagement = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppPurchasedCourseManagement());
    const [purchasedCourse, SetPurchasedCourse] = useState({});

    useEffect(() => {
        getCourses()
    }, [page, rowsPerPage]);

    function getCourses() {
        purchasedCourse_query({
            queryType: "FILTER",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((result) => {
            SetPurchasedCourse(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getStatusCollor(row) {
        switch (row.Status) {
            case "PAYMENT_WAIT":
                return "info";
            case "READY_TO_ACTIVE":
                return "default";
            case "CANCEL":
                return "error";
            case "EXPIRE":
                return "warning";
            case "ACTIVE":
                return "success";
            case "PROCESSING":
                return "secondary";
            case "COMPLETE":
                return "primary";
        }
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="عضویت ها"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مرکز</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>عضویت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ورود</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>قیمت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>انقضا</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {purchasedCourse.content && purchasedCourse.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "course/data/" + row?.Id});
                                        }} role="checkbox" tabIndex={-1} key={row?.Id.toString()}>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row?.Id}</TableCell>
                                            <TableCell align="right">{getUserFixedName(row?.User)}</TableCell>
                                            <TableCell
                                                align="right">{row?.TicketCourse?.Place?.Name || "ثبت نشده"}</TableCell>
                                            <TableCell align="right">{row?.Name || "ثبت نشده"}</TableCell>
                                            <TableCell
                                                align="right">{row?.EntryList?.length + "/" + row?.EntryTotalCount}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row?.Price)}</TableCell>
                                            <TableCell align="right">

                                                <Tooltip
                                                    title={"تاریخ طبق بلیط : " + (new Date(row?.TicketCourseExpireDate).toLocaleDateString('fa-IR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    }))}>
                                                    <span>
                                                    {new Date(row?.ExpireDate).toLocaleDateString('fa-IR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="right"><Chip color={getStatusCollor(row)} size={"small"}
                                                                           label={PurchasedCourseStatus[row.Status]}/></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(purchasedCourse.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={purchasedCourse.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppPurchasedCourseManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default PurchasedCourseManagement;
