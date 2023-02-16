import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Plans_getById} from "../../network/api/plans.api";
import _PlanBaseData from "./_PlanBaseData";
import _PlanGatesTiming from "./_PlanGatesTiming";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";

const Plans = () => {
    const error = useContext(ErrorContext);
    const {planId} = useParams()
    const [plan, setPlan] = useState([]);
    useEffect(() => {
        getPlanData();
    }, []);
    function getPlanData(){
        Plans_getById({id:planId}).then(result=>{
            setPlan(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementPlans))
        return (<></>);

    return (
        <>
            <_PlanBaseData plan={plan} getPlanData={getPlanData}/>
            <_PlanGatesTiming plan={plan} />
        </>

    );
};

export default Plans;
