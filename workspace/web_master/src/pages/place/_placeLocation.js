import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import "leaflet/dist/leaflet.css"
import _PlaceMap from "./_PlaceMap";
import {Api_url} from "../../network/api/NETWORKCONSTS";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {genders} from "../../helper/enums/genders";
import {location_query} from "../../network/api/location.api";

const _PlaceLocation = ({place,SubmitForm}) => {
    const error = useContext(ErrorContext);
    const mapToken = "162059401273012e15967682x402951111111111"
    const [address,setAddress] = useState(place.Address)
    const [locations,setLocations] = useState([{Name:"صبر کنید"}])
    const [selectedLocation,setSelectedLoacation] = useState(place.Location?.Id||null)
    const [latlng,SetLatlng] = useState({lat:place.Latitude,lng:place.longitude})


    useEffect(() => {
        getLocations();
    }, []);

    function getLocations(){
        location_query({
            queryType: "FILTER",
            ParentId: 3,
            paging: {Page: 0 , Size: 400, Desc: false}
        }).then((data) => {
            console.log(data.data.Data);
            setLocations(data.data.Data.content)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }



    function Submit() {
        SubmitForm({
            ...place,
            Address:address,
            Location:{Id:selectedLocation},
            Latitude:latlng.lat,
            longitude:latlng.lng
        })
    }

    function larlngChanged(lat,lng){
        SetLatlng({lat:lat,lng:lng})

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

                <_PlaceMap place={place} latlng={larlngChanged}/>

                <FormControl variant="standard"
                             sx={{mt:2}}
                             fullWidth>
                    <InputLabel id="label">منطقه</InputLabel>
                    <Select
                        value={selectedLocation||""}
                        onChange={(e) => setSelectedLoacation( e.target.value)}
                        label="منطقه"
                        variant={"outlined"}
                        fullWidth
                    >
                        <MenuItem>انتخاب کنید</MenuItem>
                        {locations.map(g => (
                            <MenuItem key={g.Id} value={g.Id}>{g.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
