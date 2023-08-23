import React, {useContext} from 'react';
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

const ___wizardFormAddTimingToGate = ({}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    function addTimingItemsToGate(e) {
        e.preventDefault()
        console.log(e.target)
    }

    return (
        <form onSubmit={(e) => addTimingItemsToGate(e)}>

            <FormControl fullWidth>
                <TextField
                    type="text"
                    label="نام دلخواه (مثال : صبح ) "
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
                    // value={addValues["Opening-time"]||""}
                    ampm={false}
                    name={"OpeningTime"}
                    // onChange={(e)=>setFormValues("Opening-time",e)}
                    // onChange={(e)=>setFormValues("Opening-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    className={"ltr fullwidth mt-4"}
                    label="تا ساعت"
                    ampm={false}
                    name={"ClosingTime"}
                    // value={addValues["Closing-time"]||""}
                    // onChange={(e)=>setFormValues("Closing-time",e)}
                    // onChange={(e)=>setFormValues("Closing-time",new Date(e).getHours() + ":"+new Date(e).getMinutes())}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <FormControl component="fieldset" className={"mt-3"}>
                <FormGroup
                    aria-label="position"
                    name="daysOfWeek"
                    // onChange={(e)=>setFormDayValues(e.target.name,e.target.checked)}
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
