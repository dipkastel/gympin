import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Slider} from "@mui/material";
import "./fixCss.css"
import {hallTraffic_add, hallTraffic_getByHall} from "../../../../../network/api/hallTraffic.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const HallTrafficManagement = ({hall}) => {
    const error = useContext(ErrorContext);

    const [val,SetVal] = useState(0)
    const [colors,setColor] = useState("secondary");

    useEffect(() => {
        getHallTraffic();
    }, []);
    function getHallTraffic(){
        hallTraffic_getByHall({Id:hall.Id}).then(data=>{
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



    function submitTraffic(value) {
        hallTraffic_add({Hall:{Id:hall.Id},Traffic: value}).then(data=>{
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
                    title={"ترافیک " + hall.Name}
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
                        onChangeCommitted={(event,value)=>{submitTraffic(value)}}
                        valueLabelFormat={valuetext}
                    />
                </PortletBody>
            </Portlet>
        </>
    );
};

export default HallTrafficManagement;
