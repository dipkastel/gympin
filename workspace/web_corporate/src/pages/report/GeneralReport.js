import React from 'react';
import {Button, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _RActiveUsers from "./General/_RActiveUsers";
import _RCorporateTicketLocations from "./General/_RCorporateTicketLocations";
import _RGenderUsers from "./General/_RGenderUsers";
import _RUserAges from "./General/_RUserAges";

const GeneralReport = () => {
    return (
        <Container>
            <title>گزارشات عمومی</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>گزارشات عمومی</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
            </Grid>
            <Grid container columns={2} alignItems={"start"}>
                <Grid size={{xs:2,md: 2, lg: 1, xl: 1}}>
                    <_RActiveUsers />
                    <_RCorporateTicketLocations />
                </Grid>
                <Grid size={{xs:2,md: 2, lg: 1, xl: 1}}>
                    <_RGenderUsers />
                    <_RUserAges />
                </Grid>
            </Grid>
        </Container>
    );
};

export default GeneralReport;
