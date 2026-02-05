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
import {AddPhotoAlternate, Check, Close, Message, Reviews} from "@mui/icons-material";
import {placeComments_query, placeComments_update} from "../../../../network/api/placeComment.api";
import {Button} from "@mui/material";

const _DashPlaceNewImages = () => {

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
        // placeComments_query({
        //     queryType: "FILTER",
        //     Status: "AWAIT",
        //     paging: {Page: page, Size: rowsPerPage, Desc: true}
        // })
        //     .then((data) => {
        //         console.log("message",data.data.Data)
        //         setComment(data.data.Data);
        //     })
        //     .catch(e => {
        //         try {
        //             error.showError({message: e.response.data.Message,});
        //         } catch (f) {
        //             error.showError({message: "خطا نا مشخص",});
        //         }
        //     });
    }

    function SetStatus(item,status) {
        console.log({...item,Status:status})
        placeComments_update({...item,Status:status})
            .then((data) => {
                setPage(0);
                getComments();
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
                            title="تصاویر جدید کاربران"
                        />
                        <PortletBody>
                            <TableContainer>
                                <Table
                                    sx={{minWidth: 750}}
                                    aria-labelledby="tableTitle"
                                    size="medium"
                                >

                                    {/*<TableHead>*/}
                                    {/*    <TableRow>*/}
                                    {/*        <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>*/}
                                    {/*        <TableCell align="right" padding="normal" sortDirection={false}>تاریخ</TableCell>*/}
                                    {/*        <TableCell align="right" padding="normal" sortDirection={false}>مجموعه</TableCell>*/}
                                    {/*        <TableCell align="right" padding="normal" sortDirection={false}>نظر</TableCell>*/}
                                    {/*        <TableCell align="right" padding="normal" sortDirection={false}>جواب</TableCell>*/}
                                    {/*        <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*</TableHead>*/}
                                    {/*<TableBody>*/}
                                    {/*    {Comment.content && Comment.content.map((row, index) => (*/}
                                    {/*        <TableRow hover*/}
                                    {/*                  role="checkbox" tabIndex={-1} key={row?.Id?.toString()}>*/}
                                    {/*            <TableCell component="th" scope="row" padding="normal"*/}
                                    {/*                       align="right">{getUserFixedName(row.User)}</TableCell>*/}
                                    {/*            <TableCell component="th" scope="row" padding="normal"*/}
                                    {/*                       align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {*/}
                                    {/*                year: 'numeric',*/}
                                    {/*                month: 'long',*/}
                                    {/*                day: 'numeric',*/}
                                    {/*                hour: "2-digit",*/}
                                    {/*                minute: "2-digit"*/}
                                    {/*            })}</TableCell>*/}
                                    {/*            <TableCell component="th" scope="row" padding="normal"*/}
                                    {/*                       align="right">{getPlaceFixedName(row.Place)}</TableCell>*/}
                                    {/*            <TableCell component="th" scope="row" padding="normal"*/}
                                    {/*                       align="right">{row.Comment}</TableCell>*/}
                                    {/*            <TableCell component="th" scope="row" padding="normal"*/}
                                    {/*                       align="right">*/}
                                    {/*                {row.Childes.length>0?<Check color={"success"}/>:<Close color={"error"}/>}*/}
                                    {/*            </TableCell>*/}
                                    {/*            <TableCell component="th" scope="row" padding="normal"*/}
                                    {/*                       align="left">*/}
                                    {/*                {row.Status=="AWAIT"&&<>*/}
                                    {/*                    <Button variant={"contained"} color={"success"} onClick={(e)=>SetStatus(row,"CONFIRMED")} >تایید</Button>*/}
                                    {/*                    <Button variant={"contained"} color={"error"} onClick={(e)=>SetStatus(row,"REJECTED")} >رد</Button>*/}
                                    {/*                </>}*/}
                                    {/*            </TableCell>*/}

                                    {/*        </TableRow>*/}
                                    {/*    ))}*/}
                                    {/*</TableBody>*/}
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
            title="تصاویر جدید"
            text={Comment.totalElements > 0 ? "شما " + Comment.totalElements + " تصویر جدید دارید" : "تصویر جدید وجود ندارد"}
            icon={<AddPhotoAlternate sx={{fontSize: 40, color: Comment.totalElements > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashPlaceNewImages;
