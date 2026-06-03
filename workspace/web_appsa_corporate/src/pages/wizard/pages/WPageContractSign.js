import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import _WizardContract from "../partials/_WizardContract";
import _WizardContractAttachment from "../partials/_WizardContractAttachment";
import {useSelector} from "react-redux";
import _WizardSignContract from "../partials/_WizardSignContract";

const WPageContractSign = ({onNext}) => {


    const [introCanGoNext,setIntroCanGoNext] = useState(false);

    const currentUser = useSelector(state => state.auth.user);
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [contract, SetContract] = useState(JSON.parse(corporate.ContractData));

    useEffect(() => {
        if (corporate?.Status !== "PREREGISTER")
            window.location = "/";
    }, []);

    return (
        <Grid container>
            <_WizardContract corporate={corporate} contract={contract} currentUser={currentUser} />
            <_WizardContractAttachment />
            <_WizardSignContract contract={contract} corporate={corporate} onNext={onNext} />
        </Grid>
    );
};

export default WPageContractSign;
