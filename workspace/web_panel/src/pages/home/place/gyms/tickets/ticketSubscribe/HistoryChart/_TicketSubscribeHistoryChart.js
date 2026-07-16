import React, {useContext, useEffect, useState} from 'react';
import {
    TicketSubscribes_getDiscountHistory,
    TicketSubscribes_getDiscountHistoryByUser
} from "../../../../../../../network/api/TicketSubscribes.api";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Portlet, PortletBody, PortletHeader} from "../../../../../../partials/content/Portlet";
import {Card, CardContent, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../../../helper";

const _TicketSubscribeHistoryChart = ({ticketSubscribe}) => {
    const error = useContext(ErrorContext);
    const [history, setHistory] = useState([]);
    const [userHistory, setUserHistory] = useState([]);

    useEffect(() => {
        TicketSubscribes_getDiscountHistory({ticketSubscribeId: ticketSubscribe.Id}).then(result => {
            setHistory(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
        TicketSubscribes_getDiscountHistoryByUser({ticketSubscribeId: ticketSubscribe.Id}).then(result => {
            setUserHistory(result.data.Data)
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

    const DiscountTooltip = ({ active, payload, label }) => {
        const firstPayload = payload?.[0];
        const data = firstPayload?.payload;
        return (
            <Card variant={"outlined"} >
                    <CardContent>
                        <Typography variant={"subtitle1"}>{"قیمت : "+toPriceWithComma(data?.afterPrice)}</Typography>
                        <Typography variant={"subtitle1"}>{"تخفیف : "+data?.Discount+"%"}</Typography>
                        <Typography variant={"subtitle1"}>{"تاریخ : "+new Date(data?.CreatedDate).toLocaleDateString('fa-IR', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}</Typography>
                        <Typography variant={"subtitle1"}>{"توسط : "+(data?.CreatorUser?.FullName || "سیستم")}</Typography>
                    </CardContent>
            </Card>
        );
    };
    const PriceChangeTooltip = ({ active, payload, label }) => {
        const firstPayload = payload?.[0];
        const data = firstPayload?.payload;
        return (
            <Card variant={"outlined"} >
                    <CardContent>
                        <Typography variant={"subtitle1"}>{"قیمت : "+toPriceWithComma(firstPayload?.value)}</Typography>
                        <Typography variant={"subtitle1"}>{"تاریخ : "+new Date(data?.CreatedDate).toLocaleDateString('fa-IR', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}</Typography>
                        <Typography variant={"subtitle1"}>{"توسط : "+data?.CreatorUser?.FullName}</Typography>
                    </CardContent>
            </Card>
        );
    };
    return (
        <>

            <Portlet>
                <PortletHeader
                    title="تاریخچه قیمت ها"
                />

                <PortletBody>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <LineChart
                            data={getData()}
                        >

                            <XAxis dataKey={(item) => {
                                return item.Id
                            }}/>

                            <YAxis yAxisId="left" colo color={"#750f0f"}/>
                            <YAxis yAxisId="right" orientation="right" color={"#05421c"}/>

                            <Tooltip content={DiscountTooltip} isAnimationActive={true} defaultIndex={0} />
                            <Line type={"stepAfter"} yAxisId="left" dataKey="Discount" stroke="#750f0f"/>
                            <Line type={"monotone"} yAxisId="right" dataKey="afterPrice" stroke="#05421c"/>
                        </LineChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>

            <Portlet>
                <PortletHeader
                    title="تاریخچه تغییرات دستی"
                />

                <PortletBody>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <LineChart
                            data={userHistory}
                        >
                            <XAxis dataKey={(item) => {
                                return item.Id
                            }}/>

                            <YAxis yAxisId="left" colo color={"#750f0f"}/>
                            <YAxis yAxisId="right" orientation="right" color={"#05421c"}/>

                            <Tooltip content={PriceChangeTooltip} isAnimationActive={true} defaultIndex={0} />
                            <Line type={"monotone"} yAxisId="right" dataKey="afterPrice" stroke="#05421c"/>
                        </LineChart>
                    </ResponsiveContainer>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _TicketSubscribeHistoryChart;
