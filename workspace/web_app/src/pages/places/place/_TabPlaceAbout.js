import React, {useContext, useEffect, useState} from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {PlaceAbout_getByPlace} from "../../../network/api/placeAbout.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _PlaceMap from "./_PlaceMap";
import _TabsPlace from "./_TabsPlace";
import _PlaceAddress from "./_PlaceAddress";
import _PlaceSingleAbout from "./_PlaceSingleAbout";
import _PlaceFacilities from "./_PlaceFacilities";

const _TabPlaceAbout = ({place}) => {
    const error = useContext(ErrorContext);
    const [abouts,SetAbouts] = useState([]);
    useEffect(() => {
        PlaceAbout_getByPlace({Id:place.Id}).then(result=>{
            SetAbouts(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [place]);

    return (

        <div className={"nopadding"}>
            {place.Address&&<_PlaceAddress place={place} />}
            {place.Latitude&&place.Longitude&&<_PlaceMap place={place} />}
            <_PlaceFacilities place={place}/>
            {abouts.map((item,number) => (
                    <_PlaceSingleAbout about={item} number={number}/>
                )
            )}
        </div>
    );
};

export default _TabPlaceAbout;
