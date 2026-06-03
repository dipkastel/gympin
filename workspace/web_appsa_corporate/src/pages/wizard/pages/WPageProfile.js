import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import EditProfile from "../../editProfile/EditProfile";

const WPageProfile = ({onNext}) => {

    const [introCanGoNext,setIntroCanGoNext] = useState(false);

    return (
        <Grid container>
            <EditProfile introCanGoNext={setIntroCanGoNext}/>
            <Grid item sx={{p:2}} xs={12} md={12}>
                <Button fullWidth variant={"contained"} disabled={!introCanGoNext} onClick={(e)=>onNext()} color={"primary"}> مرحله بعد </Button>
            </Grid>
        </Grid>
    );
};

export default WPageProfile;
