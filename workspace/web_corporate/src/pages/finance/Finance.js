import React, {useEffect} from "react";
import _Wallet from "./_Wallet";
import _TotalCredits from "./_TotalCredits";
import _CorporatePlan from "./_CorporatePlan";
import {Button, Container, Grid2 as Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router";


export default function Finance() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'مالی';
    }, []);

    return (
        <Container maxWidth>

            <title>صورت وضعیت</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>صورت وضعیت</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}><Button onClick={() => navigate("/finance/increaseCharge", { replace: true })} variant={"contained"}>افزایش شارژ</Button> </Grid>
            </Grid>

            <_Wallet/>
            <_TotalCredits/>
            <_CorporatePlan/>
            {/*<_FinanaceReport/>*/}
        </Container>
    );
}
