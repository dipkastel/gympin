import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Support_query} from "../../../../network/api/support.api";
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
import {Message, NoteAlt, RequestQuote} from "@mui/icons-material";
import {SettlementUserDeposit_query} from "../../../../network/api/settlementUserDeposit.api";
import {UserFinanceTypesEnum} from "../../../../helper/enums/UserFinanceTypesEnum";

const _DashSettelment = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [settelment, setSettelment] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppDashSupport());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        SettlementUserDeposit_query({
            queryType: "FILTER",
            SettlementStatus:"REQUESTED",
            paging: {Page: page, Size: (rowsPerPage), orderBy: "Serial", Desc: true}
        }).then((data) => {
            setSettelment(data.data.Data)
            console.log(data.data.Data);
        }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
        });
    }, [page, rowsPerPage]);

    function getLastMessage(support) {
        try {
            return support.Messages[support.Messages.length - 1]
        } catch (e) {
            return null;
        }
    }

    function renderModalSupport() {
        return (
            <>
                <Modal show={showModal} size={"lg"} onHide={() => setShowModal(false)}>
                    <Portlet>
                        <PortletHeader
                            title="پیام های جدید پشتیبانی"
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
                                            <TableCell align="right" padding="normal" sortDirection={false}>ایجاد کننده</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>کیف پول</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>صاحب کیف پول</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>موجودی کاربر</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>تاریخ درخواست</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {settelment.content && settelment.content.map((row, index) => (
                                            <TableRow hover
                                                      onClick={(event) => history.push({pathname: "/users/details/" + row?.FinanceUser?.User?.Id})}
                                                      role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{toPriceWithComma(row?.Amount)}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{getUserFixedName(row?.CreatorUser)}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{UserFinanceTypesEnum[row?.FinanceUser?.FinanceType]}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{getUserFixedName(row?.FinanceUser?.User)}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{toPriceWithComma(row?.FinanceUser?.TotalDeposit)}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{new Date(row?.CreatedDate).toLocaleDateString('fa-IR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {(settelment.totalElements > 0) && <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                sx={{direction: "rtl"}}
                                count={settelment.totalElements || 0}
                                labelRowsPerPage={"تعداد نمایش"}
                                labelDisplayedRows={(param) => {
                                    return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                                }}
                                rowsPerPage={rowsPerPage}
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
            onClick={()=>{setShowModal(settelment.totalElements > 0)}}
            title="تسویه حساب"
            text={settelment.totalElements > 0 ? "شما " + settelment.totalElements + " تسویه انجام نشده" : "تمام تسویه ها انجام شده"}
            icon={<RequestQuote sx={{fontSize: 40, color: settelment.totalElements > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashSettelment;
