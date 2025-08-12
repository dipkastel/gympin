import React, {useContext, useEffect, useState} from 'react';
import _PlaceInfo from "./_PlaceInfo";
import {useSearchParams} from "react-router-dom";
import {gym_getById, gym_update} from "../../network/api/place.api";
import _PlaceLocation from "./_placeLocation";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import _PlaceActivity from "../management/_PlaceActivity";
import {getWizardComplete} from "../../helper/pocket";
import {useSelector} from "react-redux";

const Place = ({hallListChange,introCanGoNext}) => {
    const error = useContext(ErrorContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [place, setPlace] = useState();

    const inplace = useSelector(({place}) => place.place)
    const introMode = !getWizardComplete()
    useEffect(() => {
        document.title = 'مدیریت مرکز';
        getPlace();
    }, []);

    useEffect(() => {
        if(introMode&&(!!place?.Latitude)&&(!!place?.Longitude)&&(!!place?.Address)&&(!!place?.Location))
             introCanGoNext(true);
    }, [place]);

    function getPlace(){
        gym_getById(introMode?inplace?.Id:searchParams?.get("id")).then(result=>{
            setPlace(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }
    function submitEdit(data){
        gym_update(data).then(result=>{
            getPlace();
            error.showError({message: "با موفقیت ثبت شد.",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    return (
        <div>
            {!introMode&&getAccessOf(personnelAccessEnumT.ManagementStatus)&&<_PlaceActivity ShowIfActive={true}/>}
            {place&&<_PlaceInfo place={place} SubmitForm={(e)=>submitEdit(e)}/>}
            {place&&<_PlaceLocation place={place} SubmitForm={(e)=>submitEdit(e)}/>}
        </div>
    );
};

export default Place;
