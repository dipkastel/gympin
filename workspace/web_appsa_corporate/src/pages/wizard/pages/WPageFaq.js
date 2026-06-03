import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";

const WPageFaq = ({onNext}) => {
    return (
        <Grid container>
            <Grid item sx={{p:2}} xs={12} md={12}>
                <Button fullWidth variant={"contained"} onClick={(e)=>onNext()} > مرحله بعد </Button>
            </Grid>
        </Grid>
    );
};

export default WPageFaq;
