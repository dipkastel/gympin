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
import TablePagination from "@mui/material/TablePagination";
import {getRppDashSupport, SetRppDashSupport} from "../../../../helper/pocket/pocket";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {Message} from "@mui/icons-material";
import {PlaceGym_query} from "../../../../network/api/placeGym.api";

const _DashUncontractPlaces = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [UncontractPlaces, setUncontractPlaces] = useState(null)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppDashSupport());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        PlaceGym_query({
            queryType: "FILTER",
            Status:"ACTIVE",
            HasContract:false,
            paging: {Page: page, Size: rowsPerPage, Desc: true}}
        ).then(data => {
            setUncontractPlaces(data.data.Data)
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
                                                       sortDirection={false}>نام</TableCell>
                                            <TableCell align="right" padding="normal" sortDirection={false}>زمان ایجاد</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {UncontractPlaces?.content && UncontractPlaces?.content.map((row, index) => (
                                            <TableRow hover
                                                      onClick={(event) => history.push({pathname: "/place/data/" + row.Id})}
                                                      role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row?.Name}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
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

                            {(UncontractPlaces?.totalElements > 0) && <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                sx={{direction: "rtl"}}
                                count={UncontractPlaces?.totalElements || 0}
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
            onClick={()=>{setShowModal(UncontractPlaces?.totalElements > 0)}}
            title="قرارداد"
            text={UncontractPlaces?.totalElements > 0 ? "شما " + UncontractPlaces?.totalElements + " مجموعه بدون قرارداد دارید" : "تمام مجموعه ها قرارداد دارند"}
            icon={<Message sx={{fontSize: 40, color: UncontractPlaces?.totalElements > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashUncontractPlaces;
