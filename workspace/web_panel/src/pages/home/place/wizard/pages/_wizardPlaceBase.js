import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {PlaceGym_getPlaceById, PlaceGym_updatePlace} from "../../../../../network/api/place.api";
import __wizardRegister from "./base/__wizardRegister";
import {useParams} from "react-router-dom";
import {Location_query} from "../../../../../network/api/location.api";
import __wizardBaseInfo from "./base/__wizardBaseInfo";

const _wizardPlaceBase = ({allowNext}) => {

    const error = useContext(ErrorContext);

    const [locations, SetLocations] = useState(null)
    const [inPlace, SetInPlace] = useState(null)

    let {placeId} = useParams();


    useEffect(() => {
        checkAllowNext();
        getLocations();
    }, []);

    useEffect(() => {
        if (inPlace && placeId == 0) {
            window.location.href = "/place/wizard/" + inPlace.Id
        }
    }, [inPlace]);

    function checkAllowNext() {
        if (inPlace)
            allowNext(inPlace.Location && inPlace.Address && inPlace.CommissionFee && inPlace.Latitude, inPlace.Longitude)
    }

    function updateInPlace() {
        PlaceGym_updatePlace(inPlace).then(data => {
            SetInPlace(data.data.Data);
            checkAllowNext();
            error.showError({message: "با موفقیت ثبت شد"});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function getLocations() {

        Location_query({
            queryType: "FILTER",
            Type: "REGION",
            paging: {Page: 0, Size: 1000}
        }).then(data => {
            SetLocations(data.data.Data.content);
            if (placeId != 0)
                getPlace(placeId);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getPlace(placeId) {
        PlaceGym_getPlaceById({id: placeId}).then(result => {
            SetInPlace(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return inPlace ? <__wizardBaseInfo inPlace={inPlace} setInPlace={SetInPlace} locations={locations}
                                       updateInPlace={updateInPlace}/> : <__wizardRegister setPlace={SetInPlace}/>;

};

export default _wizardPlaceBase;
