import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import TableContainer from "@mui/material/TableContainer";
import {Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useHistory} from "react-router-dom";
import {getUserFixedName, toPriceWithComma} from "../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {getRppDashSupport, SetRppDashSupport} from "../../../../helper/pocket/pocket";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {AttachMoney, Info} from "@mui/icons-material";
import {IncreaseUserDeposit_query} from "../../../../network/api/increaseUserDeposit.api";
import {Avatar, Button, Tooltip} from "@mui/material";
import {GatewayType} from "../../../../helper/enums/GatewayType";
import PopoverUser from "../../../../components/popover/PopoverUser";

const _DashIncreaseUser = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [requests, setRequests] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppDashSupport());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        IncreaseUserDeposit_query({
            queryType: "FILTER",
            DepositStatus:"REQUESTED",
            paging: {Page: page, Size: (rowsPerPage), orderBy: "Serial", Desc: true}
        }).then((result) => {
            setRequests(result.data.Data)
        }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
        });
    }, [page, rowsPerPage]);


    function renderModalSupport() {
        return (
            <>
                <Modal show={showModal} size={"xl"} onHide={() => setShowModal(false)}>
                    <Portlet>
                        <PortletHeader
                            title="درخواست های شارژ حساب کاربری "
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
                                            <TableCell align="left" padding="normal" sortDirection={false}></TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>نوع پرداخت</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                            {requests?.content?.some(c=>c.Refrence)&&<TableCell align="right" padding="normal" sortDirection={false}>مرجع</TableCell>}
                                            {requests?.content?.some(c=>c.Description)&&<TableCell align="left" padding="normal" sortDirection={false}>توضیح</TableCell>}
                                            <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {requests.content && requests.content.map((row, index) => (
                                            <TableRow hover
                                                      role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                                <TableCell align="left"><Avatar alt="userImage" src={(row?.User?.Avatar) ? (row?.User?.Avatar?.Url || "") : ""} sx={{width: 30, height: 30}}/></TableCell>
                                                <TableCell align="right"><PopoverUser user ={row?.User} /></TableCell>
                                                <TableCell component="th" scope="row" padding="normal" align="right">{GatewayType[row?.GatewayType]}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal" align="right">{toPriceWithComma(row?.Amount)}</TableCell>
                                                {requests?.content?.some(c=>c.Refrence)&&<TableCell component="th" scope="row" padding="normal" align="right">{row?.Refrence}</TableCell>}
                                                {requests?.content?.some(c=>c.Description)&&<TableCell component="th" scope="row" padding="normal" align="left">
                                                    <Tooltip title={row?.Description || ""} placement="top">
                                                        <Info />
                                                    </Tooltip>
                                                </TableCell>}

                                                <TableCell component="th" scope="row" padding="normal" align="left">

                                                    <Button
                                                        variant={"contained"}
                                                        href={"/Users/details/" + row.User.Id}
                                                    >جزییات</Button>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {(requests.totalElements > 0) && <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                sx={{direction: "rtl"}}
                                count={requests.totalElements || 0}
                                labelRowsPerPage={"تعداد نمایش"}
                                labelDisplayedRows={(param) => {
                                    return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                                }}
                                rowsPerPage={parseInt(rowsPerPage)}
                                page={page}
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(event) => {
                                    setRowsPerPage(parseInt(event.target.value, 10));
                                    SetRppDashSupport(parseInt(event.target.value, 10));
                                    setPage(0);
                                }}
                            />}
                        </PortletBody>
                    </Portlet>
                </Modal>
            </>
        )
    };

    return (<>
        <QuickStatsIcon
            onClick={()=>{setShowModal(requests.totalElements > 0)}}
            title="افزایش اعتبار کاربر"
            text={requests.totalElements > 0 ? "شما " + requests.totalElements + " درخواست افزایش شارژ دارید" : "تمام درخواست ها بررسی شده"}
            icon={<AttachMoney sx={{fontSize: 40, color: requests.totalElements > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashIncreaseUser;
