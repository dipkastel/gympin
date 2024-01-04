import React, {useContext, useState} from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {dayOfWeekEnum} from "../../../../../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {ticketSubscribeActiveTimes_addAll} from "../../../../../../../network/api/ticketSubscribeActiveTimes.api";

const ___wizardFormAddActiveTimesToHall = ({hall, getTimingByPlace, setOpenCollapsableAddTiming}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [openTime, setOpenTime] = useState("")
    const [closeTime, setCloseTime] = useState("")
    const [dayOfWeek, setDayOfWeek] = useState([])

    function addTimingItemsToHall(e) {
        e.preventDefault()
        if (!(openTime) || openTime == "") {

            error.showError({message: "زمان شروع فعالیت اجباری است",});
            return;
        }
        if (!(closeTime) || closeTime == "") {

            error.showError({message: "زمان پایان فعالیت اجباری است",});
            return;
        }

        //
        // setOpenModalAdd(false);
        var postData = [];
        Object.keys(dayOfWeek).map(key => {
                if (dayOfWeek[key]) {
                    postData.push({
                        "ClosingTime": new Date(closeTime).toTimeString().substring(0, 8),
                        "OpeningTime": new Date(openTime).toTimeString().substring(0, 8),
                        "Hall": {Id: hall.Id},
                        "DayOfWeek": key
                    })
                }
            }
        )
        if (postData.length < 1) {
            error.showError({message: "حد اقل یکی از روزهای هفته باید انتخاب شود",});
            return;
        }
        ticketSubscribeActiveTimes_addAll(postData)
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
        <form onSubmit={(e) => addTimingItemsToHall(e)}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    className={"ltr fullwidth mt-3"}
                    label="از ساعت"
                    value={openTime}
                    ampm={false}
                    name={"OpeningTime"}
                    onChange={(e) => setOpenTime(e)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    className={"ltr fullwidth mt-4"}
                    label="تا ساعت"
                    ampm={false}
                    name={"ClosingTime"}
                    value={closeTime}
                    onChange={(e) => setCloseTime(e)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <FormControl component="fieldset" className={"mt-3"}>
                <FormGroup
                    aria-label="position"
                    name="daysOfWeek"
                    onChange={(e) => setDayOfWeek({...dayOfWeek, [e.target.name]: e.target.checked})}
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

export default ___wizardFormAddActiveTimesToHall;
