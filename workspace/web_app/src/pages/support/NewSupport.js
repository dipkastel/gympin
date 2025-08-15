import React, {useContext} from 'react';
import {Button, Card, CardContent, Container, Grid2 as Grid, TextField, Typography} from "@mui/material";
import {Support_add} from "../../network/api/support.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import _SupportInfo from "./_SupportInfo";
import _SupportNew from "./_SupportNew";

const NewSupport = () => {



    return (
        <>

            <Container>

                <title>درخواست جدید پشتیبانی</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>درخواست جدید پشتیبانی</Typography></Grid>
                    <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
                </Grid>


                <Grid container direction={"row"} columns={12} spacing={2}>
                    <Grid size={6}>
                        <_SupportInfo />
                    </Grid>
                    <Grid size={6}>
                        <_SupportNew />
                    </Grid>
                </Grid>


            </Container>
        </>
    );
};

export default NewSupport;
