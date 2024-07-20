import React, {useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Sport from "../../sports/Sports";
import Personnel from "../../personnel/Personnel";
import About from "../../about/About";
import getAccessOf from "../../../helper/accessManager";
import {personnelAccessEnumT} from "../../../helper/enums/personnelAccessEnum";
import _PlaceActivity from "../../management/_PlaceActivity";

const WPageActivation = ({onNext}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    return (
        <div>


            <_PlaceActivity ShowIfActive={true} setIntroCanGoNext={setIntroCanGoNext} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext}  fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageActivation;
