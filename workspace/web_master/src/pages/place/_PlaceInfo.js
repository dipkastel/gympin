import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";

const _PlaceInfo = ({place,SubmitForm}) => {
    const [name,setName]=useState(place.Name)


    function Submit() {
        SubmitForm({
            ...place,
            Name:name
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
                <Button variant={"outlined"} sx={{width:"100%"}} onClick={()=>Submit()}>ثبت</Button>
            </CardContent>
        </Card>
    );
};

export default _PlaceInfo;
