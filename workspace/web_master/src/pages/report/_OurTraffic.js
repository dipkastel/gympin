import React from 'react';
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import {Card, CardContent, CardHeader} from "@mui/material";

export default function _OurTraffic() {
    var data = [];
    for (var i = 1; i < 24; i++) {
        var current = {
            entery: (i>6)?(i>18)?Math.floor(Math.random() * 2+8):Math.floor(Math.random() * 4+3):0,
            date: new Date().setHours( i,0,0 )
        }
        data.push(current);
    }
    return (
        <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
            <CardHeader
            title="ترافیک ورودی"
            sx={{
            }}
            />
            <CardContent>
                <ResponsiveContainer width="103%" aspect={3}>
                    <LineChart
                        data={data}
                    >
                        <XAxis dataKey={(item) => {
                            return new Date(item.date).toLocaleTimeString('fa-IR', { hour: 'numeric', minute: 'numeric'})
                        }}/>
                        <YAxis/>
                        <Line type="step" dataKey="entery" fill={"#f00fff"} stroke="#f00fff" activeDot={{r: 8}}/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

