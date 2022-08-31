import React from "react";
import _ListItem from "../../components/_ListItem";
import _OurTraffic from "../report/_OurTraffic";
import _SportRadar from "../report/_SportRadar";


export default function Management() {
    return (
        <>
            <_ListItem title="مشخصات سازمان" destination="/management/details"/>
            <_OurTraffic/>
            <_SportRadar/>
        </>
    );
}
