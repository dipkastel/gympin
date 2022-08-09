import React, {useEffect, useRef, useState} from 'react';
import {Card, CardContent, CardHeader, Slider} from "@mui/material";

export default function PlaceTrafic() {
    const [val,SetVal] = useState([0,50])
    const [colors,setColor] = useState(["primary","secondary"]);
    const [update,setUpdate] = useState(0);
    function valuetext(_value) {
        switch (Math.floor(_value/34)) {
            case 0:return "خلوت";
            case 1:return "معمولی";
            case 2:return "شلوغ";
            default:return "نامشخص";
        }
    }

    const getColor=(name)=> {
        switch (Math.floor(val[name]/31)) {
            case 0:return "success";
            case 1:return "secondary";
            case 2:return "warning";
            default:return "primary";
        }

    }

    const setStatus=(name,e)=> {
        val[name] = e.value;
        SetVal(val)
        colors[name]= getColor(name)
        setColor(colors)
        setUpdate(value => value + 1);
    }

    function submitTrafic(value) {
        // console.log("todo trafic send to server : "+value)
    }

    return (
        <Card sx={{
            margin:1
        }} elevation={3}>
            <CardHeader
                sx={{
                    backgroundColor:"primary"
                }}
                title="ترافیک مجموعه"
            />
            <CardContent>
                استخر
                <Slider
                    defaultValue={val[0]}
                    valueLabelDisplay={"on"}
                    step={10}
                    min={10}
                    color={colors[0]}
                    marks
                    aria-labelledby="non-linear-slider"
                    onChange={(e)=>{setStatus(0,e.target)}}
                    onChangeCommitted={(event,value)=>{submitTrafic(value)}}
                    valueLabelFormat={valuetext}
                />
                بدنسازی
                <Slider
                    defaultValue={val[1]}
                    valueLabelDisplay={"on"}
                    step={10}
                    min={10}
                    color={colors[1]}
                    marks
                    aria-labelledby="non-linear-slider"
                    onChange={(e)=>{setStatus(1,e.target)}}
                    onChangeCommitted={(event,value)=>{submitTrafic(value)}}
                    valueLabelFormat={valuetext}
                />
            </CardContent>
        </Card>
    );
};
