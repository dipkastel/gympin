import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import Hall from "../../halls/singleHall/Hall";

const WPageHallTimes = ({onNext,hallParamId}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    return (
        <div>
            <Hall hallParamId={hallParamId}  introCanGoNext={setIntroCanGoNext} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext}  fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>

    );
};

export default WPageHallTimes;
