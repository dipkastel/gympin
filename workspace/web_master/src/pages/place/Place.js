import React, {useEffect, useState} from 'react';
import _PlaceInfo from "./_PlaceInfo";
import {useSearchParams} from "react-router-dom";
import {getplaceById, updatePlace} from "../../network/api/place.api";
import _PlaceLocation from "./_placeLocation";

const Place = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [place, setPlace] = useState();
    useEffect(() => {
        getplaceById(searchParams.get("id")).then(result=>{
            setPlace(result.data.Data)
        }).catch(e=>console.log(e))
    }, []);
    function submitEdit(data){
        updatePlace(data).then(result=>{
            window.location = window.location
        }).catch(e=>console.log(e));

    }

    return (
        <div>
            {place&&<_PlaceInfo place={place} SubmitForm={(e)=>submitEdit(e)}/>}
            {place&&<_PlaceLocation place={place} SubmitForm={(e)=>submitEdit(e)}/>}
        </div>
    );
};

export default Place;
