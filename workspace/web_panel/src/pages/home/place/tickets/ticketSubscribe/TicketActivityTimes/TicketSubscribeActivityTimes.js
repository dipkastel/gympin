import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ticketActiveTimes_getByPlace} from "../../../../../../network/api/ticketActiveTimes.api";
import {dayOfWeekEnum} from "../../../../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {
    TicketSubscribes_addSubscribeActiveTimes,
    TicketSubscribes_deleteSubscribeActiveTimes,
    TicketSubscribes_getActiveTimesByTicketSubscribe
} from "../../../../../../network/api/ticketSubscribes.api";

const TicketSubscribeActivityTimes = ({ticketSubscribe}) => {
    const error = useContext(ErrorContext);
    const [ticketSubscribesHallActiveTimes, SetTicketSubscribesHallActiveTimes] = useState([])
    const [ticketSubscribesActiveTimes, SetTicketSubscribesActiveTimes] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    useEffect(() => {
        getActiveTimesByTicketSubscribe();
        getTicketSubscribeActiveTimes();
    }, []);

    function getActiveTimesByTicketSubscribe() {
        TicketSubscribes_getActiveTimesByTicketSubscribe({ticketSubscribeId: ticketSubscribe.Id}).then(data => {
            SetTicketSubscribesHallActiveTimes(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    function getTicketSubscribeActiveTimes() {
        ticketActiveTimes_getByPlace({Id: ticketSubscribe.Place.Id}).then(data => {
            SetTicketSubscribesActiveTimes(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function GetFormatedActivityTimes(activityTimes) {
        return activityTimes.Name+" - "+
            dayOfWeekEnum[activityTimes["DayOfWeek"]]+" از "+
            activityTimes["OpeningTime"].substring(0,5)+" تا "+
            activityTimes["ClosingTime"].substring(0,5)+" ";
    }

    function renderModalAdd() {
        var activityTimesToAdd = [];
        function addHallActivityTimes(e) {
            e.preventDefault()
            var postData = {Ticket: {Id: ticketSubscribe.Id}};
            var ActiveTimes = [];
            Object.keys(activityTimesToAdd).map(item=>{
                if(activityTimesToAdd[item])
                    ActiveTimes.push({Id:activityTimesToAdd[item]})
            });
            postData.ActiveTime = ActiveTimes;
            setOpenModalAdd(false)
            TicketSubscribes_addSubscribeActiveTimes(postData)
                .then(data => {
                    getActiveTimesByTicketSubscribe()
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        function handleChange(activityTimeId,status) {
            if(status)
                activityTimesToAdd.push(activityTimeId)
            else
                activityTimesToAdd = activityTimesToAdd.filter(item => item !== activityTimeId)
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addHallActivityTimes(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن سالن "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormControl component="fieldset">
                                <FormLabel component="legend">سالن های قابل استفاده</FormLabel>
                                {ticketSubscribesActiveTimes.map(activityTime=>{

                                    return (
                                            <FormGroup key={activityTime.Id} aria-label="position" name="position"
                                                 onChange={(e)=>handleChange(activityTime.Id,e.target.checked)}
                                                       row>
                                                <FormControlLabel
                                                    value="end"
                                                    sx={{marginY:0}}
                                                    control={<Checkbox color="primary" />}
                                                    label={GetFormatedActivityTimes(activityTime)}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                        )

                                })}
                            </FormControl>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            TicketSubscribes_deleteSubscribeActiveTimes({Ticket:{Id:ticketSubscribe.Id},ActiveTime:[{Id: itemToDelete.Id}]})
                .then(data => {
                    setItemToDelete(null)
                    getActiveTimesByTicketSubscribe()
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف امکانات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + GetFormatedActivityTimes(itemToDelete)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                حذف
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"سالن های "+ticketSubscribe.Name}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">name</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketSubscribesHallActiveTimes.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{GetFormatedActivityTimes(row)}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"}
                                                size={"small"}
                                                color={"error"}
                                                onClick={(e) => setItemToDelete(row)}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalDelete()}
        </>
    );
};

export default TicketSubscribeActivityTimes;



