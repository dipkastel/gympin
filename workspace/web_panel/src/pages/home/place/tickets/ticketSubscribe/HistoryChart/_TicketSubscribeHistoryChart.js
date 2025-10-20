import React, {useContext, useEffect, useState} from 'react';
import {TicketSubscribes_getDiscountHistory} from "../../../../../../network/api/ticketSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";

const _TicketSubscribeHistoryChart = ({ticketSubscribe}) => {
    const error = useContext(ErrorContext);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        TicketSubscribes_getDiscountHistory({ticketSubscribeId: ticketSubscribe.Id}).then(result => {
            console.log(result.data.Data);
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

                            <YAxis yAxisId="left" colo color={"#750f0f"}/>
                            <YAxis yAxisId="right" orientation="right" color={"#05421c"}/>

                            <Tooltip/>
                            <Line type={"stepAfter"} yAxisId="left" dataKey="Discount" stroke="#750f0f"/>
                            <Line type={"monotone"} yAxisId="right" dataKey="afterPrice" stroke="#05421c"/>
                            <Line type={"monotone"} yAxisId="right" dataKey="beforPrice" stroke="#FF5523"/>
                        </LineChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>

        </>
    );
};

export default _TicketSubscribeHistoryChart;
