import React, {useContext, useEffect, useState} from 'react';
import BaseReportBox, {LoadStatus} from "../../../../../components/BaseReportBox";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../../../../helper";
import {Report_getPlaceViews} from "../../../../../network/api/report.api";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const _RViews = ({place,updatePlace}) => {

    const error = useContext(ErrorContext);
    const [loadStatus, setLoadStatus] = useState(LoadStatus.LOADING);
    const [data, setData] = useState([]);


    useEffect(() => {
        getUseCorporateCharge();
    }, [place]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    function getUseCorporateCharge() {
        setLoadStatus(LoadStatus.LOADING);
        if (!place) return;
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        Report_getPlaceViews({
            PlaceId: place?.Id,
            ToDate: today,
            FromDate: thirtyDaysAgo
        }).then(result => {
            console.log(result.data.Data)
            if (result?.data?.Data?.length > 0) {
                setData(result.data.Data.map(d=>{return {...d,Date:new Date(d.Date).toLocaleDateString('fa-IR', {
                        month: 'numeric',
                        day: 'numeric',
                        year: 'numeric'
                    })}}));
                setLoadStatus(LoadStatus.LOADED);
            } else {
                setLoadStatus(LoadStatus.NODATA);
            }
        })
            .catch(e => {
                try {
                    setLoadStatus(LoadStatus.ERROR);
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    };

    return (<>
            <BaseReportBox title={"آمار بازدید مجموعه"} loadStatus={loadStatus} ReloadData={() => {
                getUseCorporateCharge()
            }}>

                <LineChart
                    style={{ width: '100%', height: '100%', maxHeight: '30vh' }}
                    responsive
                    data={data}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="Date" />
                    <YAxis width="auto"  />
                    <Tooltip  />
                    <Legend />
                    <Line type="monotone" dataKey="ViewCount" stroke="#8884d8" activeDot={{ r: 8 }}  />
                </LineChart>
            </BaseReportBox>
        </>
    );
};

export default _RViews;
