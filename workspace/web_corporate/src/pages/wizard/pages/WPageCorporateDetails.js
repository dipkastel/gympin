import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import Settings from "../../settings/Settings";
import EditCorporate from "../../corporateDetail/EditCorporate";

const WPageCorporateDetails = ({onNext}) => {

    const [introCanGoNext,setIntroCanGoNext] = useState(false);

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
