import React, {useContext, useEffect, useState} from 'react';
import {PlaceAbout_getByPlace} from "../../../network/api/placeAbout.api";
import _PlaceMap from "./_PlaceMap";
import _PlaceAddress from "./_PlaceAddress";
import _PlaceSingleAbout from "./_PlaceSingleAbout";
import _PlaceFacilities from "./_PlaceFacilities";
import {placePersonnel_ByPlace} from "../../../network/api/placePersonnel.api";
import _PlaceCoaches from "./_PlaceCoaches";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _TabPlaceAbout = ({place}) => {
    const error = useContext(ErrorContext);
    const [abouts,SetAbouts] = useState([]);
    const [personnel,SetPersonnel] = useState(null);
    useEffect(() => {
        getAbouts();
        getPersonnels();
    }, [place]);

    function getAbouts() {
        PlaceAbout_getByPlace({Id:place.Id}).then(result=>{
            SetAbouts(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getPersonnels() {
        if(!place.Id) return;
        placePersonnel_ByPlace({Id:place.Id}).then(result=>{
            SetPersonnel(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (

        <div className={"nopadding"}>

            {personnel&&<_PlaceCoaches place={place} personnel={personnel}/>}
            {place.Address&&<_PlaceAddress place={place} />}
            {place.Latitude&&place.Longitude&&<_PlaceMap place={place} />}
            <_PlaceFacilities place={place}/>
            {abouts.map((item,number) => (
                    <_PlaceSingleAbout key={"a"+number} about={item} number={number}/>
                )
            )}
        </div>
    );
};

export default _TabPlaceAbout;
