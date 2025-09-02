import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, CircularProgress, Grid2 as Grid, Typography} from "@mui/material";
import {getStringOfTime} from "../../../helper/utils";

const _UseExpire = ({subscribe, getSubscribe}) => {
    const [timerText, setTimerText] = useState(null);
    const [hour, sethour] = useState(0);


    useEffect(() => {
        if (subscribe.UseExpire) return;
        let changeTimer = setInterval(function () {
            let distance = new Date(subscribe?.UseExpireDate).getTime() - new Date().getTime();
            if (distance < 0) {
                getSubscribe();
                clearInterval(changeTimer);
            } else {
                var hours = Math.floor((distance) / (1000 * 60 * 60));
                sethour(hours);
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimerText(getStringOfTime(seconds) + " : " + getStringOfTime(minutes) + " : " + getStringOfTime(hours));
            }
        }, 1000)

        return () => {
            clearInterval(changeTimer);
        };
    }, []);

    if (subscribe.UseExpire == null) return (<></>)

    return subscribe?.UseExpire ?
        (<Grid><Alert sx={{m: 1, borderRadius: 3}} variant={"outlined"} severity={"error"}>مهلت استفاده از بلیط به پایان رسیده</Alert></Grid>) :
        (<Grid sx={{p: 1,minHeight:150}}>
            <Card sx={{
                py: 3,
                mt: 2,
                minHeight:140,
                textAlign: "center"
            }}>

                {timerText ? <Grid sx={{px:1}}>
                    <Typography variant={"h5"} >{"مهلت استفاده تا اولین ورود  "}</Typography>
                    <Button variant={"outlined"} fullWidth sx={{py:1,minHeight:"45px",mt:1,fontSize:20}} >{timerText}</Button>
                </Grid> : <Grid sx={{px:1,py:2}}><CircularProgress size={"2rem"} color={"info"}/></Grid>}
            </Card>

        </Grid>);
};

export default _UseExpire;
