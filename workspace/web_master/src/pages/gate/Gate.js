import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import _GateSchedule from "./_GateSchedule";
import * as PropTypes from "prop-types";
import AdapterJalaali from '@date-io/jalaali';
import {TimePicker} from "@mui/x-date-pickers";
import {scheduleBodyBuilding} from "../../helper/mockData/mockData";

TimePicker.propTypes = {
    renderInput: PropTypes.func,
    label: PropTypes.string
};
const Gate = () => {
    const [open, setOpen] = React.useState(false);
    const [fromTime, setFromTime] = React.useState(Date());
    const [toTime, setToTime] = React.useState(Date());
    const [data, setData] = React.useState(scheduleBodyBuilding);

    const handleChange = (newValue,a) => {
        a(newValue);
    };

    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن زمان</Button>
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function ModalAddPlan() {
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن زمان جدید</DialogTitle>
                    <DialogContent>
                        <Stack  spacing={3}>
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
                                    onChange={e=>handleChange(e,setFromTime)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="تا ساعت"
                                    value={toTime}
                                    onChange={e=>handleChange(e,setToTime)}
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
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"مدیریت زمان ها"}
                    action={renderAddButton()}/>
                <CardContent sx={{margin: 0}}>
                    <Typography
                        sx={{display: 'inline', margin: 2}}
                        component="p"
                        variant="h6"
                        color="text.primary"
                    >
                        بدنسازی
                    </Typography>
                    <br/>
                    <Typography
                        sx={{display: 'inline', margin: 2}}
                        component="p"
                        variant="caption"
                        color="text.primary"
                    >
                        توجه داشته باشید:
                        <br/>
                        - زمان ها ساعت 24:00 در سیستم بروز میشود
                        <br/>
                        - بلیط های فروخته شده زمان های جدید را شامل میشود
                        <br/>
                        - درصورت وجود بلیط فروخته شده حذف زمان امکانپذیر نمیباشد
                    </Typography>
                </CardContent>
            </Card>
            <_GateSchedule data={data} name={"شنبه ها"}/>
            <_GateSchedule data={data} name={"یک شنبه ها"}/>
            <_GateSchedule data={data} name={"دوشنبه ها"}/>
            <_GateSchedule data={data} name={"سه شنبه ها"}/>
            <_GateSchedule data={data} name={"چهار شنبه ها"}/>
            <_GateSchedule data={data} name={"پنج شنبه ها"}/>
            <_GateSchedule data={data} name={"جمعه ها"}/>
            {ModalAddPlan()}
        </>

    );
};

export default Gate;
