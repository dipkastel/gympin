import React, {useEffect} from "react";
import {Grid} from "@mui/material";
import _OurTraffic from "./_OurTraffic";
import _Income from "./_Income";
import _SportRadar from "./_SportRadar";
import _GenderEnter from "./_GenderEnter";
import _GenderIncome from "./_GenderIncome";
import _IncomeSport from "./_IncomeSport";

export default function Report() {

    useEffect(() => {
        document.title = 'گزارشات';
    }, []);


    return (
        <>
            <_OurTraffic/>
            <_Income/>
            <_SportRadar/>

            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <_GenderEnter/>
                </Grid>
                <Grid item xs={6}>
                    <_GenderIncome/>
                </Grid>
            </Grid>
            <_IncomeSport/>
        </>
    );
}
