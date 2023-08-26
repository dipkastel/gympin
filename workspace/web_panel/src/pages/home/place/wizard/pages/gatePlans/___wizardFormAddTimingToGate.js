import React, {useContext, useState} from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {dayOfWeekEnum} from "../../../../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {gateTiming_addAll} from "../../../../../../network/api/gateTiming.api";

const ___wizardFormAddTimingToGate = ({gate,getTimingByPlace,setOpenCollapsableAddTiming}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [openTime,setOpenTime] = useState("")
    const [closeTime,setCloseTime] = useState("")
    const [dayOfWeek,setDayOfWeek] = useState([])

    function addTimingItemsToGate(e) {
        e.preventDefault()
        console.log(dayOfWeek);
        if(!(e.target.TimingName.value)){

            error.showError({message: "نام برای زمان ها اجباری است",});
            return;
        }
        if(!(openTime)||openTime==""){

            error.showError({message: "زمان شروع فعالیت اجباری است",});
            return;
        }
        if(!(closeTime)||closeTime==""){

            error.showError({message: "زمان پایان فعالیت اجباری است",});
            return;
        }

        //
        // setOpenModalAdd(false);
        var postData = [];
        Object.keys(dayOfWeek).map(key =>                {
                if(dayOfWeek[key]){
                    postData.push({
                        "Name":e.target.TimingName.value,
                        "Closing-time":new Date(closeTime).toTimeString().substring(0,8),
                        "Opening-time":new Date(openTime).toTimeString().substring(0,8),
                        "Gate":{Id:gate.Id},
                        "Day-of-week":key
                    })
                }
            }
        )
        if(postData.length<1){
            error.showError({message: "حد اقل یکی از روزهای هفته باید انتخاب شود",});
            return;
        }
        gateTiming_addAll(postData)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getTimingByPlace();
                setOpenCollapsableAddTiming(null);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    return (
        <form onSubmit={(e) => addTimingItemsToGate(e)}>

            <FormControl fullWidth>
                <TextField
                    type="text"
                    label="نام دلخواه (مثال : سالن بدنسازی شماره 1 ) "
                    margin="normal"
                    name={"TimingName"}
                    // value={addValues["Name"]||""}
                    fullWidth={true}
                    // onChange={(e)=>setFormValues("Name",e.target.value)}
                />
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    className={"ltr fullwidth mt-3"}
                    label="از ساعت"
                    value={openTime}
                    ampm={false}
                    name={"OpeningTime"}
                    onChange={(e)=>setOpenTime(e)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    className={"ltr fullwidth mt-4"}
                    label="تا ساعت"
                    ampm={false}
                    name={"ClosingTime"}
                    value={closeTime}
                    onChange={(e)=>setCloseTime(e)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <FormControl component="fieldset" className={"mt-3"}>
                <FormGroup
                    aria-label="position"
                    name="daysOfWeek"
                    onChange={(e)=>setDayOfWeek({...dayOfWeek,[e.target.name]:e.target.checked})}
                    row>
                    {Object.keys(dayOfWeekEnum).map(key =>
                        <FormControlLabel
                            key={key}
                            className={"mr-1"}
                            value="top"
                            control={<Checkbox name={key} color="primary"/>}
                            label={dayOfWeekEnum[key]}
                            labelPlacement={"top"}
                        />
                    )}
                </FormGroup>
            </FormControl>
            <Button
                color={"success"}
                variant={"contained"}
                type={"submit"}
            >
                اضافه
            </Button>
        </form>
    );
};

export default ___wizardFormAddTimingToGate;
