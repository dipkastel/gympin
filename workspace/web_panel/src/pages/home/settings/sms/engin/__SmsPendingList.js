import React, {useContext, useEffect, useState} from 'react';
import {getRppSmsList, SetRppSmsList} from "../../../../../helper/pocket/pocket";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {sms_ChangeStatus, sms_query} from "../../../../../network/api/sms.api";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Button, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {SmsTypes} from "../../../../../helper/enums/SmsTypes";
import TablePagination from "@mui/material/TablePagination";

const __SmsPendingList = ({updatePage}) => {

    const error = useContext(ErrorContext);
    const [smsPendingList, SetSmsPendingList] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppSmsList());

    useEffect(() => {
        let id = setInterval(getSmsPendingList, 10*1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        getSmsPendingList();
    }, []);

    function cancelSendSms(sms) {
        sms_ChangeStatus({
            Id: sms.Id,
            SmsStatus:"CANCEL"
        }).then((data) => {
            updatePage();
        });

    }

    function getSmsPendingList() {
        sms_query({
            queryType: "SEARCH",
            SmsStatus:"PENDING",
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then((data) => {
            SetSmsPendingList(data.data.Data)
        });

    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={<>
                        <Typography variant={"subtitle1"}>لیست در انتظار ارسال</Typography>
                    </>}
                />

                <PortletBody className={"p-2"}>

                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size={"small"}
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تلفن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نوع پیامک</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>زمان ارسال</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>سرویس دهنده</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>پترن</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {smsPendingList.content && smsPendingList.content.map((row, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index.toString()}>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row.UserNumber}</TableCell>
                                        <TableCell align="right">{SmsTypes[row.SmsType]}</TableCell>
                                        <TableCell align="right">{row.SmsStatus}</TableCell>
                                        <TableCell align="right">{new Date(row.SmsSendTime).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit"
                                        })}</TableCell>
                                        <TableCell align="right">{row.Pattern.Provider}</TableCell>
                                        <TableCell align="right">{row.Pattern.Name}</TableCell>
                                        <TableCell align="left">

                                            <Button
                                                variant="contained"
                                                color={"error"}
                                                onClick={(e) => cancelSendSms(row)}
                                            >
                                                لغو
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PortletBody>

                {(smsPendingList.totalElements > 0) && <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                    component="div"
                    sx={{direction: "rtl"}}
                    count={smsPendingList.totalElements || 0}
                    labelRowsPerPage={"تعداد نمایش"}
                    labelDisplayedRows={(param) => {
                        return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                    }}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        SetRppSmsList(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />}
            </Portlet>

        </>
    );
};

export default __SmsPendingList;
