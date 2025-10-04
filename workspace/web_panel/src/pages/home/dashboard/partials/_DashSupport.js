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
import {getUserFixedName} from "../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {getRppDashSupport, SetRppDashSupport} from "../../../../helper/pocket/pocket";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {Message} from "@mui/icons-material";

const _DashSupport = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [supportList, setSupportList] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppDashSupport());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        Support_query({
            queryType: "FILTER",
            Status: "AWAITING_EXPERT",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        })
            .then((data) => {
                setSupportList(data.data.Data);
            })
            .catch(e => {
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
                                            <TableCell align="right" padding="normal"
                                                       sortDirection={false}>متن</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>ایجاد
                                                کننده</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {supportList.content && supportList.content.map((row, index) => (
                                            <TableRow hover
                                                      onClick={(event) => history.push({pathname: "/support/details/" + row.Id})}
                                                      role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{getLastMessage(row).Message}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{getUserFixedName(row.CreatorUser)}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {(supportList.totalElements > 0) && <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                sx={{direction: "rtl"}}
                                count={supportList.totalElements || 0}
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
            onClick={()=>{setShowModal(supportList.totalElements > 0)}}
            title="پشتیبانی"
            text={supportList.totalElements > 0 ? "شما " + supportList.totalElements + " پیام پشتیبانی دارید" : "تمام یاداشت ها انجام شده"}
            icon={<Message sx={{fontSize: 40, color: supportList.totalElements > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashSupport;
