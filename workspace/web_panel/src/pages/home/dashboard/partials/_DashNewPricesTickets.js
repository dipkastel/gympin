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
import {getPlaceFixedName, getUserFixedName} from "../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {getRppDashSupport, SetRppDashSupport} from "../../../../helper/pocket/pocket";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {Check, Close, Message, PublishedWithChanges, Reviews} from "@mui/icons-material";
import {placeComments_query, placeComments_update} from "../../../../network/api/placeComment.api";
import {Button} from "@mui/material";
import {TicketSubscribes_query} from "../../../../network/api/ticketSubscribes.api";

const _DashNewPricesTickets = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [Comment, setComment] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppDashSupport);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getComments();
    }, [page, rowsPerPage]);

    function getComments(){
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        TicketSubscribes_query({
            queryType: "FILTER",
            MinUpdateDate: yesterday,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        })
            .then((data) => {
                console.log("message",data.data.Data)
                setComment(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function renderModalSupport() {
        return (
            <>
                <Modal show={showModal} size={"xl"} onHide={() => setShowModal(false)}>
                    <Portlet>
                        <PortletHeader
                            title="نظرات جدید کاربران"
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
                                            <TableCell align="right" padding="normal" sortDirection={false}>بلیط</TableCell>
                                            {/*<TableCell align="right" padding="normal" sortDirection={false}>تاریخ</TableCell>*/}
                                            <TableCell align="right" padding="normal" sortDirection={false}>مجموعه</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>آخرین تغییر</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>قیمت</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>تخفیف</TableCell>
                                            {/*<TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>*/}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Comment.content && Comment.content.map((row, index) => (
                                            <TableRow hover
                                                      onClick={(event) => history.push({pathname: "/place/ticketSubscribe/" + row.Id})}
                                                      role="checkbox" tabIndex={-1} key={row?.Id?.toString()}>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row.Name}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{getPlaceFixedName(row.Place)}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{new Date(row.UpdatedDate).toLocaleDateString('fa-IR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row.Price}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row.Discount}</TableCell>
                                                {/*<TableCell component="th" scope="row" padding="normal"*/}
                                                {/*           align="right">*/}
                                                {/*    {row.Childes.length>0?<Check color={"success"}/>:<Close color={"error"}/>}*/}
                                                {/*</TableCell>*/}
                                                {/*<TableCell component="th" scope="row" padding="normal"*/}
                                                {/*           align="left">*/}
                                                {/*    {row.Status=="AWAIT"&&<>*/}
                                                {/*        <Button variant={"contained"} color={"success"} onClick={(e)=>SetStatus(row,"CONFIRMED")} >تایید</Button>*/}
                                                {/*        <Button variant={"contained"} color={"error"} onClick={(e)=>SetStatus(row,"REJECTED")} >رد</Button>*/}
                                                {/*    </>}*/}
                                                {/*</TableCell>*/}

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {(Comment.totalElements > 0) && <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                sx={{direction: "rtl"}}
                                count={Comment.totalElements || 0}
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
            onClick={()=>{setShowModal(Comment.totalElements > 0)}}
            title="قیمت های جدید"
            text={Comment.totalElements > 0 ? Comment.totalElements + " بلیط از دیروز تغییر کرده" : "تمام بلیط ها به روز شده"}
            icon={<PublishedWithChanges sx={{fontSize: 40, color: Comment.totalElements > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashNewPricesTickets;
