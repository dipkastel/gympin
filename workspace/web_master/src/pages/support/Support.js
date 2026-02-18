import React from "react";
import {Card, Container, Grid2 as Grid, Typography} from "@mui/material";
import _SupportNew from "./_SupportNew";
import _SupportInfo from "./_SupportInfo";
import _SupportList from "./_SupportList";
import SupportIcon from '@mui/icons-material/Support';

const Support = () => {
    return (
        <>

            <Container>
                <title>درخواست‌های پشتیبانی</title>
                <Grid container direction={"column"}>
                    <Grid sx={{p: 2}}>
                        <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                            <Grid container justifyContent={"space-between"}>
                                <Grid container direction={"row"}>
                                    <SupportIcon/>
                                    <Typography sx={{px: 1}}>{"پشتیبانی"}</Typography>
                                </Grid>
                                <Grid>
                                    <_SupportNew/>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid container columns={2} alignItems={"start"} sx={{p: 1}}>
                        <Grid sx={{p: 1}} size={{xs: 2, md: 1, lg: 1, xl: 1}}>
                            <_SupportInfo/>
                        </Grid>
                        <Grid sx={{p: 1}} size={{xs: 2, md: 1, lg: 1, xl: 1}}>
                            <_SupportList/>
                        </Grid>
                    </Grid>
                    <Grid size={{xs: 2, md: 2, lg: 2, xl: 2}}>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Support;
