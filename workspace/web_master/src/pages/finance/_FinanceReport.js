import React, {PureComponent} from 'react';
import {Cell, ResponsiveContainer, Treemap} from 'recharts';
import {Card, CardContent, CardHeader} from "@mui/material";

const data = [
    { name: 'بدنسازی', size: 6084000},
    { name: 'تکواندو', size: 1384000},
    { name: 'پیلاتس', size: 1084000 },
    { name: 'استخر', size: 3884000},
    { name: 'ایروبیک', size: 1584000 },
    { name: 'trx', size: 2584000 },
];

class CustomizedContent extends PureComponent {
    render() {
        const { root, depth, x, y, width, height, index, payload, colors, size, name } = this.props;

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : 'none',
                        stroke: '#fff',
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                    }}
                />
                {depth === 1 ? (
                    <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={12}>
                        {name}
                    </text>
                ) : null}
                {depth === 1 ? (
                    <text x={x + width / 2} y={y + height / 2 + 14} textAnchor="middle" fill="#fff" fontSize={12}>
                        {size}
                    </text>
                ) : null}
            </g>
        );
    }
}

const COLORS = ['#8f4260', '#9597E4', '#2142b0', '#A5D297', '#E2CF45', '#F8C12D'];

class _FinanaceReport extends PureComponent {
    render() {
        return (

            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    title={"درآمد"}
                />
                <CardContent>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <Treemap
                            width={400}
                            height={200}
                            data={data}
                            dataKey="size"
                            ratio={4 / 3}
                            stroke="#fff"
                            fill="#8884d8"
                            content={<CustomizedContent colors={COLORS} />}
                        />
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        );
    }
}


export default _FinanaceReport;
