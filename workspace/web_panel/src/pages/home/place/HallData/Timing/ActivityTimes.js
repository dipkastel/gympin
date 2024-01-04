
import React, {useContext, useEffect, useState} from 'react';
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
    ticketSubscribeActiveTimes_addAll, ticketSubscribeActiveTimes_delete,
    ticketSubscribeActiveTimes_getByHall,
} from "../../../../../network/api/ticketSubscribeActiveTimes.api";
import {dayOfWeekEnum} from "../../../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";





const ActivityTimes = ({hall}) => {
    const error = useContext(ErrorContext);
    const [ActivityTimes, SetActivityTimes] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [addValues,setAddValues] = useState([])
    useEffect(() => {
        getActivityTimesOfHall();
    }, []);

    function getActivityTimesOfHall() {
        ticketSubscribeActiveTimes_getByHall({Id: hall.Id}).then(data => {
            SetActivityTimes(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    function getDayOfWeek(en){
        return dayOfWeekEnum[en]
    }
    function renderModalAdd() {
        var addDays =[];

        function addItems(e) {
            e.preventDefault()
            if(!(addValues["OpeningTime"])){
                error.showError({message: "زمان شروع فعالیت اجباری است",});
                return;
            }
            if(!(addValues["ClosingTime"])){
                error.showError({message: "زمان پایان فعالیت اجباری است",});
                return;
            }

            if(addDays.length<1){
                error.showError({message: "حد اقل یکی از روزهای هفته باید انتخاب شود",});
                return;
            }

            setOpenModalAdd(false);
            var postData = [];
            Object.keys(addDays).map(key =>                {
                    if(addDays[key]){
                        postData.push({
                            "ClosingTime":new Date(addValues["ClosingTime"]).toTimeString().substring(0,8),
                            "OpeningTime":new Date(addValues["OpeningTime"]).toTimeString().substring(0,8),
                            "Hall":{Id:hall.Id},
                            "DayOfWeek":key
                        })
                    }
                }
            )
            ticketSubscribeActiveTimes_addAll(postData)
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    getActivityTimesOfHall()
                    setAddValues([]);
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        className={"ltr fullwidth mt-3"}
                                        label="از ساعت"
                                        value={addValues["OpeningTime"]||""}
                                        ampm={false}
                                        onChange={(e)=>setFormValues("OpeningTime",e)}
                                        // onChange={(e)=>setFormValues("Opening-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <TimePicker
                                        className={"ltr fullwidth mt-4"}
                                        label="تا ساعت"
                                        ampm={false}
                                        value={addValues["ClosingTime"]||""}
                                        onChange={(e)=>setFormValues("ClosingTime",e)}
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
            ticketSubscribeActiveTimes_delete({Id: itemToDelete.Id})
                .then(data => {
                    setItemToDelete(null)
                    getActivityTimesOfHall()
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
                            {ActivityTimes.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="right">{row["OpeningTime"].substring(0,5)}</TableCell>
                                    <TableCell align="right">{row["ClosingTime"].substring(0,5)}</TableCell>
                                    <TableCell align="right">{getDayOfWeek(row["DayOfWeek"])}</TableCell>
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
            {openModalAdd&&renderModalAdd()}
            {itemToDelete&&renderModalDelete()}
        </>
    );
};

export default ActivityTimes;
