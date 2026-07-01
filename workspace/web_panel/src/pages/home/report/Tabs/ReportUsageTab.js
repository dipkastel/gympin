import React from 'react';
import {Grid} from "@mui/material";
import _SellsByMonthChart from "../modules/_SellsByMonthChart";
import _UseByMonthChart from "../modules/_UseByMonthChart";

const ReportUsageTab = () => {
    return (
        <Grid container columns={12} spacing={2}>
            <Grid size={12}>
                <_SellsByMonthChart/>
                <_UseByMonthChart/>
            </Grid>
            <Grid size={6}>
            </Grid>
            <Grid size={6}>
            </Grid>
        </Grid>

    );
};

export default ReportUsageTab;
