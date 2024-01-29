import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {
    Button,
    Checkbox,
    Collapse, Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton, Typography
} from "@mui/material";
import {CloseOutlined, ExpandLess, ExpandMore} from "@mui/icons-material";
import ___wizardFormAddHall from "./___wizardFormAddHall";
import ___wizardFormAddActiveTimesToHall from "./___wizardFormAddActiveTimesToHall";
import {halls_delete, halls_getByPlaceId} from "../../../../../../../network/api/hall.api";
import {ticketActiveTimes_getByPlace} from "../../../../../../../network/api/ticketActiveTimes.api";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {dayOfWeekEnum} from "../../../../../../../helper/enums/dayOfWeekEnum";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    TicketSubscribes_addSubscribeActiveTimes
} from "../../../../../../../network/api/ticketSubscribes.api";

const __wizardModalSelectHallActiveTimes = ({ticketSubscribe,openModalAddHall,setOpenModalAddHall, getActiveTimesOfTicketSubscribe}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [expandedItems, setExpandedItems] = useState({});
    const [openCollapsableAddHall, setOpenCollapsableAddHall] = useState(false)
    const [openCollapsableAddTiming, setOpenCollapsableAddTiming] = useState(null)
    const [placeHalls, setPlaceHalls] = useState([]);
    const [placeHallActiveTimes, setPlaceHallActiveTimes] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);

    useEffect(() => {
        if (openModalAddHall)
            getTimingByPlace();
    }, [openModalAddHall]);

    function getHallsOfPlace() {
        halls_getByPlaceId({Id: placeId}).then(data => {
            setPlaceHalls(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function GetFormatedActivityTime(activityTime) {
        return  activityTime["OpeningTime"].substring(0, 5) + " تا " + activityTime["ClosingTime"].substring(0, 5) + " "+ dayOfWeekEnum[activityTime["DayOfWeek"]]  ;
    }

    function getTimingByPlace() {

        ticketActiveTimes_getByPlace({Id: ticketSubscribe.Place.Id}).then(data => {
            setPlaceHallActiveTimes(data.data.Data);
            getHallsOfPlace();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addActiveTimesToTicketSubscribe(e) {
        e.preventDefault()
        var postData = {Ticket: {Id: ticketSubscribe.Id}}
        var ActiveTimes = [];
        Object.keys(selectedTimes).map(item=>{
            if(selectedTimes[item])
                ActiveTimes.push({Id:item})
        });
        postData.ActiveTime = ActiveTimes;
        setOpenModalAddHall(false)

        TicketSubscribes_addSubscribeActiveTimes(postData)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getActiveTimesOfTicketSubscribe();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function deleteHall(e, hall) {
        e.preventDefault();
        halls_delete({Id: hall.Id})
            .then(data => {
                getTimingByPlace()
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
            <Modal show={openModalAddHall} onHide={() => setOpenModalAddHall(false)}>


                <Modal.Header closeButton>
                    <Modal.Title>{"انتخاب زمان بندی ها("+Object.keys(selectedTimes).filter(f=>selectedTimes[f]).length+")"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {placeHalls.map((Hall) => (
                                <div key={"Hall" + Hall.Id}>
                                    <Grid container alignItems={"center"} justifyContent={"space-between"}
                                          direction={"row"}>
                                        <Grid item>
                                            <FormControl component="fieldset" onClick={() => setExpandedItems({
                                                ...expandedItems,
                                                [Hall.Id]: !expandedItems[Hall.Id]
                                            })}>
                                                <FormLabel
                                                    component="legend">{Hall.Name}</FormLabel>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>

                                            <IconButton
                                                onClick={() => setExpandedItems({
                                                    ...expandedItems,
                                                    [Hall.Id]: !expandedItems[Hall.Id]
                                                })}>
                                                {!expandedItems[Hall.Id] ? <ExpandLess/> : <ExpandMore/>}
                                            </IconButton>

                                            <IconButton aria-label="delete"
                                                        color={"error"}
                                                        onClick={(e) => deleteHall(e,Hall)}>
                                                <DeleteIcon fontSize={"small"}/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Collapse in={expandedItems[Hall.Id]} timeout="auto" unmountOnExit>
                                        {placeHallActiveTimes.filter(timing => timing.Hall.Id == Hall.Id).map(item => (

                                            <FormGroup key={item.Id} aria-label="position" name="position"
                                                onChange={(e)=>setSelectedTimes({...selectedTimes,[item.Id]:e.target.checked})}
                                                       row>
                                                <FormControlLabel
                                                    value="end"
                                                    sx={{marginY: 0}}
                                                    control={<Checkbox checked={selectedTimes[item.Id]} color="primary"/>}
                                                    label={GetFormatedActivityTime(item)}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                        ))}

                                        <Button
                                            variant={"contained"}
                                            color={"info"}
                                            sx={{mb: 2}}
                                            onClick={() => setOpenCollapsableAddTiming(Hall)}
                                        >
                                            افزودن زمانبندی جدید
                                        </Button>
                                    </Collapse>
                                </div>
                            )
                        )}
                        <Divider variant="inset" sx={{mx: 0, mb: 2}} component="p"/>

                        <Collapse in={((!openCollapsableAddHall) && (openCollapsableAddTiming == null))}
                                  timeout="auto" unmountOnExit>
                            <Grid container alignItems={"center"} justifyContent={"space-between"}
                                  direction={"row"}>
                                <Grid item>
                                    <Button
                                        variant={"contained"}
                                        color={"info"}
                                        onClick={() => setOpenCollapsableAddHall(!openCollapsableAddHall)}
                                    >
                                        افزودن سالن جدید
                                    </Button>
                                </Grid>
                                <Grid item>

                                    <Button
                                        variant={"contained"}
                                        color={"error"}
                                        onClick={() => setOpenModalAddHall(false)}
                                    >
                                        لغو
                                    </Button>
                                    <Button
                                        variant={"contained"}
                                        color={"success"}
                                        onClick={(e)=>addActiveTimesToTicketSubscribe(e)}
                                        disabled={Object.keys(selectedTimes).filter(f=>selectedTimes[f]).length<1}
                                    >
                                        اضافه
                                    </Button>
                                </Grid>


                            </Grid>
                        </Collapse>
                    <Collapse in={openCollapsableAddHall} timeout="auto" unmountOnExit>

                        <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                            <Grid item>
                                <Typography variant={"subtitle1"}>افزودن سالن جدید</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => setOpenCollapsableAddHall(!openCollapsableAddHall)}>
                                    <CloseOutlined/>
                                </IconButton>
                            </Grid>


                        </Grid>
                        <___wizardFormAddHall getTimesByPlace={getTimingByPlace} setOpenCollapsableAddHall={setOpenCollapsableAddHall} />
                    </Collapse>
                    <Collapse in={openCollapsableAddTiming != null} timeout="auto" unmountOnExit>

                        <Grid container alignItems={"center"} justifyContent={"space-between"}
                              direction={"row"}>
                            <Grid item>
                                <Typography
                                    variant={"subtitle1"}>{"افزودن زمان بندی به " + openCollapsableAddTiming?.Name}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => setOpenCollapsableAddTiming(null)}>
                                    <CloseOutlined/>
                                </IconButton>
                            </Grid>


                        </Grid>
                        <___wizardFormAddActiveTimesToHall hall={openCollapsableAddTiming} getTimingByPlace={getTimingByPlace} setOpenCollapsableAddTiming={setOpenCollapsableAddTiming}  />


                    </Collapse>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default __wizardModalSelectHallActiveTimes;
