import React from 'react';
import {Grid} from "@mui/material";
import _reportSettings from "../modules/_reportSettings";

const ReportSystemTab = ({updatePage}) => {
    return (
        <Grid container columns={12} spacing={2}>
            <Grid size={12}>
                <_reportSettings/>
            </Grid>
            <Grid size={6}>
            </Grid>
            <Grid size={6}>
            </Grid>
        </Grid>

    );
};

export default ReportSystemTab;
