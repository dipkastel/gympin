import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, FormControlLabel, Switch, TextField} from "@mui/material";

const _PlaceInfo = ({place,SubmitForm}) => {
    const [name,setName]=useState(place.Name)
    const [tell,setTell]=useState(place.Tell)
    const [ActiveTimes,setActiveTimes]=useState(place.ActiveTimes)
    const [callUs,setCallUs]=useState(place.CallUs)


    function Submit() {
        SubmitForm({
            ...place,
            Name:name,
            Tell:tell,
            CallUs:callUs
        })
    }

    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"اطلاعات مجموعه"}
            />
            <CardContent>
                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    label={"نام مجموعه"}
                    multiline
                />
                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    value={tell}
                    onChange={e=>setTell(e.target.value)}
                    label={"تلفن مجموعه"}
                    multiline
                />

                <FormControlLabel
                    checked={callUs}
                    onChange={e=>setCallUs(e.target.checked)}
                    control={<Switch />}
                    label={"پیشنهاد شود قبل از خرید تماس بگیرند."}
                />

                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    value={ActiveTimes}
                    onChange={e=>setActiveTimes(e.target.value)}
                    label={"ساعات فعالیت مجموعه"}
                    multiline={true}
                    minRows={3}
                />
                <Button variant={"contained"} sx={{width:"100%"}} onClick={()=>Submit()}>ثبت</Button>
            </CardContent>
        </Card>
    );
};

export default _PlaceInfo;
