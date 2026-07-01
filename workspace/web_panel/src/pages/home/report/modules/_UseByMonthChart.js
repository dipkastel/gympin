import React, {useContext, useEffect, useState} from 'react';
import {Bar, BarChart, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import { Report_getUseByMonth} from "../../../../network/api/report.api";

const _UseByMonthChart = () => {
    const error = useContext(ErrorContext);
    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        Report_getUseByMonth().then(result=>{
            setIncomeData(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    return (
        <>

            {incomeData&&<Portlet>
                <PortletHeader
                    title="استفاده ماه"
                />

                <PortletBody>
                    <ResponsiveContainer width="100%" aspect={3} className={"ltr"}  >
                        <BarChart
                            data={incomeData}
                        >
                            <XAxis dataKey={(item) => { return  item.Month}} />
                            <YAxis yAxisId="right" color={"#750f0f"}/>
                            <Tooltip />
                            <ReferenceLine yAxisId={"right"} y={0} stroke="gray" strokeWidth={1.5} strokeOpacity={0.65} />
                            <Bar dataKey="Count" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>}


        </>
    );
};

export default _UseByMonthChart;
