import React from 'react';
import {Box, Card, Typography} from "@mui/material";
import {SvgColor} from "./SvgColor";
import {TrendingDown, TrendingUp} from "@mui/icons-material";
import ApexChart from 'react-apexcharts';

const AnalyticsBox = ({
                          icon,
                          title,
                          total,
                          chart,
                          percent,
                          color = 'primary',
                          sx,
                          chartOptions,
                          onClick,
                          ...other
                      }) => {

    var optionss = {
        chart: {
            type: 'line',
            toolbar: {show: false},
            axisAligned: false,
            zoom: {
                enabled: false,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 1,
        },
        grid: {
            yaxis: {lines: {show: false}}
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: {
            labels: {
                show: false,
            }
        }


    }

    return (
        <>
            <Card sx={{m: 2, p: 3, bgcolor: `${color}.boxBg`, borderRadius: 4, position: "relative"}} onClick={onClick}>

                <Box sx={{width: 48, height: 48, mb: 3}}>{icon}</Box>

                <SvgColor
                    src="/assets/images/bg/shape-square.svg"
                    sx={{
                        top: 0,
                        left: -20,
                        width: 240,
                        zIndex: 0,
                        height: 240,
                        opacity: 0.24,
                        position: 'absolute',
                        color: `${color}.main`,
                    }}
                />
                {!!percent && <Box
                    sx={{
                        top: 16,
                        gap: 0.5,
                        right: 16,
                        display: 'flex',
                        position: 'absolute',
                        alignItems: 'center',
                    }}
                >

                    {percent < 0 ? <TrendingDown color={"error"}/> : <TrendingUp color={"success"}/>}
                    <Box component="span" sx={{typography: 'subtitle2', color: (percent > 0) ? "#3c8d2f" : "#931911"}}>
                        <Typography variant={"caption"}>{percent}</Typography>
                        {percent > 0 && '+'}

                    </Box>
                </Box>}

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Box sx={{flexGrow: 1, minWidth: 112}}>
                        <Box sx={{my: 1, typography: 'subtitle2'}}>{title}</Box>
                        <Box sx={{typography: 'h4'}}>{total}</Box>
                    </Box>
                    {chart && <Chart
                        type="line"
                        series={[{data: chart.series}]}
                        options={{...optionss, ...chartOptions}}
                        width={100}
                        height={65}
                    />}
                </Box>
            </Card>
        </>
    );
};

export function Chart({
                          sx,
                          type,
                          series,
                          height,
                          options,
                          className,
                          width = '100%',
                          ...other
                      }) {
    return (
        <Box
            dir="ltr"
            className={className}
            sx={{
                width,
                height,
                flexShrink: 0,
                borderRadius: 1.5,
                position: 'relative',
                ...sx,
            }}
            {...other}
        >
            <ApexChart type={"line"} series={series} options={options} width="100%" height="100%"/>
        </Box>
    );
}

export default AnalyticsBox;
