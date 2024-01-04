import React, {useContext, useEffect, useState} from 'react';
import {Button, Collapse, Grid, IconButton, Table, TableCell, Typography} from "@mui/material";
import {CheckBox, ExpandLess, ExpandMore, QuestionMark} from "@mui/icons-material";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {dayOfWeekEnum} from "../../../../../../../helper/enums/dayOfWeekEnum";
import TableRow from "@mui/material/TableRow";
import __wizardModalSelectHallActiveTimes from "./__wizardModalSelectHallActiveTimes";
import {
    TicketSubscribes_deleteSubscribeActiveTimes,
    TicketSubscribes_getActiveTimesByTicketSubscribe
} from "../../../../../../../network/api/ticketSubscribes.api";

const __wizardTicketSubscribesHalls = ({ticketSubscribe,setCanGoNext}) => {

    const error = useContext(ErrorContext);

    const [ticketSubscribeHallsActiveTimes, SetTicketSubscribeHallsActiveTimes] = useState([])

    const [openModalAddHalls, setOpenModalAddHalls] = useState(false)
    const [hallsComplete, setHallsComplete] = useState(false)
    const [openCollapsableHall, setOpenCollapsableHall] = useState(false)


    useEffect(() => {
        if (openCollapsableHall)
            getActiveTimesOfTicketSubscribe();
    }, [openCollapsableHall]);

    function getActiveTimesOfTicketSubscribe() {
        TicketSubscribes_getActiveTimesByTicketSubscribe({ticketSubscribeId: ticketSubscribe.Id}).then(data => {
            SetTicketSubscribeHallsActiveTimes(data.data.Data);
            setHallsComplete(data.data.Data.length > 0)
            setCanGoNext(data.data.Data.length > 0)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function deleteTicketSubsctibeActiveTime(e, activeTime) {
        e.preventDefault();
        TicketSubscribes_deleteSubscribeActiveTimes({TicketSubscribe:{Id:ticketSubscribe.Id},ActiveTime:[{Id:activeTime.Id}]})
            .then(data => {
                getActiveTimesOfTicketSubscribe()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }



    function GetFormatedHallActiveTimes(hallActiveTime) {
        return hallActiveTime.Hall.Name + " - " +
            dayOfWeekEnum[hallActiveTime["DayOfWeek"]] + " از " +
            hallActiveTime["OpeningTime"].substring(0, 5) + " تا " +
            hallActiveTime["ClosingTime"].substring(0, 5) + " ";
    }
    return (
        <>
            <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                <Grid item onClick={() => setOpenCollapsableHall(!openCollapsableHall)}>
                    <Typography variant={"subtitle1"}>سالن ها و زمانبندی ها</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => setOpenCollapsableHall(!openCollapsableHall)}>
                        {!hallsComplete ? <QuestionMark color={"warning"}/> : <CheckBox color="success"/>}
                    </IconButton>
                    <IconButton
                        onClick={() => setOpenCollapsableHall(!openCollapsableHall)}>
                        {!openCollapsableHall ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Grid>
            </Grid>

            <Collapse in={openCollapsableHall} timeout="auto" unmountOnExit>
                <Table>
                {ticketSubscribeHallsActiveTimes.map(row => (
                    <TableRow key={row.Id} >
                        <TableCell sx={{m:0,p:0}} align="right">{GetFormatedHallActiveTimes(row)}</TableCell>
                        <TableCell  sx={{m:0,p:0}} align="left">
                            <Button variant={"contained"}
                                    size={"small"}
                                    color={"error"}
                                    onClick={(e) => deleteTicketSubsctibeActiveTime(e, row)}
                            >حذف</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </Table>


                <Button
                    variant={"contained"}
                    fullWidth
                    onClick={() => setOpenModalAddHalls(true)}
                >
                    اضافه
                </Button>

            </Collapse>
            {openModalAddHalls && <__wizardModalSelectHallActiveTimes ticketSubscribe={ticketSubscribe} openModalAddHall={openModalAddHalls} setOpenModalAddHall={setOpenModalAddHalls} getActiveTimesOfTicketSubscribe={getActiveTimesOfTicketSubscribe}/>}
        </>
    );
};

export default __wizardTicketSubscribesHalls;
