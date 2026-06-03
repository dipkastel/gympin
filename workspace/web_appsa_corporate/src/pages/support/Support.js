import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {Button, Card, CardHeader, Chip, Container, Grid2 as Grid, Link, List, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Support_query} from "../../network/api/support.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {SupportStatus} from "../../helper/enums/SupportStatus";
import {Image} from "react-bootstrap";
import _SupportNew from "./_SupportNew";
import _SupportInfo from "./_SupportInfo";
import _SupportList from "./_SupportList";

const Support = () => {

    return (
        <>

            <Container>
                <title>درخواست‌های پشتیبانی</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid size={{xs:6,md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>پشتیبانی</Typography></Grid>
                    <Grid textAlign={"end"} size={{xs:3,md: 3, lg: 3, xl: 3}}><_SupportNew /> </Grid>
                </Grid>

                <Grid container direction={"row"} columns={12} spacing={2}>
                    <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                        <_SupportInfo />
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                        <_SupportList />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Support;
