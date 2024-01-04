import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {halls_getById, halls_update} from "../../../../network/api/hall.api";
import Notice from "../../../partials/content/Notice";
import HallBase from "./Base/HallBase";
import ActivityTimes from "./Timing/ActivityTimes";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const HallDataManagement = () => {
    const error = useContext(ErrorContext);
    const [hall,setHall] = useState(null);
    const {hallId} = useParams();
    useEffect(() => {
        getThisHall()
    }, []);
    function getThisHall(){
        halls_getById({id:hallId}).then(data=>{
            setHall(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateHall(hall){
        halls_update(hall).then(data=>{
            error.showError({message: "عملیات موفق",});
            getThisHall()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                {hall && (
                    <p>مدیریت مشخصات سالن {hall.Name}</p>
                )}
            </Notice>
            {hall && <div className="row">
                <div className="col-md-6">
                    <HallBase hall={hall} updateHall={updateHall}/>
                </div>
                <div className="col-md-6">
                    <ActivityTimes hall={hall}/>
                </div>
            </div>}
        </>
    );
};

export default HallDataManagement;
