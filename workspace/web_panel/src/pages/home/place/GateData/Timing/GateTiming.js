
import React, {useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Link, TableCell, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    gateTiming_addAll, gateTiming_delete,
    gateTiming_getByGate,
} from "../../../../../network/api/gateTiming.api";
import {dayOfWeekEnum} from "../../../../../helper/enums/dayOfWeekEnum";





const GateTiming = ({gate}) => {
    const [GateTiming, SetGateTiming] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [addValues,setAddValues] = useState([])
    useEffect(() => {
        getGateTimingOfGate();
    }, []);

    function getGateTimingOfGate() {
        gateTiming_getByGate({Id: gate.Id}).then(data => {
            console.log(data.data.Data);
            SetGateTiming(data.data.Data);
        }).catch(e => console.log(e))
    }
    function getDayOfWeek(en){
        return dayOfWeekEnum[en]
    }
    function renderModalAdd() {
        var addDays =[];
        function addItems(e) {
            e.preventDefault()
            var postData = [];
            Object.keys(addDays).map(key =>                {
                    if(addDays[key]){
                        postData.push({
                            "Name":addValues["Name"],
                            "Closing-time":new Date(addValues["Closing-time"]).toTimeString().substring(0,8),
                            "Opening-time":new Date(addValues["Opening-time"]).toTimeString().substring(0,8),
                            "Gate":{Id:gate.Id},
                            "Day-of-week":key
                        })
                    }
                }
            )
            console.log(JSON.stringify(postData))
            gateTiming_addAll(postData)
                .then(data => {
                    setOpenModalAdd(false)
                    getGateTimingOfGate()
                }).catch(e => console.log(e))
        }

        function setFormValues(lable,newValue){
            setAddValues({...addValues,[lable]:newValue})
        }
        function setFormDayValues(lable,newValue){
            addDays = {...addDays,[lable]:newValue}
        }


        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addItems(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن زمان بندی "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormControl fullWidth>
                                <TextField
                                    type="text"
                                    label="نام دلخواه"
                                    margin="normal"
                                    name={"Name"}
                                    fullWidth={true}
                                    onChange={(e)=>setFormValues("Name",e.target.value)}
                                />
                            </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        className={"ltr fullwidth mt-3"}
                                        label="از ساعت"
                                        value={addValues["Opening-time"]}
                                        ampm={false}
                                        onChange={(e)=>setFormValues("Opening-time",e)}
                                        // onChange={(e)=>setFormValues("Opening-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <TimePicker
                                        className={"ltr fullwidth mt-4"}
                                        label="تا ساعت"
                                        ampm={false}
                                        value={addValues["Closing-time"]}
                                        onChange={(e)=>setFormValues("Closing-time",e)}
                                        // onChange={(e)=>setFormValues("Closing-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                            <FormControl component="fieldset" className={"mt-3"}>
                                <FormGroup
                                    aria-label="position"
                                    name="position"
                                    onChange={(e)=>setFormDayValues(e.target.name,e.target.checked)}
                                    row>
                                    {Object.keys(dayOfWeekEnum).map(key =>
                                        <FormControlLabel
                                            key={key}
                                            className={"mr-1"}
                                            value="top"
                                            control={<Checkbox name={key} color="primary" />}
                                            label={dayOfWeekEnum[key]}
                                            labelPlacement={"top"}
                                        />
                                    )}
                                </FormGroup>
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
            gateTiming_delete({Id: itemToDelete.Id})
                .then(data => {
                    setItemToDelete(null)
                    getGateTimingOfGate()
                }).catch(e => console.log(e))
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف زمان بندی"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.Name}
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
                    title="زمان بندی ها"
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
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">از ساعت</TableCell>
                                <TableCell align="right">تا ساعت</TableCell>
                                <TableCell align="right">روز</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {GateTiming.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="right">{row["Opening-time"].substring(0,5)}</TableCell>
                                    <TableCell align="right">{row["Closing-time"].substring(0,5)}</TableCell>
                                    <TableCell align="right">{getDayOfWeek(row["Day-of-week"])}</TableCell>
                                    <TableCell align="left"><Button variant={"contained"} size={"small"}
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

export default GateTiming;
