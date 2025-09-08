import React from 'react';
import {Button, Card, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _RActiveUsers from "./General/_RActiveUsers";
import {BarChart} from "@mui/icons-material";
import {useSelector} from "react-redux";
import GympinMaleFemaleCompare from "./GympinMaleFemaleCompare";
import _SportRadar from "./_SportRadar";
import _RActiveEnterPlaceUsers from "./Sport/_RActiveEnterPlaceUsers";
import _RChargeUsage from "./Finance/_RChargeUsage";

const GeneralReport = () => {


    const corporate = useSelector(({corporate}) => corporate.corporate)

    return (
        <Container>
            <title>گزارشات ورزشی</title>
            <Grid sx={{mx: 2, mt: 2}}>
                <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                    <Grid container direction={"row"}>
                        <BarChart/>
                        <Typography sx={{px: 1}}>{"گزارشات ورزشی"}</Typography>
                    </Grid>
                </Card>
            </Grid>
            <Grid container columns={2} alignItems={"start"}>
                <Grid size={{xs:2,md: 2, lg: 2, xl: 2}}>
                    <_RChargeUsage />
                </Grid>
                <Grid size={{xs:2,md: 2, lg: 1, xl: 1}}>
                    <GympinMaleFemaleCompare corporate={corporate} />
                    <_RActiveUsers corporate={corporate} />
                </Grid>
                <Grid size={{xs:2,md: 2, lg: 1, xl: 1}}>
                    <_SportRadar corporate={corporate} />
                    <_RActiveEnterPlaceUsers corporate={corporate} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default GeneralReport;
