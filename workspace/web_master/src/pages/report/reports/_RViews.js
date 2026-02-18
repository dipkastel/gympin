import React, {useContext, useEffect, useState} from 'react';
import {BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import Chart from "react-apexcharts";
import {useColorScheme} from "@mui/material";
import {Report_getPlaceViews, Report_useCorporateCharge} from "../../../network/api/report.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../../../helper/utils";
import BaseReportBox, {LoadStatus} from "../BaseReportBox";

const _RViews = () => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place);
    const {mode, setMode} = useColorScheme();
    const [loadStatus,setLoadStatus] = useState(LoadStatus.LOADING);
    const [data,setData] = useState([]);


    useEffect(() => {
        getUseCorporateCharge();
    }, [place]);

    if (!mode) {
        return null;
    }

    function getUseCorporateCharge(){
        setLoadStatus(LoadStatus.LOADING);
        if(!place)return;
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        Report_getPlaceViews({
            PlaceId:place?.Id,
            ToDate: today,
            FromDate: thirtyDaysAgo
        }).then(result => {
            if(result?.data?.Data?.length > 0){
                setData(result.data.Data);
                setLoadStatus(LoadStatus.LOADED);
            }else{
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





    const Rseries =  [{
        name: 'تعداد بازدید',
        data: data.map(d=>d.ViewCount)
    }];
    const Roptions = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                if(!val) return "";
                return  toPriceWithComma(val);
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#a98686"]
            }
        },
        theme:{mode:mode},
        xaxis: {
            categories: data.map(d=>new Date(d.Date).toLocaleDateString('fa-IR', {
                month: 'long',
                day: 'numeric'
            })),
            position: "bottom",
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            // crosshairs: {
            //     fill: {
            //         type: 'gradient',
            //         gradient: {
            //             colorFrom: '#ffffff',
            //             colorTo: '#d2a3a3',
            //             stops: [0, 100],
            //             opacityFrom: 0.4,
            //             opacityTo: 0.5,
            //         }
            //     }
            // },
        },
        tooltip: {
            enabled: true,
            style: {
                fontFamily:"inherit",
                Direction: 'rtl !important',
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
        }
    }

    return (<>
            <BaseReportBox title={"آمار بازدید مجموعه"} loadStatus={loadStatus} ReloadData={()=>{getUseCorporateCharge()}} >
                <Chart options={Roptions} series={Rseries}  type="bar" height={280} />
            </BaseReportBox>
    </>
    );
};

export default _RViews;
