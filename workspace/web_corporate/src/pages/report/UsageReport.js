import React from 'react';
import Grid from "@mui/material/Grid2";
import {Container, Typography} from "@mui/material";
import _RPeakUsageTimes from "./Usage/_RPeakUsageTimes";
import _RPopularPlaces from "./Usage/_RPopularPlaces";
import _RPopularSports from "./Usage/_RPopularSports";
import _RTicketBySport from "./Usage/_RTicketBySport";
import _RUsageByUser from "./Usage/_RUsageByUser";

const UsageReport = () => {
    return (
        <Container>
            <title>گزارشات استفاده</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>گزارشات استفاده</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
            </Grid>
            <Grid container columns={2} alignItems={"start"}>
                <Grid size={{xs:2,md: 2, lg: 1, xl: 1}}>
                    <_RPeakUsageTimes />
                    <_RPopularPlaces />
                    <_RPopularSports />
                </Grid>
                <Grid size={{xs:2,md: 2, lg: 1, xl: 1}}>
                    <_RTicketBySport />
                    <_RUsageByUser />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsageReport;
