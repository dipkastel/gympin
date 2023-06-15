import React, {useContext, useEffect, useState} from 'react';
import {Chip, Divider, Typography} from "@mui/material";
import {planGatesTiming_getByPlan} from "../../../network/api/Plans.api";
import {dayOfWeekEnum} from "../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _PlanTimingReserve = ({plan}) => {
    const error = useContext(ErrorContext);
    const [planTimes,SetPlanTimes] = useState([]);

    useEffect(() => {
        planGatesTiming_getByPlan({Id: plan.Id}).then(result => {
            SetPlanTimes(result.data.Data.reduce((groups, item) => {
                if(!item["gate-timing"]) return null;
                const group = (groups[item["gate-timing"].Gate.Name] || []);
                group.push(item);
                groups[item["gate-timing"].Gate.Name] = group;
                return groups;
            }, {}));
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    },[plan])
    return (
        <div >
            {Object.keys(planTimes).map((gateName,ite)=>(
                <div key={"ph-"+ite}>
                    <Typography component={"span"} color={"darkgray"}
                                variant={"body1"}>{gateName}</Typography>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>
                    {planTimes[gateName].map((Time,ite2)=>(
                            <Chip size={"small"}  key={Time.Id} sx={{padding:0,margin:0.5,fontSize:8}} label={dayOfWeekEnum[Time["gate-timing"]["Day-of-week"]]+" "+Time["gate-timing"]["Opening-time"].substring(0,5)+" تا "+
                            Time["gate-timing"]["Closing-time"].substring(0,5)+" "} />
                        ))}

                </div>
            ))}
        </div>
    );
};

export default _PlanTimingReserve;
