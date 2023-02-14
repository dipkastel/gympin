import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import _PlaceTabs from "./_PlaceTabs";
import {place_getById} from "../../../network/api/place.api";

const Place = () => {
    const {placeId} = useParams();
    const [place, setPlace] = useState({});
    useEffect(() => {
        getPlace();
    }, [placeId]);

    function getPlace(){
        place_getById(placeId).then(result=>{
            setPlace(result.data.Data);
        }).catch(e=>console.log(e))
    }

    return (
        <>
            {place.Multimedias&&<_PlaceImages Multimedias={place.Multimedias}/>}
            {place&&<_PlaceTabs place={place}/>}
        </>
    );
};

export default Place;
