import React, {useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Sport from "../../sports/Sports";

const WPageSports = ({onNext}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    return (
        <div>

            <Grid sx={{p:2}}>
                <Typography variant={"subtitle1"}>
                    لطفا ورزش هایی که در مرکز شما انجام می‌شود را انتخاب کنید.
                </Typography>
            </Grid>
            <Sport introCanGoNext={setIntroCanGoNext} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext} fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageSports;
