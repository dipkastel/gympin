import React from 'react';
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import {Card, CardContent, CardHeader} from "@mui/material";

export default function _Income() {
    var data = [];
    for (var i = 1; i < 27; i++) {
        var current = {
            entery: Math.floor(Math.random() * 160000+80000),
            date: new Date().setDate(new Date().getDate() - (30-i))
        }
        data.push(current);
    }
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
            title="درآمد"
            sx={{
            }}
            />
            <CardContent>
                <ResponsiveContainer width="103%" aspect={3}>
                    <LineChart
                        data={data}
                    >
                        <XAxis dataKey={(item) => {
                            return new Date(item.date).toLocaleDateString('fa-IR', {month: 'long', day: 'numeric'})
                        }}/>
                        <YAxis/>
                        <Line type="monotone" dataKey="entery" stroke="#088008" activeDot={{r: 8}}/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
