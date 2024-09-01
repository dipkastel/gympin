import React from 'react';
import {Grid} from "@mui/material";
import _DashNotes from "../partials/_DashNotes";
import _DashSupport from "../partials/_DashSupport";
import _DashTicketBeneficiary from "../partials/_DashTicketBeneficiary";
import _DashSettelment from "../partials/_DashSettelment";
import _DashIncreaseCorporate from "../partials/_DashIncreaseCorporate";
import _DashIncreaseUser from "../partials/_DashIncreaseUser";

const DashTasksTab = ({updatePage}) => {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <_DashNotes/>
                </Grid>
                <Grid item xs={3}>
                    <_DashSupport/>
                </Grid>
                <Grid item xs={3}>
                    <_DashTicketBeneficiary/>
                </Grid>
                <Grid item xs={3}>
                    <_DashSettelment/>
                </Grid>
                <Grid item xs={3}>
                    <_DashIncreaseCorporate/>
                </Grid>
                <Grid item xs={3}>
                    <_DashIncreaseUser/>
                </Grid>
            </Grid>
        </>
    );
};

export default DashTasksTab;
