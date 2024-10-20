import React, {useEffect, useState} from 'react';
import {Alert, Chip, CircularProgress, Grid} from "@mui/material";
import {getStringOfTime} from "../../../helper/utils";

const _UseExpire = ({subscribe,getSubscribe,setUserCanEnter}) => {
    const [startTimer, setStartTimer] = useState(new Date());
    const [timerText, setTimerText] = useState(null);



    useEffect(() => {
        if(subscribe.UseExpire) return ;
        let changeTimer = setInterval(function () {
            let distance =new Date(subscribe?.UseExpireDate).getTime()-new Date().getTime();
            if(distance<0){
                getSubscribe();
                clearInterval(changeTimer);
                setUserCanEnter(false);
            }
            else{
                var hour =Math.floor((distance ) / (1000 * 60 * 60));
                var minutes =Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds =Math.floor((distance % (1000 * 60)) / 1000);
                setTimerText(getStringOfTime(hour) +" : "+getStringOfTime(minutes)+" : "+getStringOfTime(seconds));
            }
        }, 1000)
        setStartTimer(new Date());
        return () => {
            clearInterval(changeTimer);
        };
    }, []);

    if (subscribe.UseExpire == null ) return (<></>)

    return (
        <>
            {subscribe?.UseExpire&&<Alert sx={{m:1,borderRadius:3}} variant={"outlined"} severity={"error"}>مهلت استفاده از بلیط به پایان رسیده</Alert> }
            {!subscribe?.UseExpire&&<Alert sx={{m:1}} variant={"outlined"} severity={"info"}>
                {"مهلت استفاده ( اولین ورود ) :"}
                {timerText?<Chip sx={{fontSize:30,p:3,width:"100%",direction:"ltr",mt:1}} label={timerText} variant={"filled"} color={"info"} size={"medium"} />:<><br/><CircularProgress size={"2rem"} color={"info"}/></>}
            </Alert> }
        </>
    );
};

export default _UseExpire;
