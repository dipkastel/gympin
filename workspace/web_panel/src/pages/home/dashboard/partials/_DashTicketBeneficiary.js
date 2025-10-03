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
import {getRppDashSupport} from "../../../../helper/pocket/pocket";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {ConfirmationNumber} from "@mui/icons-material";
import {buyable_getWanderers} from "../../../../network/api/buyable.api";

const _DashTicketBeneficiary = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [ticket, setTicket] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppDashSupport());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        buyable_getWanderers()
            .then((data) => {
                setTicket(data.data.Data);
            })
            .catch(e => {
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
                                            <TableCell align="right" padding="normal" sortDirection={false}>مجموعه</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ticket && ticket.map((row, index) => (
                                            <TableRow hover
                                                      onClick={(event) => history.push({pathname: "/Place/data/" + row?.Place?.Id})}
                                                      role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row?.Name}</TableCell>
                                                <TableCell component="th" scope="row" padding="normal"
                                                           align="right">{row?.Place.Name}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </PortletBody>
                    </Portlet>
                </Modal>
            </>
        )
    };

    return (<>
        <QuickStatsIcon
            onClick={()=>{setShowModal(ticket.length > 0)}}
            title="بلیط معلق"
            text={ticket.length > 0 ? "شما " + ticket.length + " بلیط بی صاحب دارید" : "ذینفع برای تمامی بلیط ها مشخص شده"}
            icon={<ConfirmationNumber sx={{fontSize: 40, color: ticket.length > 0 ? "#d00d48" : "#0c5049"}}
                           color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashTicketBeneficiary;
