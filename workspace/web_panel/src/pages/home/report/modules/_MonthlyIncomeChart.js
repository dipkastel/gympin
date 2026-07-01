import React, {useContext, useEffect, useState} from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {transactionIncome_getByMonth} from "../../../../network/api/transactionsIncome.api";

const _MonthlyIncomeChart = () => {
    const error = useContext(ErrorContext);
    const [incomeData, setIncomeData] = useState(null);

    useEffect(() => {
        transactionIncome_getByMonth().then(result=>{
            console.log(result.data.Data);
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
        return incomeData;
    }
    return (
        <>

            {incomeData&&<Portlet>
                <PortletHeader
                    title="درآمد"
                />

                <PortletBody>
                    <ResponsiveContainer width="100%" aspect={3} className={"ltr"}>
                        <AreaChart
                            responsive
                            data={incomeData}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="MonthName" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="Amount"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                                isAnimationActive={true}
                                animationBegin={200}
                                animationDuration={1300}
                            />
                        </AreaChart>
                        {/*<LineChart*/}
                        {/*    data={getData()}*/}
                        {/*>*/}
                        {/*    <XAxis dataKey={(item) => {*/}
                        {/*        return item.MonthName*/}
                        {/*    }}/>*/}
                        {/*</LineChart>*/}

                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>}


        </>
    );
};

export default _MonthlyIncomeChart;
