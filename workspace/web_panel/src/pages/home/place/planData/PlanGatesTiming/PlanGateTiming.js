import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
    planGatesTiming_addAll,
    planGatesTiming_delete,
    planGatesTiming_getByPlan
} from "../../../../../network/api/PlanGatesTiming.api";
import {gateTiming_getByPlace} from "../../../../../network/api/gateTiming.api";
import {dayOfWeekEnum} from "../../../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const PlanGatesTiming = ({plan}) => {
    const error = useContext(ErrorContext);
    const [planGatesTiming, SetplanGatesTiming] = useState([])
    const [GateTimings, SetGateTimings] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    useEffect(() => {
        getPlanGatesTimingOfplan();
        getGateTimings();
    }, []);

    function getPlanGatesTimingOfplan() {
        planGatesTiming_getByPlan({Id: plan.Id}).then(data => {
            SetplanGatesTiming(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    function getGateTimings() {
        gateTiming_getByPlace({Id: plan.Place.Id}).then(data => {
            SetGateTimings(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function GetFormatedGateTiming(gateTiming) {
        return gateTiming.Gate.Name+" - "+
            gateTiming.Name+" - "+
            dayOfWeekEnum[gateTiming["Day-of-week"]]+" از "+
            gateTiming["Opening-time"].substring(0,5)+" تا "+
            gateTiming["Closing-time"].substring(0,5)+" ";
    }

    function renderModalAdd() {
        var gateTimingsToAdd = [];
        function addPlaceGateTiming(e) {
            e.preventDefault()
            var postData = [];
            for(var index in gateTimingsToAdd){
                postData.push({plan: {Id: plan.Id}, gateTiming: {Id:gateTimingsToAdd[index]}})
            }
            planGatesTiming_addAll(postData)
                .then(data => {
                    setOpenModalAdd(false)
                    getPlanGatesTimingOfplan()
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        function handleChange(GateTimingId,status) {
            if(status)
                gateTimingsToAdd.push(GateTimingId)
            else
                gateTimingsToAdd = gateTimingsToAdd.filter(item => item !== GateTimingId)
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addPlaceGateTiming(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن درگاه "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormControl component="fieldset">
                                <FormLabel component="legend">درگاه های قابل استفاده</FormLabel>
                                {GateTimings.map(gateTiming=>{

                                    return (
                                            <FormGroup key={gateTiming.Id} aria-label="position" name="position"
                                                 onChange={(e)=>handleChange(gateTiming.Id,e.target.checked)}
                                                       row>
                                                <FormControlLabel
                                                    value="end"
                                                    sx={{marginY:0}}
                                                    control={<Checkbox color="primary" />}
                                                    label={GetFormatedGateTiming(gateTiming)}
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
            planGatesTiming_delete({Id: itemToDelete.Id})
                .then(data => {
                    setItemToDelete(null)
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
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف امکانات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + GetFormatedGateTiming(itemToDelete["gate-timing"])}
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
                    title={"درگاه های "+plan.Name}
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
                            {planGatesTiming.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{GetFormatedGateTiming(row["gate-timing"])}</TableCell>
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

export default PlanGatesTiming;



