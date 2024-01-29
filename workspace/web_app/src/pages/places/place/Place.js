import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import _TabsPlace from "./_TabsPlace";
import {place_getById} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import "./place.css"

const Place = () => {
    const error = useContext(ErrorContext);
    const {placeId} = useParams();
    const [place, setPlace] = useState({});

    useEffect(() => {
        getPlace();
    }, [placeId]);

    function getPlace() {
        place_getById(placeId).then(result => {
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
        <div className={"row m-0"}>
            {place.Multimedias && <div className={"col-sm-12 col-md-6 p-0"}>
                <_PlaceImages place={place}/>
            </div>}
            {place && <div className={"col-sm-12 col-md-6 p-0"}>
                <_TabsPlace place={place}/>
            </div>}
        </div>
    );
};

export default Place;
