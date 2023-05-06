import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import _PlaceTabs from "./_PlaceTabs";
import {place_getById} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import "./place.css"
import _PlaceMap from "./_PlaceMap";

const Place = () => {
    const error = useContext(ErrorContext);
    const {placeId} = useParams();
    const [place, setPlace] = useState({});

    useEffect(() => {
        getPlace();
    }, [placeId]);

    function getPlace(){
        place_getById(placeId).then(result=>{
            setPlace(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            {place.Multimedias&&<_PlaceImages place={place}/>}
            <_PlaceTabs place={place}/>
        </>
    );
};

export default Place;
