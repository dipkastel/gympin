import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {Card, CardContent, CardHeader} from "@mui/material";
const data01 = [
    { name: 'بدنسازی', value: 3450000 , color:"#9197f8" },
    { name: 'تکواندو', value: 2420000,color:"#fd88d5" },
    { name: 'پیلاتس', value: 1420000,color:"#c488fd" },
    { name: 'استخر', value: 2820000,color:"#579187" },
    { name: 'ایروبیک', value: 420000,color:"#706b3d" },
    { name: 'trx', value: 1420000,color:"#fd8888" },
];
const _IncomeSport = () => {

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.8;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {data01[index].name}
            </text>
        );
    };
    return (
        <Card elevation={3} sx={{borderRadius: 3,margin:1}}>
            <CardHeader
                title={"درآمد"}
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
                            outerRadius={140}
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

export default _IncomeSport;
