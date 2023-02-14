import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Place_getPlaceById, Place_updatePlace} from "../../../../network/api/place.api";
import Notice from "../../../partials/content/Notice";
import {Plans_getById, Plans_update} from "../../../../network/api/plans.api";
import PlanBase from "./Base/PlanBase";
import PlanGatesTiming from "./PlanGatesTiming/PlanGateTiming";
import {Button} from "@mui/material";
import {Place} from "@mui/icons-material";
import PlanSport from "./planSports/PlanSport";

const PlaceDataManagement = () => {
    let {planId} = useParams();
    let history = useHistory();
    const [plan,setPlan] = useState(null);
    useEffect(() => {
        getPlan();
    }, []);

    function getPlan() {
        Plans_getById({id: planId}).then((result) => {
            setPlan(result.data.Data)
        }).catch(e=>console.log(e));
    }

    function updatePlan(plan) {
        Plans_update(plan).then(data => {
            setPlan(data.data.Data)
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                {plan && (
                    <>
                        <p>مدیریت مشخصات پلن {plan.Name}</p>
                        <Button variant={"contained"} color={"warning"} onClick={()=>{
                         history.push("/place/data/"+plan.Place.Id)
                        }}>بازگشت</Button>
                    </>

                )}
            </Notice>
            {plan && <div className="row">
                <div className="col-md-6">
                    {plan&&<PlanBase plan={plan} updatePlan={updatePlan}/>}
                </div>
                <div className="col-md-6">
                    {plan&&<PlanGatesTiming plan={plan} />}
                    {plan&&<PlanSport plan={plan} />}
                </div>
            </div>}
        </>
    );
};

export default PlaceDataManagement;
