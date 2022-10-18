import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import "leaflet/dist/leaflet.css"
import _PlaceMap from "./_PlaceMap";
import {Api_url} from "../../network/const/NETWORKCONSTS";

const _PlaceLocation = ({place,SubmitForm}) => {
    const [address,setAddress] = useState(place.Address)
    const [location,SetLocation] = useState({lat:place.Latitude,lng:place.longitude})

    function Submit() {
        SubmitForm({
            ...place,
            Address:address,
            Latitude:location.lat,
            longitude:location.lng
        })
    }

    function locationChanged(lat,lng){
        SetLocation({lat:lat,lng:lng})
        const url = "https://geocode.xyz/"+lat+","+lng+"?geoit=json&auth=1959234630319352460x111196";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAddress(data.osmtags.name+"،"+data.staddress)
            })
            .catch(e=>console.log(e));
    }

    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"محل مجموعه"}
            />
            <CardContent sx={{overflow:"hidden"}}>

                <_PlaceMap place={place} location={locationChanged}/>

                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                    label={"آدرس"}
                    multiline
                />
                <Button variant={"outlined"} sx={{width:"100%"}} onClick={()=>Submit()}>ثبت</Button>
            </CardContent>
        </Card>
    );
};

export default _PlaceLocation;
