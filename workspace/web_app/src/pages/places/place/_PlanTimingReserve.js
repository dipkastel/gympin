import React, {useContext, useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {planGatesTiming_getByPlan} from "../../../network/api/Plans.api";
import {dayOfWeekEnum} from "../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _PlanTimingReserve = ({plan}) => {
    const error = useContext(ErrorContext);
    const [planTimes,SetPlanTimes] = useState([]);

    useEffect(() => {
        planGatesTiming_getByPlan({Id: plan.Id}).then(result => {
            SetPlanTimes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    },[plan])
    return (
        <div>
            <Typography sx={{pr:1}} variant={"subtitle1"}>
                قابل استفاده در :
            </Typography>
            {planTimes.map(item=>(
                <Typography key={item.Id} sx={{pr:1}} variant={"subtitle2"}>
                    {item["gate-timing"].Gate.Name+" "+item["gate-timing"].Name+" "+dayOfWeekEnum[item["gate-timing"]["Day-of-week"]]+" از "+
                    item["gate-timing"]["Opening-time"].substring(0,5)+" تا "+
                    item["gate-timing"]["Closing-time"].substring(0,5)+" "}
                </Typography>
            ))}
        </div>
    );
};

export default _PlanTimingReserve;
