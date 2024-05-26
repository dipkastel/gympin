import React, {useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Option from "../../options/Option";

const WPageOptions = ({onNext}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    return (
        <div>

            <Grid sx={{p:2}}>
                <Typography variant={"subtitle1"}>
                    لطفا امکانات مرکز را انتخاب کنید.
                </Typography>
                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                    اگر مرکز شما دارای امکاناتی است که در لیست وجود ندارد بعدا از طریق تیکت به ما اعلام کنید تا امکانات مورد نظر شما به این لیست اضافه شود.
                </Typography>
            </Grid>
            <Option  introCanGoNext={setIntroCanGoNext} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext} fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageOptions;
