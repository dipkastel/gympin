import React, {useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Sport from "../../sports/Sports";
import Personnel from "../../personnel/Personnel";
import About from "../../about/About";

const WPageAbout = ({onNext}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    return (
        <div>
            <About  introCanGoNext={setIntroCanGoNext} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext}  fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageAbout;
