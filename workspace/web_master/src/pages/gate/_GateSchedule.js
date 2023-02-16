import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormControlLabel, FormGroup,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TimePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {dayOfWeekEnum} from "../../helper/enums/dayOfWeekEnum";
import {GatesTiming_addAll, GatesTiming_delete, GatesTiming_getByGate} from "../../network/api/gatesTiming.api";
import {ErrorContext} from "../../components/GympinPagesProvider";


const _GateSchedule = ({gate}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [gateTimigs, setGateTimings] = useState([]);
    const [addValues,setAddValues] = useState([])


    useEffect(() => {
        getGateTimingOfGate();
    }, [gate]);

    function getGateTimingOfGate() {
        GatesTiming_getByGate({Id: gate.Id}).then(data => {
            setGateTimings(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function ModalDelete() {
        function deleteSelectedItem(e) {
            e.preventDefault()
            GatesTiming_delete({id:deleteItem.Id}).then(result=>{
                setDeleteItem(null);
                getGateTimingOfGate()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
        }

        return (deleteItem)?(
            <div>
                <Dialog open={!!deleteItem} onClose={() => setDeleteItem(null)}>
                    <DialogTitle>حذف زمان</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            آیا حذف زمان {deleteItem.Name +" ("+dayOfWeekEnum[deleteItem["Day-of-week"]]+") " + "از " +
                        deleteItem["Opening-time"].substring(0,5)
                        + " تا " +
                        deleteItem["Closing-time"].substring(0,5)} را تایید میکنید؟
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteItem(null)}>لغو</Button>
                        <Button onClick={(e) => deleteSelectedItem(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        ):(<></>)
    }

    function ModalAdd() {

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
            GatesTiming_addAll(postData)
                .then(data => {
                    setOpenModalAdd(false)
                    getGateTimingOfGate()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        function setFormValues(lable,newValue){
            setAddValues({...addValues,[lable]:newValue})
        }
        function setFormDayValues(lable,newValue){
            addDays = {...addDays,[lable]:newValue}
        }


        return (openModalAdd)?(
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addItems(e)}>
                    <DialogTitle>افزودن زمان فعالیت گیت</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

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
                                    className={"ltr datePicker mt-3"}
                                    label="از ساعت"
                                    value={addValues["Opening-time"]}
                                    ampm={false}
                                    onChange={(e)=>setFormValues("Opening-time",e)}
                                    // onChange={(e)=>setFormValues("Opening-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    className={"ltr datePicker mt-4"}
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
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button type={"submit"}>تایید</Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </div>
        ):(<></>)
    }


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"زمان بندی ها"}
                    action={<Button variant={"outlined"} onClick={(e) => {setOpenModalAdd(true)}}>افزودن زمان بندی</Button>}
                />
                <CardContent sx={{margin: 0}}>
                    <List dense={false}>
                        {gateTimigs&&gateTimigs.map((p, number) =>
                            <ListItem sx={{direction: "rtl"}} key={number}>
                                <ListItemText
                                    className="text-start"
                                    primary={p.Name + " ( " + dayOfWeekEnum[p["Day-of-week"]] + " ) "}
                                    secondary={"از " +
                                    p["Opening-time"].substring(0,5)
                                    + " تا " +
                                    p["Closing-time"].substring(0,5)
                                    }
                                />
                                <ListItemIcon
                                    className="text-end"
                                >
                                    <DeleteIcon onClick={(e) => setDeleteItem(p)} color={"primary"}/>
                                </ListItemIcon>
                            </ListItem>,
                        )}
                    </List>
                </CardContent>
            </Card>
            {ModalDelete()}
            {ModalAdd()}
        </>
    );
};

export default _GateSchedule;
