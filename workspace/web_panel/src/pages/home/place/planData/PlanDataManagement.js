import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {Plans_getById, Plans_update} from "../../../../network/api/plans.api";
import PlanBase from "./Base/PlanBase";
import PlanGatesTiming from "./PlanGatesTiming/PlanGateTiming";
import {Button} from "@mui/material";
import PlanSport from "./planSports/PlanSport";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import _PlanHistoryChart from "./HistoryChart/_PlanHistoryChart";
import _changeStatus from "./changeStatus/_ChangeStatus";

const PlaceDataManagement = () => {
    const error = useContext(ErrorContext);
    let {planId} = useParams();
    let history = useHistory();
    const [plan,setPlan] = useState(null);
    useEffect(() => {
        getPlan();
    }, []);

    function getPlan() {
        Plans_getById({id: planId}).then((result) => {
            setPlan(result.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function updatePlan(plan) {
        Plans_update(plan).then(data => {
            setPlan(data.data.Data)
            error.showError({message: "با موفقیت ثبت شد",});
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
                    {plan&&<_changeStatus plan={plan} updatePlan={updatePlan}/>}
                    {plan&&<PlanBase plan={plan} updatePlan={updatePlan}/>}
                </div>
                <div className="col-md-6">
                    {plan&&<PlanGatesTiming plan={plan} />}
                    {plan&&<PlanSport plan={plan} />}
                    {plan&&<_PlanHistoryChart plan={plan} />}

                </div>
            </div>}
        </>
    );
};

export default PlaceDataManagement;
