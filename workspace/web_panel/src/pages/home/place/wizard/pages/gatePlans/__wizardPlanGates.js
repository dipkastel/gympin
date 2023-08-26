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
import __wizardModalSelectGateTimings from "./__wizardModalSelectGateTimings";

const __wizardPlanGates = ({plan,setCanGoNext}) => {

    const error = useContext(ErrorContext);

    const [planGatesTiming, SetPlanGatesTiming] = useState([])

    const [openModalAddGates, setOpenModalAddGates] = useState(false)
    const [gatesComplete, setGatesComplete] = useState(false)
    const [openCollapsableGates, setOpenCollapsableGates] = useState(false)


    useEffect(() => {
        if (openCollapsableGates)
            getPlanGatesTimingOfplan();
    }, [openCollapsableGates]);






    function getPlanGatesTimingOfplan() {
        planGatesTiming_getByPlan({Id: plan.Id}).then(data => {
            SetPlanGatesTiming(data.data.Data);
            setGatesComplete(data.data.Data.length > 0)
            setCanGoNext(data.data.Data.length > 0)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
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



    function GetFormatedGateTiming(gateTiming) {
        return gateTiming.Gate.Name + " - " +
            gateTiming.Name + " - " +
            dayOfWeekEnum[gateTiming["Day-of-week"]] + " از " +
            gateTiming["Opening-time"].substring(0, 5) + " تا " +
            gateTiming["Closing-time"].substring(0, 5) + " ";
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
            {openModalAddGates && <__wizardModalSelectGateTimings plan={plan} openModalAddGates={openModalAddGates} setOpenModalAddGates={setOpenModalAddGates} getPlanGatesTimingOfplan={getPlanGatesTimingOfplan}/>}
        </>
    );
};

export default __wizardPlanGates;
