import React, {PureComponent} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {Card, CardContent, CardHeader} from "@mui/material";

const data = [
    {
        month: 'اردیبهشت',
        users: 80.400000,
        corporate: 48.000000,
        uses: 30.000000,
    },
    {
        month: 'خرداد',
        users: 90.400000,
        corporate: 48.000000,
        uses: 39.000000,
    },
    {
        month: 'تیر',
        users: 162.400000,
        corporate: 58.000000,
        uses: 45.000000,
    },
    {
        month: 'مرداد',
        users: 192.400000,
        corporate: 58.000000,
        uses: 51.000000,
    },
    {
        month: 'شهریور',
        users: 212.400000,
        corporate: 68.000000,
        uses: 60.000000,
    },
    {
        name: 'مهر',
        users: 232.400000,
        corporate: 95.000000,
        uses: 89.000000,
    },
    {
        month: 'آبان',
        users: 240.400000,
        corporate: 95.000000,
        uses: 93.000000,
    },
];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/stacked-area-chart-ix341';

    render() {
        return (

            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"نمودار"}
                />
                <CardContent>

                    <ResponsiveContainer width="100%" aspect={3}>
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="month"/>
                            <YAxis dataKey="users"/>
                            <Tooltip/>
                            <Area type="monotone" name="شارژ مجموعه" dataKey="corporate" stackId="2" stroke="#8884d8" fill="#8884d8"/>
                            <Area type="monotone" name={"شارژ کاربران"} dataKey="users" stackId="3" stroke="#82ca9d" fill="#82ca9d"/>
                            <Area type="monotone" name={"استفاده شده"} dataKey="uses" stackId="4" stroke="#ffc658" fill="#ffc658"/>
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        );
    }
}
