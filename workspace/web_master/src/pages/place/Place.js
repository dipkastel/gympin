import React, {useEffect, useState} from 'react';
import _PlaceInfo from "./_PlaceInfo";
import {useSearchParams} from "react-router-dom";
import {place_getById, Place_update} from "../../network/api/place.api";
import _PlaceLocation from "./_placeLocation";

const Place = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [place, setPlace] = useState();
    useEffect(() => {
        place_getById(searchParams.get("id")).then(result=>{
            setPlace(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }, []);
    function submitEdit(data){
        Place_update(data).then(result=>{
            window.location = window.location
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        });

    }

    return (
        <div>
            {place&&<_PlaceInfo place={place} SubmitForm={(e)=>submitEdit(e)}/>}
            {place&&<_PlaceLocation place={place} SubmitForm={(e)=>submitEdit(e)}/>}
        </div>
    );
};

export default Place;
