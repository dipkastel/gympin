import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import EditCorporate from "../../corporateDetail/EditCorporate";
import {useSelector} from "react-redux";

const WPageCorporateDetails = ({onNext}) => {

    const [introCanGoNext,setIntroCanGoNext] = useState(false);

    const corporate = useSelector(({corporate}) => corporate.corporate);
    useEffect(() => {
        if (corporate?.Status !== "PREREGISTER")
            window.location = "/";
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <EditCorporate introCanGoNext={setIntroCanGoNext} />
            </Grid>
            <Grid item sx={{p:2}} xs={12} md={12}>
                <Button fullWidth variant={"contained"} disabled={!introCanGoNext} onClick={(e)=>onNext()} color={"primary"}> مرحله بعد </Button>
            </Grid>
        </Grid>
    );
};

export default WPageCorporateDetails;
