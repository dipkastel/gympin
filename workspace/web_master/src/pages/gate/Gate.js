import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import * as PropTypes from "prop-types";
import AdapterJalaali from '@date-io/jalaali';
import {TimePicker} from "@mui/x-date-pickers";
import {useParams} from "react-router-dom";
import {Gates_getById} from "../../network/api/gates.api";
import _BaseGateData from "./_BaseGateData";
import _GateSchedule from "./_GateSchedule";
import {scheduleBodyBuilding} from "../../helper/mockData/mockData";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";

TimePicker.propTypes = {
    renderInput: PropTypes.func,
    label: PropTypes.string
};
const Gate = () => {

    const {gateId} = useParams()
    const [gate, SetGate] = useState({})
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [fromTime, setFromTime] = useState(Date());
    const [toTime, setToTime] = useState(Date());
    const [data, setData] = React.useState(scheduleBodyBuilding);

    useEffect(() => {
        getGate()
    }, []);

    function getGate() {
        Gates_getById({id: gateId}).then(result => {
            SetGate(result.data.Data)
        }).catch(e => console.log(e));
    }

    const handleChange = (newValue, a) => {
        a(newValue);
    };

    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن زمان</Button>
        )
    }


    const handleClickOpen = () => {
        setOpenModalAdd(true);
    };

    const handleClose = () => {
        setOpenModalAdd(false);
    };

    if(!getAccessOf(personnelAccessEnumT.ManagementGates))
        return (<></>);

    function ModalAddPlan() {
        return (
            <div>
                <Dialog open={openModalAdd} onClose={handleClose}>
                    <DialogTitle>افزودن زمان جدید</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="مشخصه"
                                type="text"
                                fullWidth
                                variant="standard"
                                helperText="مشخصه : اسمی انتخابی که در ساخت پلن قیمت به یاداوری این زمان کمک میکند مثال:(صبح ها ، کلاس پیلاتس آقای X ، سانس بانوان صبح و...)"
                            />
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    value="top"
                                    control={<Checkbox/>}
                                    label="ش"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    value="top"
                                    control={<Checkbox/>}
                                    label="ی"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    value="top"
                                    control={<Checkbox/>}
                                    label="د"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    value="top"
                                    control={<Checkbox/>}
                                    label="س"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    value="top"
                                    control={<Checkbox/>}
                                    label="چ"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    value="top"
                                    control={<Checkbox/>}
                                    label="پ"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    value="top"
                                    control={<Checkbox/>}
                                    label="ج"
                                    labelPlacement="top"
                                />
                            </FormGroup>


                            <LocalizationProvider dateAdapter={AdapterJalaali}>
                                <TimePicker
                                    label="از ساعت"
                                    value={fromTime}
                                    onChange={e => handleChange(e, setFromTime)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="تا ساعت"
                                    value={toTime}
                                    onChange={e => handleChange(e, setToTime)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">جنسیت</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                >
                                    <MenuItem>خانم ها</MenuItem>
                                    <MenuItem>آقایان</MenuItem>
                                    <MenuItem>فرقی نمیکند (مختلط)</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={handleClose}>ثبت</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <_BaseGateData gate={gate} getGate={getGate}/>
            <_GateSchedule gate={gate}/>
        </>

    );
};

export default Gate;
