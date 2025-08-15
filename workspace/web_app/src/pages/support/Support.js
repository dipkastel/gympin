import React from 'react';
import {Container, Grid2 as Grid, Typography} from "@mui/material";
import _SupportNew from "./_SupportNew";
import _SupportInfo from "./_SupportInfo";
import _SupportList from "./_SupportList";

const Support = () => {

    return (
        <>

            <Container>
                <title>درخواست‌های پشتیبانی</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid size={{xs: 6, md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>پشتیبانی</Typography></Grid>
                    <Grid textAlign={"end"} size={{xs: 3, md: 3, lg: 3, xl: 3}}>
                        <_SupportNew/>
                    </Grid>
                </Grid>

                <Grid container direction={"row"} columns={12} spacing={2}>
                    <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                        <_SupportInfo />
                    </Grid>
                    <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                        <_SupportList />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Support;
