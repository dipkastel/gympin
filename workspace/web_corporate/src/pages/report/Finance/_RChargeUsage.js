import React, {useContext, useEffect, useState} from 'react';
import BaseReportBox, {LoadStatus} from "../BaseReportBox";
import {BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import Chart from "react-apexcharts";
import {useColorScheme} from "@mui/material";
import {Report_useCorporateCharge} from "../../../network/api/report.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../../../helper/utils";

const _RChargeUsage = () => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const {mode, setMode} = useColorScheme();
    const [loadStatus,setLoadStatus] = useState(LoadStatus.LOADING);
    const [ddata,setDData] = useState([]);


    useEffect(() => {
        getUseCorporateCharge();
    }, [corporate]);

    if (!mode) {
        return null;
    }

    function getUseCorporateCharge(){
        setLoadStatus(LoadStatus.LOADING);
        if(!corporate)return;
        Report_useCorporateCharge({id:corporate?.Id}).then(result => {
            if(result?.data?.Data?.Amounts?.length > 0){
                setDData(result.data.Data);
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
        name: 'استفاده از شارژ',
        data: ddata.Amounts
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
            categories: ddata.MonthNames,
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
            labels: {
                show: false,
                formatter: function (val) {
                    return toPriceWithComma(val) + ' تومان';
                },
            }

        }
    }

    return (<>
            <BaseReportBox title={"میزان استفاده از شارژ سازمان "} loadStatus={loadStatus} ReloadData={()=>{getUseCorporateCharge()}} >

                {/*<ResponsiveContainer width="103%" aspect={6}>*/}
                {/*    <BarChart*/}
                {/*        width={500}*/}
                {/*        height={200}*/}
                {/*        data={data}*/}
                {/*        margin={{*/}
                {/*            top: 10,*/}
                {/*            right: 30,*/}
                {/*            left: 0,*/}
                {/*            bottom: 0,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <CartesianGrid stroke="none"/>*/}
                {/*        <XAxis dataKey="month"/>*/}
                {/*        <YAxis dataKey="deposit"/>*/}
                {/*        <Tooltip/>*/}
                {/*        <Bar type="monotone" name="شارژ استفاده شده (ملیون تومان)" dataKey="deposit" stackId="0"*/}
                {/*             stroke="#e7333e"*/}
                {/*             fill="#e7333e"/>*/}
                {/*    </BarChart>*/}
                {/*</ResponsiveContainer>*/}
                <Chart options={Roptions} series={Rseries}  type="bar" height={350} />
            </BaseReportBox>
    </>
    );
};

export default _RChargeUsage;
