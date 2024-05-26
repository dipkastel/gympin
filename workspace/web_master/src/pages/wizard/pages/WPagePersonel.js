import React from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Sport from "../../sports/Sports";
import Personnel from "../../personnel/Personnel";

const WPagePersonel = ({onNext}) => {
    return (
        <div>
            <Personnel />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPagePersonel;
