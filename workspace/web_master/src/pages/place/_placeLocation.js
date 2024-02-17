import React, {useContext, useState} from 'react';
import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import "leaflet/dist/leaflet.css"
import _PlaceMap from "./_PlaceMap";
import {Api_url} from "../../network/api/NETWORKCONSTS";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _PlaceLocation = ({place,SubmitForm}) => {
    const error = useContext(ErrorContext);
    const mapToken = "162059401273012e15967682x402951111111111"
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

        // const url = "https://geocode.xyz/"+lat+","+lng+"?geoit=json&auth="+mapToken;
        //
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
        //         setAddress(data.osmtags.name+"،"+data.staddress)
        //     })
        //     .catch(e => {
        //     try {
        //         error.showError({message: e.response.data.Message,});
        //     } catch (f) {
        //         error.showError({message: "خطا نا مشخص",});
        //     }
        // });
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
