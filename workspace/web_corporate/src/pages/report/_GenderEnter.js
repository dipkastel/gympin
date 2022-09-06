import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {Card, CardContent, CardHeader} from "@mui/material";
const data01 = [
    { name: 'آقایان', value: 80 , color:"#9197f8" },
    { name: 'بانوان', value: 50,color:"#fd88d5" },
];
const _GenderEnter = () => {

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {data01[index].name}
            </text>
        );
    };
    return (
        <Card elevation={3} sx={{margin:1}}>
            <CardHeader
                title={"ورود"}
            />
            <CardContent>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie
                            data={data01}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value">
                            {data01.map((entry, index) => (
                                <Cell key={"name"} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default _GenderEnter;
