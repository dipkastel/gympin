import React, {useContext, useEffect, useState} from 'react';
import BaseReportBox, {LoadStatus} from "../BaseReportBox";
import {BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import Chart from "react-apexcharts";
import {useColorScheme} from "@mui/material";
import {Report_getBalanceChangedReport, Report_useCorporateCharge} from "../../../network/api/report.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../../../helper/utils";
import ReactEcharts from "echarts-for-react";

const _RFinanceReport = () => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const {mode, setMode} = useColorScheme();
    const [loadStatus,setLoadStatus] = useState(LoadStatus.LOADING);
    const [option, setOption] = useState(null);



    useEffect(() => {
        getUseCorporateCharge();
    }, [corporate]);

    if (!mode) {
        return null;
    }

    function getUseCorporateCharge(){
        setLoadStatus(LoadStatus.LOADING);
        if(!corporate)return;
        Report_getBalanceChangedReport({id:corporate?.Id,DayCount:30}).then(result => {
            if(result?.data?.Data?.length > 0){
                SetDataToChart(result.data.Data);
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


    function SetDataToChart(data){
        const categories = data.map((d) => new Date(d.Date).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }));
        const values = data.map((d) => d.Amount);
        const values2 = data.map((d) => d.LatestBalance+d.Amount);

        setOption({
            title: {
                left: "center",
            },
            tooltip: {},
            brush: {
                toolbox: [],
                xAxisIndex: 0,
            },
            theme:{mode:mode},
            toolbox: false,
            xAxis: {
                type: "category",
                data: categories,
            },
            yAxis: {},
            series: [
                {
                    type: "bar",
                    data: values,
                },
                {
                    type: "line",
                    data: values2,
                },
            ],
        });
    }

    return (<>
            <BaseReportBox title={"تغییرات ماهانه شارژ شرکت"} loadStatus={loadStatus} ReloadData={()=>{getUseCorporateCharge()}} >
                {option && (
                    <ReactEcharts
                        option={option}
                        style={{ height: "400px", width: "100%" }}
                    />
                )}
            </BaseReportBox>
    </>
    );
};

export default _RFinanceReport;
