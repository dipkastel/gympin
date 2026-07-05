import React from 'react';
import {Grid} from "@mui/material";
import _SellsByMonthChart from "../modules/_SellsByMonthChart";
import _UseByMonthChart from "../modules/_UseByMonthChart";
import _ViewsMap from "../modules/_ViewsMap";

const ReportViewTab = () => {
    return (
        <Grid container columns={12} spacing={2}>
            <Grid size={12}>
                <_ViewsMap />
            </Grid>
            <Grid size={6}>
            </Grid>
            <Grid size={6}>
            </Grid>
        </Grid>

    );
};

export default ReportViewTab;
