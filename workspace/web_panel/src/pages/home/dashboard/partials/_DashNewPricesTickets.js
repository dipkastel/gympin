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
import {getPlaceFixedName} from "../../../../helper";
import {getRppDashSupport} from "../../../../helper/pocket/pocket";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {PublishedWithChanges} from "@mui/icons-material";
import {place_getPlacesByTicketOutdated, place_getPlacesByTicketUpdatesDate} from "../../../../network/api/place.api";
import {Card, CardContent, CardHeader, Grid, Paper} from "@mui/material";

const _DashNewPricesTickets = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [newPlace, setNewPlace] = useState([])
    const [oldPlace, setOldPlace] = useState([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(showModal){
            getNewPlaces();
            getOldPlaces();
        }
    }, [showModal]);

    function getNewPlaces() {
        place_getPlacesByTicketUpdatesDate()
            .then((data) => {
                setNewPlace(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }
    function getOldPlaces() {
        place_getPlacesByTicketOutdated()
            .then((data) => {
                setOldPlace(data.data.Data);
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
                            title="قیمت ها"
                        />

                        <PortletBody>
                            <Grid container columns={2} spacing={1}>
                                <Grid size={1}>
                                    <Card variant={"elevation"} elevation={10} sx={{borderRadius:4}} >
                                        <CardHeader title={"قیمت های جدید"} />
                                        <CardContent>
                                            <TableContainer>
                                                <Table
                                                    sx={{minWidth: 750}}
                                                    aria-labelledby="tableTitle"
                                                    size="medium"
                                                >

                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="right" padding="normal" sortDirection={false}>مجموعه</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {newPlace && newPlace.map((row, index) => (
                                                            <TableRow hover
                                                                      onClick={(event) => history.push({pathname: "gyms/data/" + row.Id})}
                                                                      role="checkbox" tabIndex={-1} key={row?.Id?.toString()}>
                                                                <TableCell component="th" scope="row" padding="normal"
                                                                           align="right">{getPlaceFixedName(row)}</TableCell>

                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={1}>
                                    <Card variant={"elevation"} elevation={10} sx={{borderRadius:4}} >
                                        <CardHeader title={"قیمت های قدیمی"} />
                                        <CardContent>
                                            <TableContainer>
                                                <Table
                                                    sx={{minWidth: 750}}
                                                    aria-labelledby="tableTitle"
                                                    size="medium"
                                                >

                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="right" padding="normal" sortDirection={false}>مجموعه</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {oldPlace && oldPlace.map((row, index) => (
                                                            <TableRow hover
                                                                      onClick={(event) => history.push({pathname: "gyms/data/" + row.Id})}
                                                                      role="checkbox" tabIndex={-1} key={row?.Id?.toString()}>
                                                                <TableCell component="th" scope="row" padding="normal"
                                                                           align="right">{getPlaceFixedName(row)}</TableCell>

                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>


                        </PortletBody>
                    </Portlet>
                </Modal>
            </>
        )
    };

    return (<>
        <QuickStatsIcon
            onClick={() => {
                setShowModal(true)
            }}
            title="تغییر قیمت ها"
            text={"مدیریت بروز رسانی قیمت مجموعه ها"}
            icon={<PublishedWithChanges sx={{fontSize: 40, color:"#0c5049"}}
                                        color={"#AA5598"}/>}
        />
        {renderModalSupport()}
    </>)
}

export default _DashNewPricesTickets;
