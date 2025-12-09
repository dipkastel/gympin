import React from 'react';
import _DashNotes from "../partials/_DashNotes";
import _DashSupport from "../partials/_DashSupport";
import _DashTicketBeneficiary from "../partials/_DashTicketBeneficiary";
import _DashSettelment from "../partials/_DashSettelment";
import _DashIncreaseCorporate from "../partials/_DashIncreaseCorporate";
import _DashIncreaseUser from "../partials/_DashIncreaseUser";
import _DashUncontractPlaces from "../partials/_DashUnContractPlaces";
import {Grid} from "@mui/material";
import _DashCreditorsPeople from "../partials/_DashCreditorsPeople";

const DashTasksTab = ({updatePage}) => {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item size={{xs:12,md:4}}>
                    <_DashNotes/>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <_DashSupport/>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <_DashTicketBeneficiary/>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <_DashSettelment/>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <_DashIncreaseCorporate/>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <_DashIncreaseUser/>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <_DashUncontractPlaces/>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <_DashCreditorsPeople/>
                </Grid>
            </Grid>
        </>
    );
};

export default DashTasksTab;
