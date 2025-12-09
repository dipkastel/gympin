import React, {useContext, useEffect, useState} from 'react';
import {Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
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
        console.log(incomeData?.content)
        return incomeData?.content?.toReversed();
    }
    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;

        const data = payload[0].payload;

        return (
            <div className="custom-tooltip" style={{ background: "#fff", padding: 10, border: "1px solid #ccc" }}>

                {payload.map((item, index) => (
                    <p key={index} style={{ color: item.color }}>
                        {item.name}: {item.value}
                    </p>
                ))}
                <p style={{ marginTop: 6, fontWeight: "bold" }}>
                    {"بلیط :"+data.Purchased?.Name}
                </p>
                <p style={{ marginTop: 6, fontWeight: "bold" }}>
                    {"مرکز :"+data.Purchased?.Place?.Name}
                </p>
                {data.Purchased?.Serial?.map(p=>(
                    <p style={{ marginTop: 6, fontWeight: "bold" }}>
                        {"فرایند :"+p.Id}
                    </p>
                ))}
                <p style={{ marginTop: 6, fontWeight: "bold" }}>
                    {"کاربر :"+data.Purchased?.Customer?.FullName}
                </p>

            </div>
        );
    };
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
                                return new Date(item.CreatedDate).toLocaleDateString('fa-IR', {month: 'numeric', day: 'numeric',hour:"numeric",minute:"numeric",second:"numeric"})
                            }} />
                            <YAxis yAxisId="right" colo color={"#750f0f"}/>
                            <YAxis yAxisId="left" orientation="right" color={"#05421c"}/>
                            <ReferenceLine yAxisId={"right"} y={0} stroke="gray" strokeWidth={1.5} strokeOpacity={0.65} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type={"step"} yAxisId="right"  dataKey="Amount" stroke="#750f0f"/>
                            <Line type={"stepAfter"} yAxisId="left" dataKey="LatestBalance" stroke="#05421c"/>
                        </LineChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>


        </>
    );
};

export default _DashboardIncomeChart;
