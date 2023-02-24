import React, {useContext, useEffect, useRef, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Box, FormControlLabel, Slider, Switch} from "@mui/material";
import "./fixCss.css"
import {gateTraffic_add, gateTraffic_getByGate} from "../../../../../network/api/gateTraffic.api";
import data from "bootstrap/js/src/dom/data";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const GateTrafficManagement = ({gate}) => {
    const error = useContext(ErrorContext);

    const [val,SetVal] = useState(0)
    const [colors,setColor] = useState("secondary");

    useEffect(() => {
        getGateTraffic();
    }, []);
    function getGateTraffic(){
        gateTraffic_getByGate({Id:gate.Id}).then(data=>{
            setStatus(data.data.Data.Traffic)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function valuetext(_value) {
        switch (Math.floor(_value/34)) {
            case 0:return "خلوت";
            case 1:return "معمولی";
            case 2:return "شلوغ";
            default:return "نامشخص";
        }
    }


    function getColor() {
        switch (Math.floor(val/33)) {
            case 0:return "success";
            case 1:return "secondary";
            case 2:return "warning";
            default:return "primary";
        }

    }


    function setStatus(e){
        SetVal(e)
        setColor(getColor())
    }



    function submitTrafic(value) {
        gateTraffic_add({Gate:{Id:gate.Id},Traffic: value}).then(data=>{
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }


    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"ترافیک " + gate.Name}
                />
                <PortletBody>
                    <Slider
                        value={val|| 0}
                        valueLabelDisplay={"on"}
                        step={10}
                        min={10}
                        color={colors}
                        marks
                        aria-labelledby="non-linear-slider"
                        onChange={(e)=>{setStatus(e.target.value)}}
                        onChangeCommitted={(event,value)=>{submitTrafic(value)}}
                        valueLabelFormat={valuetext}
                    />
                </PortletBody>
            </Portlet>
        </>
    );
};

export default GateTrafficManagement;
