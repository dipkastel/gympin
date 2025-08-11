import React, { PureComponent } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "@mui/material";

const data = [
  {
    month: "اردیبهشت",
    users: 80.4,
    catering: 48.0,
    uses: 30.0,
  },
  {
    month: "خرداد",
    users: 90.4,
    catering: 48.0,
    uses: 39.0,
  },
  {
    month: "تیر",
    users: 162.4,
    catering: 58.0,
    uses: 45.0,
  },
  {
    month: "مرداد",
    users: 192.4,
    catering: 58.0,
    uses: 51.0,
  },
  {
    month: "شهریور",
    users: 212.4,
    catering: 68.0,
    uses: 60.0,
  },
  {
    name: "مهر",
    users: 232.4,
    catering: 95.0,
    uses: 89.0,
  },
  {
    month: "آبان",
    users: 240.4,
    catering: 95.0,
    uses: 93.0,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/stacked-area-chart-ix341";

  render() {
    return (
      <Card elevation={3} sx={{ margin: 1 }}>
        <CardHeader title={"نمودار"} />
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis dataKey="users" />
              <Tooltip />
              <Area
                type="monotone"
                name="شارژ مجموعه"
                dataKey="catering"
                stackId="2"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                name={"شارژ کاربران"}
                dataKey="users"
                stackId="3"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                name={"استفاده شده"}
                dataKey="uses"
                stackId="4"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }
}
