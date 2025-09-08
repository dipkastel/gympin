import React, {useContext, useEffect, useState} from 'react';
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer} from 'recharts';
import BaseReportBox, {LoadStatus} from "./BaseReportBox";
import {Report_getPopularSports} from "../../network/api/report.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import Grid from "@mui/material/Grid2";


export default function _SportRadar({corporate}) {

    const error = useContext(ErrorContext);
    const [loadStatus, setLoadStatus] = useState(LoadStatus.LOADING);
    const [data, setData] = useState([]);

    useEffect(() => {
        getPopularSports()
    }, []);

    function getPopularSports() {

        setLoadStatus(LoadStatus.LOADING);
        if (!corporate) return;
        Report_getPopularSports({id: corporate?.Id}).then(result => {
            var sportsCount = [];
            for(var item in result.data.Data){
                sportsCount.push(
                    {
                        subject: result.data.Data[item].SportName,
                        count: result.data.Data[item].SportCount,
                        B: result.data.Data[item].SportCount,
                        fullMark: result.data.Data[item].SportCount,
                    })
            }
            setData(sportsCount);
            setLoadStatus(LoadStatus.LOADED);

        })
            .catch(e => {
                try {
                    setLoadStatus(LoadStatus.ERROR);
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    return (

        <BaseReportBox title={"گستره ورزشی شش ماهه"} loadStatus={loadStatus} ReloadData={getPopularSports}>
            <Grid sx={{alignContent:"center",justifyItems:"center",width:"100%"}}>
                <ResponsiveContainer width="60%" aspect={1}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="subject"/>
                        <PolarRadiusAxis angle={360/(data?.length)} domain={[0,Math.max(...data.map(r=>r.SportCount))]}/>
                        <Radar dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart>
                </ResponsiveContainer>
            </Grid>
        </BaseReportBox>
    );

}
