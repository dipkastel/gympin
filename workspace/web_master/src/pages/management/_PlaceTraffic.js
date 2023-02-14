import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Slider} from "@mui/material";
import {useSelector} from "react-redux";
import {GatesTraffic_addAll, GatesTraffic_getByGate} from "../../network/api/gatesTraffic.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

export default function PlaceTrafic() {
    const error = useContext(ErrorContext);
    const gates = useSelector(({place}) => place.gates)
    const [gateTafic,SetGateTrafic] = useState([])

    useEffect(() => {
        getTraffics()
    }, [gates]);

    function getTraffics() {
        if(!gates)return;
        var traffic = [];
        var requestCount = 0;
        var gatesForTraffic = gates.filter(g=>g.TrafficManagement==true);
        gatesForTraffic.map(gate=>{
            GatesTraffic_getByGate({id:gate.Id}).then(result=>{
                traffic.push({gate:gate,traffic:result.data.Data})
                requestCount++;
                if(requestCount==gatesForTraffic.length){
                    SetGateTrafic(traffic)
                }
            }).catch(e=>{
                requestCount++;
                if(requestCount==gatesForTraffic.length){
                    SetGateTrafic(traffic)
                }
                console.log(e)
            })
        })
    }

    function valuetext(_value) {
        switch (Math.floor(_value/34)) {
            case 0:return "خلوت";
            case 1:return "معمولی";
            case 2:return "شلوغ";
            default:return "نامشخص";
        }
    }

    const getColor=(traffic)=> {
        switch (Math.floor(traffic/31)) {
            case 0:return "success";
            case 1:return "secondary";
            case 2:return "warning";
            default:return "primary";
        }

    }

    const setStatus=(item,e)=> {
        SetGateTrafic([...gateTafic.filter(t=>t.gate.Id!==item.gate.Id),{...item,traffic:{...item.Traffic,Traffic:e.value}}])
    }

    function submitTrafic(item,value) {
        GatesTraffic_addAll({
            Gate:{Id:item.gate.Id},
            traffic:value
        }).then(result=>{
            getTraffics();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        });
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
                {gateTafic&&gateTafic.sort((a,b)=> a.gate.Id-b.gate.Id).map((item,number)=>(<div key={number}>
                    {item.gate.Name}
                    <Slider
                        value={item.traffic?(item.traffic.Traffic||50):50}
                        valueLabelDisplay={"on"}
                        step={10}
                        min={0}
                        color={getColor(item.traffic?(item.traffic.Traffic||50):50)}
                        marks
                        aria-labelledby="non-linear-slider"
                        onChange={(e)=>{setStatus(item,e.target)}}
                        onChangeCommitted={(event,value)=>{submitTrafic(item,value)}}
                        valueLabelFormat={valuetext}
                    />
                </div>))}
            </CardContent>
        </Card>
    );
};
