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
import {getRppDashSupport} from "../../../../helper/pocket/pocket";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {CallEnd, Message, Payment} from "@mui/icons-material";
import {SettlementUserDeposit_getAllCreditors} from "../../../../network/api/settlementUserDeposit.api";
import PopoverUser from "../../../../components/popover/PopoverUser";
import {settings_getCallList} from "../../../../network/api/settings.api";
import TablePagination from "@mui/material/TablePagination";

const _DashCallList = () => {

    const error = useContext(ErrorContext);
    const [callList, setCallList] = useState(null)

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        settings_getCallList({
            fromDate:yesterday,
            limit: rowsPerPage,
            pagination: page,
            directionType:"Incoming"
        })
            .then((data) => {
                console.log(data.data.Data.data);
                setCallList(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, [page, rowsPerPage]);


    function renderModalCredits() {
        return (
            <>
                <Modal show={showModal} size={"lg"} onHide={() => setShowModal(false)}>
                    <Portlet>
                        <PortletHeader
                            title="تماس های از دیروز"
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
                                            <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>تماس از</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>تماس به</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>ساعت</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {callList?.data?.map((row, index) => (
                                            <TableRow hover
                                                      sx={{bgcolor:row?.reportDispositionType=="Answered"?"#e7f8ea":"#f8eaea"}}
                                                      role="checkbox" tabIndex={-1} key={row?.Id}>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right"><PopoverUser user ={row?.User} /></TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row?.fromNumber.replace("+98","0")}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row?.toNumber.replace("+98","0")}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{new Date(row?.startTime).toLocaleTimeString('fa-IR', {
                                                    hour:"numeric",
                                                    minute:"numeric",
                                                    second:"numeric"
                                                })}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                                        {(callList?.totalCount > 0) && <TablePagination
                                            rowsPerPageOptions={[5, 10]}
                                            component="div"
                                            sx={{direction: "rtl"}}
                                            count={callList?.totalCount || 0}
                                            labelRowsPerPage={"تعداد نمایش"}
                                            labelDisplayedRows={(param) => {
                                                return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                                            }}
                                            rowsPerPage={parseInt(rowsPerPage)}
                                            page={page}
                                            onPageChange={(event, newPage) => setPage(newPage)}
                                            onRowsPerPageChange={(event) => {
                                                setRowsPerPage(parseInt(event.target.value, 10));
                                                setPage(1);
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
            onClick={() => {
                setShowModal(callList?.data?.length > 0)
            }}
            title="تماس ها"
            text={callList?.totalCount > 0 ? "شما " + callList?.totalCount + " تماس از دیروز دارید" : "از دیروز هیچ تماسی وجود ندارد"}
            icon={<CallEnd sx={{fontSize: 40, color: callList?.totalCount > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalCredits()}
    </>)
}

export default _DashCallList;
