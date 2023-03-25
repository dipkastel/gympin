import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Plans_getDiscountHistory} from "../../../../../network/api/plans.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";

const _PlanHistoryChart = ({plan}) => {
    const error = useContext(ErrorContext);
    const [history,setHistory] = useState([]);

    useEffect(() => {
        Plans_getDiscountHistory({planId:plan.Id}).then(result=>{
            setHistory(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    function getData() {
        console.log(history)
        return history
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title="تاریخچه"
                />

                <PortletBody>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <LineChart
                            data={getData()}
                        >
                            <XAxis dataKey={(item) => {
                                return new Date(item.CreatedDate).toLocaleDateString('fa-IR', {month: 'long', day: 'numeric'})
                            }}/>

                            <YAxis yAxisId="left" colo color={"#750f0f"} />
                            <YAxis yAxisId="right" orientation="right" color={"#05421c"} />

                            <Tooltip />
                            <Line type={"stepAfter"} yAxisId="left" dataKey="Discount" stroke="#750f0f" />
                            <Line type={"monotone"} yAxisId="right" dataKey="afterPrice" stroke="#05421c" />
                        </LineChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>

        </>
    );
};

export default _PlanHistoryChart;
