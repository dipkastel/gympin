import React, {useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Option from "../../options/Option";
import Images from "../../images/Images";

const WPageOptions = ({onNext}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    return (
        <div>
            <Images  introCanGoNext={setIntroCanGoNext} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext}  fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageOptions;
