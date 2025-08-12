import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
// import _PlaceImages from "./_PlaceImages";
// import _TabsPlace from "./_TabsPlace";
// import {ErrorContext} from "../../../components/GympinPagesProvider";
import "./placePreview.css"
import {gym_getById} from "../../network/api/place.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import _PlaceImages from "./_PlaceImages";
import _TabsPlace from "./_TabsPlace";

const PlacePreview = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    useEffect(() => {
        if(place)
        document.title = place.Name;
    }, [place]);

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

export default PlacePreview;
