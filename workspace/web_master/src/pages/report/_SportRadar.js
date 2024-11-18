import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {Card, CardContent, CardHeader} from "@mui/material";

const data = [
    {
        subject: 'بدنسازی',
        count: 80,
        B: 110,
        fullMark: 80,
    },
    {
        subject: 'trx',
        count: 15,
        B: 130,
        fullMark: 80,
    },
    {
        subject: 'ایروبیک',
        count: 33,
        B: 130,
        fullMark: 80,
    },
    {
        subject: 'استخر',
        count: 41,
        B: 100,
        fullMark: 80,
    },
    {
        subject: 'پیلاتس',
        count: 39,
        B: 90,
        fullMark: 80,
    },
    {
        subject: 'تکواندو',
        count: 10,
        B: 85,
        fullMark: 80,
    },
];

export default function _SportRadar() {

        return (
            <Card sx={
                {borderRadius: 3,
                    margin:1
                }
            } elevation={3}>
                <CardHeader title={"گستره ورزشی"}/>
                <CardContent>

                    <ResponsiveContainer width="100%" aspect={1}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 80]} />
                            <Radar  dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        );

}
