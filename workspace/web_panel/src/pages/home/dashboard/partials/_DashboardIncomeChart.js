import React, {useContext, useEffect, useState} from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {transactionIncome_query} from "../../../../network/api/transactionsIncome.api";

const _DashboardIncomeChart = () => {
    const error = useContext(ErrorContext);
    const [incomeData, setIncomeData] = useState(null);

    useEffect(() => {
        transactionIncome_query({
            queryType: "FILTER",
            paging: {Page: 0, Size: 50,Desc:true}
        }).then(result=>{
            setIncomeData(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);


    function getData(){
        return incomeData?.content?.toReversed();
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title="درامد تجمعی"
                />

                <PortletBody>
                    <ResponsiveContainer width="100%" aspect={3} className={"ltr"}  >
                        <LineChart
                            data={getData()}
                        >
                            <XAxis dataKey={(item) => {
                                return new Date(item.CreatedDate).toLocaleDateString('fa-IR', {month: 'long', day: 'numeric'})
                            }}/>

                            <YAxis yAxisId="right" colo color={"#750f0f"}/>
                            <YAxis yAxisId="left" orientation="right" color={"#05421c"}/>

                            <Tooltip/>
                            <Line type={"linear"} yAxisId="right" dataKey="LatestBalance" stroke="#750f0f"/>
                            <Line type={"step"} yAxisId="right" dataKey="LatestBalance" stroke="#05421c"/>
                        </LineChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>

            <Portlet>
                <PortletHeader
                    title="درامد"
                />

                <PortletBody>
                    <ResponsiveContainer width="100%" aspect={3} className={"ltr"}  >
                        <LineChart
                            data={getData()}
                        >
                            <XAxis dataKey={(item) => {
                                return new Date(item.CreatedDate).toLocaleDateString('fa-IR', {month: 'long', day: 'numeric'})
                            }}/>

                            <YAxis yAxisId="right" colo color={"#750f0f"}/>
                            <YAxis yAxisId="left" orientation="right" color={"#05421c"}/>

                            <Tooltip/>
                            <Line type={"step"} yAxisId="right" dataKey="Amount" stroke={"#ff2525"}/>
                        </LineChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>

        </>
    );
};

export default _DashboardIncomeChart;
