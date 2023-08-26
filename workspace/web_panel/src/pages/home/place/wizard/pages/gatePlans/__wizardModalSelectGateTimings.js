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
import ___wizardFormAddGate from "./___wizardFormAddGate";
import ___wizardFormAddTimingToGate from "./___wizardFormAddTimingToGate";
import {gates_delete, gates_getByPlaceId} from "../../../../../../network/api/gates.api";
import {gateTiming_getByPlace} from "../../../../../../network/api/gateTiming.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {dayOfWeekEnum} from "../../../../../../helper/enums/dayOfWeekEnum";
import DeleteIcon from "@mui/icons-material/Delete";
import {planGatesTiming_addAll} from "../../../../../../network/api/PlanGatesTiming.api";

const __wizardModalSelectGateTimings = ({plan,openModalAddGates,setOpenModalAddGates,getPlanGatesTimingOfplan}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [expandedItems, setExpandedItems] = useState({});
    const [openCollapsableAddGate, setOpenCollapsableAddGate] = useState(false)
    const [openCollapsableAddTiming, setOpenCollapsableAddTiming] = useState(null)
    const [placeGates, setPlaceGates] = useState([]);
    const [placeGateTimings, setPlaceGateTimings] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);

    useEffect(() => {
        if (openModalAddGates)
            getTimingByPlace();
    }, [openModalAddGates]);

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


    function GetFormatedGateTiming(gateTiming) {
        return gateTiming.Name + " - " +" از "+
            gateTiming["Opening-time"].substring(0, 5) + " تا " +
            gateTiming["Closing-time"].substring(0, 5) + " "+
        dayOfWeekEnum[gateTiming["Day-of-week"]]  ;
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

    function addGateTimingsToPlan(e) {
        e.preventDefault()
        var postData = [];
        Object.keys(selectedTimes).map(item=>{
            if(selectedTimes[item])
                postData.push({plan: {Id: plan.Id}, gateTiming: {Id:item}})
        });
        setOpenModalAddGates(false)
        planGatesTiming_addAll(postData)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getPlanGatesTimingOfplan();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function deleteGate(e, Gate) {
        e.preventDefault();
        gates_delete({Id: Gate.Id})
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
            <Modal show={openModalAddGates} onHide={() => setOpenModalAddGates(false)}>


                <Modal.Header closeButton>
                    <Modal.Title>{"انتخاب زمان بندی ها("+Object.keys(selectedTimes).filter(f=>selectedTimes[f]).length+")"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

                                            <IconButton aria-label="delete"
                                                        color={"error"}
                                                        onClick={(e) => deleteGate(e,Gate)}>
                                                <DeleteIcon fontSize={"small"}/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Collapse in={expandedItems[Gate.Id]} timeout="auto" unmountOnExit>
                                        {placeGateTimings.filter(timing => timing.Gate.Id == Gate.Id).map(item => (

                                            <FormGroup key={item.Id} aria-label="position" name="position"
                                                onChange={(e)=>setSelectedTimes({...selectedTimes,[item.Id]:e.target.checked})}
                                                       row>
                                                <FormControlLabel
                                                    value="end"
                                                    sx={{marginY: 0}}
                                                    control={<Checkbox checked={selectedTimes[item.Id]} color="primary"/>}
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
                                        onClick={(e)=>addGateTimingsToPlan(e)}
                                        disabled={Object.keys(selectedTimes).filter(f=>selectedTimes[f]).length<1}
                                    >
                                        اضافه
                                    </Button>
                                </Grid>


                            </Grid>
                        </Collapse>
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
                        <___wizardFormAddTimingToGate gate={openCollapsableAddTiming} getTimingByPlace={getTimingByPlace} setOpenCollapsableAddTiming={setOpenCollapsableAddTiming}  />


                    </Collapse>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default __wizardModalSelectGateTimings;
