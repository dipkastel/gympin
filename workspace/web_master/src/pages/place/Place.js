import React, {useContext, useEffect, useState} from 'react';
import _PlaceInfo from "./_PlaceInfo";
import {useSearchParams} from "react-router-dom";
import {place_getById, Place_update} from "../../network/api/place.api";
import _PlaceLocation from "./_placeLocation";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import _PlaceActivity from "../management/_PlaceActivity";

const Place = (props) => {
    const error = useContext(ErrorContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [place, setPlace] = useState();
    useEffect(() => {
        document.title = 'مدیریت مرکز';
        getPlace();
    }, []);
    function getPlace(){
        place_getById(searchParams.get("id")).then(result=>{
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
        Place_update(data).then(result=>{
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

            {getAccessOf(personnelAccessEnumT.ManagementStatus)&&<_PlaceActivity ShowIfActive={true}/>}
            {place&&<_PlaceInfo place={place} SubmitForm={(e)=>submitEdit(e)}/>}
            {place&&<_PlaceLocation place={place} SubmitForm={(e)=>submitEdit(e)}/>}
        </div>
    );
};

export default Place;
