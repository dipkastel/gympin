import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormGroup, Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    ToggleButton, Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TimePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {dayOfWeekEnum} from "../../../helper/enums/dayOfWeekEnum";
import {
    ticketActiveTimes_addAll,
    ticketActiveTimes_delete,
    ticketActiveTimes_getByHall
} from "../../../network/api/gatesTiming.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {getWizardComplete} from "../../../helper/pocket";


const _HallSchedule = ({hall,introCanGoNext}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [gateTimigs, setGateTimings] = useState([]);
    const [addValues, setAddValues] = useState([])
    const [addDays, setAddDays] = useState([]);
    const introMode = !getWizardComplete()


    useEffect(() => {
        getGateTimingOfGate();
    }, [hall]);

    useEffect(() => {
        setAddDays([]);
    }, [openModalAdd]);

    function getGateTimingOfGate() {
        ticketActiveTimes_getByHall({Id: hall.Id}).then(data => {
            setGateTimings(data.data.Data);
            try{
                introCanGoNext(data.data.Data.length>0)
            }catch (e){}
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
            ticketActiveTimes_delete({Id: deleteItem.Id}).then(result => {
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

        return (deleteItem) ? (
            <div>
                <Dialog open={!!deleteItem} onClose={() => setDeleteItem(null)}>
                    <DialogTitle>حذف زمان</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {"آیا حذف " + deleteItem.Name + " - " + dayOfWeekEnum[deleteItem.DayOfWeek] + " از " +
                            deleteItem.OpeningTime.substring(0, 5)
                            + " تا " +
                            deleteItem.ClosingTime.substring(0, 5)} را تایید می کنید؟
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteItem(null)}>لغو</Button>
                        <Button onClick={(e) => deleteSelectedItem(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        ) : (<></>)
    }

    function ModalAdd() {


        function addItems(e) {
            e.preventDefault()
            var postData = [];
            if (!addValues.Name) {
                error.showError({message: "نام فعالیت اجباری است.",});
                return;
            }
            if (!addValues.ClosingTime) {
                error.showError({message: "زمان بسته شدن تایین شود.",});
                return;
            }
            if (!addValues.OpeningTime) {
                error.showError({message: "زمان باز شدن را تایین کنید.",});
                return;
            }
            if (addDays.length < 1) {
                error.showError({message: "روز هفته انتخاب نشده.",});
                return;
            }
            addDays.map(key => {
                    postData.push({
                        "Name": addValues.Name,
                        "ClosingTime": new Date(addValues.ClosingTime).toTimeString().substring(0, 8),
                        "OpeningTime": new Date(addValues.OpeningTime).toTimeString().substring(0, 8),
                        "Hall": {Id: hall.Id},
                        "DayOfWeek": key
                    })
                }
            )
            ticketActiveTimes_addAll(postData)
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

        function setFormValues(lable, newValue) {
            setAddValues({...addValues, [lable]: newValue})
        }

        function setFormDayValues(newValue) {
            if (addDays?.indexOf(newValue) > -1) {
                setAddDays([...addDays.filter(a => a != newValue)]);
            } else {
                setAddDays([...addDays, newValue]);
            }
        }


        return (openModalAdd) ? (
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addItems(e)}>
                        <DialogTitle>افزودن زمان و فعالیت به سالن</DialogTitle>
                        <DialogContent>
                            <DialogContentText>

                                <FormGroup
                                    aria-label="position"
                                    name="position"
                                    row>

                                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                                        نام فعالیت برای تفکیک ساعت‌ها استفاده می شود.
                                        مثال :
                                    </Typography>
                                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                                        پیلاتس خانم فراهانی
                                    </Typography>
                                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                                        اسکیت عمومی
                                    </Typography>
                                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                                       بدنسازی آقایان
                                    </Typography>
                                    <TextField
                                        name={"Name"}
                                        value={addValues.Name || ""}
                                        onChange={(e) => setFormValues("Name", e.target.value)}
                                        margin="dense"
                                        label="نام فعالیت"
                                        type="text"
                                        fullWidth
                                        variant={"outlined"}
                                    />
                                </FormGroup>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <TimePicker
                                        className={"ltr datePicker mt-3"}
                                        label="از ساعت"
                                        value={addValues.OpeningTime}
                                        ampm={false}
                                        onChange={(e) => setFormValues("OpeningTime", e)}
                                        // onChange={(e)=>setFormValues("Opening-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                                        00:00 همان 24:00 است
                                    </Typography>
                                    <TimePicker
                                        className={"ltr datePicker mt-4"}
                                        label="تا ساعت"
                                        ampm={false}
                                        value={addValues.ClosingTime}
                                        onChange={(e) => setFormValues("ClosingTime", e)}
                                        // onChange={(e)=>setFormValues("Closing-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <FormControl component="fieldset" className={"mt-3"}>

                                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                                        امکان چند انتخابی وجود دارد ↓
                                    </Typography>
                                    <FormGroup
                                        aria-label="position"
                                        name="position"
                                        row>
                                        {Object.keys(dayOfWeekEnum).map(key =>

                                                <ToggleButton
                                                    key={key}
                                                    value="check"
                                                    className={"mr-1"}
                                                    selected={addDays?.indexOf(key) > -1}
                                                    color="primary"
                                                    onChange={(e) => setFormDayValues(key)}
                                                    name={key}
                                                >
                                                    {dayOfWeekEnum[key]}
                                                </ToggleButton>
                                            // <FormControlLabel
                                            //     key={key}
                                            //     className={"mr-1"}
                                            //     value="top"
                                            //     control={<Checkbox name={key} color="primary" />}
                                            //     label={dayOfWeekEnum[key]}
                                            //     labelPlacement={"top"}
                                            // />
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
        ) : (<></>)
    }


    return (
        <>
            {hall.Name&&<Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"زمان بندی های سالن "+hall.Name}
                    action={<Button variant={"outlined"} onClick={(e) => {
                        setOpenModalAdd(true)
                    }}>افزودن</Button>}
                />
                <CardContent sx={{margin: 0}}>
                    {introMode&&
                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                        {"فعالیت هایی که در سالن "+hall.Name+" انجام میشود را به همراه زمان بندی آنها وارد نمایید."}
                    </Typography>}
                    {introMode&&
                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>نکته : گاهی فعالیت ها دارای زمان نامشخص هستند مانند کلاس های خصوصی که باید هماهنگ شود یا فعالیت هایی که زمان آنها به ورود کاربر بستگی دارد مانند بدنسازی عمومی در این موارد ساعت کلی فعالیت مجموعه را وارد می نماییم ( مثلا از 07:00 تا 23:00 ) و در صورت نیاز بعدا در توضیحات بلیط می نویسیم که حتما قبل از خرید برای ساعات رزرو هماهنگی انجام شود.
                    </Typography>}
                    {introMode&&
                    <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                        این زمان بندی ها برای ساخت بلیط استفاده می شود پس اگر مجموعه دارای دو بخش آقایان و بانوان است زمان بندی آنها به صورت جداگانه وارد شود (مثلا : بدنسازی آقایان و بدنسازی بانوان)
                    </Typography>}
                    {gateTimigs.length<1 &&<Grid sx={{width:"100%"}} container justifyContent={"center"} alignContent={"center"}>
                        <CircularProgress/>
                    </Grid>}
                    {gateTimigs &&<List dense={false}>
                        {gateTimigs.map((p, number) =>
                            <ListItem sx={{direction: "rtl"}} key={number}>
                                <ListItemText
                                    className="text-start"
                                    primary={p.Name + " - " + dayOfWeekEnum[p.DayOfWeek]}
                                    secondary={"از " +
                                    p.OpeningTime.substring(0, 5)
                                    + " تا " +
                                    p.ClosingTime.substring(0, 5)
                                    }
                                />
                                <ListItemIcon className="text-end">
                                    <DeleteIcon onClick={(e) => setDeleteItem(p)} color={"primary"}/>
                                </ListItemIcon>
                            </ListItem>,
                        )}
                    </List>}
                </CardContent>
            </Card>
            }

            {!hall.Name&&
                <Grid sx={{width:"100%"}} container justifyContent={"center"} alignContent={"center"}>
                    <CircularProgress/>
                </Grid>}
            {ModalDelete()}
            {ModalAdd()}
        </>
    );
};

export default _HallSchedule;
