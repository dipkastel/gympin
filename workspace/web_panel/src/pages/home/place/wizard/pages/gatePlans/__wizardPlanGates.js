import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Collapse,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    TableCell,
    TextField,
    Typography
} from "@mui/material";
import {CheckBox, CloseOutlined, ExpandLess, ExpandMore, QuestionMark} from "@mui/icons-material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {planGatesTiming_delete, planGatesTiming_getByPlan} from "../../../../../../network/api/PlanGatesTiming.api";
import {dayOfWeekEnum} from "../../../../../../helper/enums/dayOfWeekEnum";
import TableRow from "@mui/material/TableRow";
import {Form, Modal} from "react-bootstrap";
import {gateTiming_getByPlace} from "../../../../../../network/api/gateTiming.api";
import {gates_add, gates_getByPlaceId} from "../../../../../../network/api/gates.api";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import ___wizardFormAddTimingToGate from "./___wizardFormAddTimingToGate";
import ___wizardFormAddGate from "./___wizardFormAddGate";

const __wizardPlanGates = ({plan}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [planGatesTiming, SetPlanGatesTiming] = useState([])
    const [placeGateTimings, setPlaceGateTimings] = useState([]);
    const [placeGates, setPlaceGates] = useState([]);


    const [expandedItems, setExpandedItems] = useState({});
    const [openModalAddGates, setOpenModalAddGates] = useState(false)
    const [openCollapsableAddGate, setOpenCollapsableAddGate] = useState(false)
    const [openCollapsableAddTiming, setOpenCollapsableAddTiming] = useState(null)
    const [gatesComplete, setGatesComplete] = useState(false)
    const [openCollapsableGates, setOpenCollapsableGates] = useState(false)


    useEffect(() => {
        if (openCollapsableGates)
            getPlanGatesTimingOfplan();
    }, [openCollapsableGates]);

    useEffect(() => {
        if (openModalAddGates)
            getTimingByPlace();
    }, [openModalAddGates]);


    function getPlanGatesTimingOfplan() {
        planGatesTiming_getByPlan({Id: plan.Id}).then(data => {
            SetPlanGatesTiming(data.data.Data);
            setGatesComplete(data.data.Data.length > 0)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getGatesOfPlace() {
        gates_getByPlaceId({Id: placeId}).then(data => {
            setPlaceGates(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getTimingByPlace() {

        gateTiming_getByPlace({Id: plan.Place.Id}).then(data => {
            setPlaceGateTimings(data.data.Data);
            getGatesOfPlace();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAddGate() {
        function addGateTimingsToPlan(e) {
            e.preventDefault()
        }


        return (
            <>
                <Modal show={openModalAddGates} onHide={() => setOpenModalAddGates(false)}>


                    <Modal.Header closeButton>
                        <Modal.Title>{"انتخاب زمان بندی ها"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form onSubmit={(e) => addGateTimingsToPlan(e)}>


                            {placeGates.map((Gate) => (
                                    <div key={"Gate" + Gate.Id}>
                                        <Grid container alignItems={"center"} justifyContent={"space-between"}
                                              direction={"row"}>
                                            <Grid item>
                                                <FormControl component="fieldset" onClick={() => setExpandedItems({
                                                    ...expandedItems,
                                                    [Gate.Id]: !expandedItems[Gate.Id]
                                                })}>
                                                    <FormLabel
                                                        component="legend">{Gate.Name}</FormLabel>
                                                </FormControl>
                                            </Grid>
                                            <Grid item>

                                                <IconButton
                                                    onClick={() => setExpandedItems({
                                                        ...expandedItems,
                                                        [Gate.Id]: !expandedItems[Gate.Id]
                                                    })}>
                                                    {!expandedItems[Gate.Id] ? <ExpandLess/> : <ExpandMore/>}
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Collapse in={expandedItems[Gate.Id]} timeout="auto" unmountOnExit>
                                            {placeGateTimings.filter(timing => timing.Gate.Id == Gate.Id).map(item => (

                                                <FormGroup key={item.Id} aria-label="position" name="position"
                                                    // onChange={(e)=>handleChange(gateTiming.Id,e.target.checked)}
                                                           row>
                                                    <FormControlLabel
                                                        value="end"
                                                        sx={{marginY: 0}}
                                                        control={<Checkbox color="primary"/>}
                                                        label={GetFormatedGateTiming(item)}
                                                        labelPlacement="end"
                                                    />
                                                </FormGroup>
                                            ))}

                                            <Button
                                                variant={"contained"}
                                                color={"info"}
                                                sx={{mb: 2}}
                                                onClick={() => setOpenCollapsableAddTiming(Gate)}
                                            >
                                                افزودن زمانبندی جدید
                                            </Button>
                                        </Collapse>
                                    </div>
                                )
                            )}
                            <Divider variant="inset" sx={{mx: 0, mb: 2}} component="p"/>

                            <Collapse in={((!openCollapsableAddGate) && (openCollapsableAddTiming == null))}
                                      timeout="auto" unmountOnExit>
                                <Grid container alignItems={"center"} justifyContent={"space-between"}
                                      direction={"row"}>
                                    <Grid item>
                                        <Button
                                            variant={"contained"}
                                            color={"info"}
                                            onClick={() => setOpenCollapsableAddGate(!openCollapsableAddGate)}
                                        >
                                            افزودن درگاه جدید
                                        </Button>
                                    </Grid>
                                    <Grid item>

                                        <Button
                                            variant={"contained"}
                                            color={"error"}
                                            onClick={() => setOpenModalAddGates(false)}
                                        >
                                            لغو
                                        </Button>
                                        <Button
                                            variant={"contained"}
                                            color={"success"}
                                            type={"submit"}
                                        >
                                            اضافه
                                        </Button>
                                    </Grid>


                                </Grid>
                            </Collapse>


                        </form>
                        <Collapse in={openCollapsableAddGate} timeout="auto" unmountOnExit>

                            <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                                <Grid item>
                                    <Typography variant={"subtitle1"}>افزودن درگاه جدید</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => setOpenCollapsableAddGate(!openCollapsableAddGate)}>
                                        <CloseOutlined/>
                                    </IconButton>
                                </Grid>


                            </Grid>
                            <___wizardFormAddGate getTimingByPlace={getTimingByPlace} setOpenCollapsableAddGate={setOpenCollapsableAddGate} />
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
                            <___wizardFormAddTimingToGate  />


                        </Collapse>
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    function GetFormatedGateTiming(gateTiming) {
        return gateTiming.Gate.Name + " - " +
            gateTiming.Name + " - " +
            dayOfWeekEnum[gateTiming["Day-of-week"]] + " از " +
            gateTiming["Opening-time"].substring(0, 5) + " تا " +
            gateTiming["Closing-time"].substring(0, 5) + " ";
    }

    function deleteGateTime(e, gateTime) {
        e.preventDefault();
        planGatesTiming_delete({Id: gateTime.Id})
            .then(data => {
                getPlanGatesTimingOfplan()
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
            <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                <Grid item onClick={() => setOpenCollapsableGates(!openCollapsableGates)}>
                    <Typography variant={"subtitle1"}>درگاه ها و زمانبندی ها</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => setOpenCollapsableGates(!openCollapsableGates)}>
                        {!gatesComplete ? <QuestionMark color={"warning"}/> : <CheckBox color="success"/>}
                    </IconButton>
                    <IconButton
                        onClick={() => setOpenCollapsableGates(!openCollapsableGates)}>
                        {!openCollapsableGates ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Grid>
            </Grid>

            <Collapse in={openCollapsableGates} timeout="auto" unmountOnExit>

                {planGatesTiming.map(row => (
                    <TableRow key={row.Id}>
                        <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                        <TableCell align="right">{GetFormatedGateTiming(row["gate-timing"])}</TableCell>
                        <TableCell align="left">
                            <Button variant={"contained"}
                                    size={"small"}
                                    color={"error"}
                                    onClick={(e) => deleteGateTime(e, row)}
                            >حذف</Button>
                        </TableCell>
                    </TableRow>
                ))}


                <Button
                    variant={"contained"}
                    fullWidth
                    onClick={() => setOpenModalAddGates(true)}
                >
                    اضافه
                </Button>

            </Collapse>
            {openModalAddGates && renderModalAddGate()}
        </>
    );
};

export default __wizardPlanGates;
