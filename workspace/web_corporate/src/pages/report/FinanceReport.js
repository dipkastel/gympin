import React from 'react';
import {Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _RAverageOfUserTickets from "./Finance/_RAverageOfUserTickets";
import _RChargeUsage from "./Finance/_RChargeUsage";
import _RCreditByGroup from "./Finance/_RCreditByGroup";
import _RSumOfUserDiscounts from "./Finance/_RSumOfUserDiscounts";
import _RUsedCreditByGroup from "./Finance/_RUsedCreditByGroup";

const FinanceReport = () => {
    return (
        <Container>
            <title>گزارشات مالی</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>گزارشات مالی</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
            </Grid>
            <Grid container columns={2} alignItems={"start"}>
                <Grid size={{md: 2, lg: 1, xl: 1}}>
                    <_RChargeUsage />
                    <_RCreditByGroup />
                    <_RAverageOfUserTickets />
                </Grid>
                <Grid size={{md: 2, lg: 1, xl: 1}}>
                    <_RSumOfUserDiscounts />
                    <_RUsedCreditByGroup />
                </Grid>
            </Grid>
        </Container>

    );
};

export default FinanceReport;
