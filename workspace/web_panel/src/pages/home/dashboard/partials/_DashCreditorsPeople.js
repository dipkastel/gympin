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
import {Message} from "@mui/icons-material";
import {transactionIncome_query} from "../../../../network/api/transactionsIncome.api";
import {
    getAllCreditors_confirmSettlementRequest,
    SettlementUserDeposit_getAllCreditors
} from "../../../../network/api/settlementUserDeposit.api";

const _DashCreditorsPeople = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [creditorList, setCreditorList] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppDashSupport());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        SettlementUserDeposit_getAllCreditors()
            .then((data) => {
                console.log("یهذهیه یخ",data.data.Data)
                setCreditorList(data.data.Data);
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
                                            <TableCell align="right" padding="normal" sortDirection={false}>کیف پول</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>حساب مربوط به</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { creditorList?.map((row, index) => (
                                            <TableRow hover
                                                      onClick={(event) => history.push({pathname: "/Users/details/" + row.User.Id})}
                                                      role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{toPriceWithComma(row.TotalDeposit)}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{getUserFixedName(row.User)}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                {/*            {(creditorList.totalElements > 0) && <TablePagination*/}
                {/*                rowsPerPageOptions={[5, 10]}*/}
                {/*                component="div"*/}
                {/*                sx={{direction: "rtl"}}*/}
                {/*                count={creditorList.totalElements || 0}*/}
                {/*                labelRowsPerPage={"تعداد نمایش"}*/}
                {/*                labelDisplayedRows={(param) => {*/}
                {/*                    return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`*/}
                {/*                }}*/}
                {/*                rowsPerPage={parseInt(rowsPerPage)}*/}
                {/*                page={page}*/}
                {/*                onPageChange={(event, newPage) => setPage(newPage)}*/}
                {/*                onRowsPerPageChange={(event) => {*/}
                {/*                    setRowsPerPage(parseInt(event.target.value, 10));*/}
                {/*                    SetRppDashSupport(parseInt(event.target.value, 10));*/}
                {/*                    setPage(0);*/}
                {/*                }}*/}
                {/*            />}*/}
                        </PortletBody>
                    </Portlet>
                </Modal>
            </>
        )
    };

    return (<>
        <QuickStatsIcon
            onClick={()=>{setShowModal(creditorList.length > 0)}}
            title="بدهی ها"
            text={creditorList.length > 0 ? "شما " + creditorList.length + " درآمد تسویه نشده دارید" : "جیم پین بدیهی ندارد"}
            icon={<Message sx={{fontSize: 40, color: creditorList.length > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalCredits()}
    </>)
}

export default _DashCreditorsPeople;
