import React from 'react';
import _LatestIncomeChart from "../modules/_LatestIncomeChart";
import _MonthlyIncomeChart from "../modules/_MonthlyIncomeChart";
import {Grid} from "@mui/material";

const ReportFinanceTab = ({updatePage}) => {
    return (
        <Grid container columns={12} spacing={2}>
            <Grid size={12}>
                <_MonthlyIncomeChart/>
                <_LatestIncomeChart/>
            </Grid>
            <Grid size={6}>
            </Grid>
            <Grid size={6}>
            </Grid>
        </Grid>

    );
};

export default ReportFinanceTab;
