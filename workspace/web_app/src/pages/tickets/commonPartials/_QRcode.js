import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import QRCode from "react-qr-code";
import {qrCode_getCode} from "../../../network/api/qrCode.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {GympinTheme} from "../../../helper/GympinTheme";
import {getStringOfTime} from "../../../helper/utils";

const _QRcode = ({ticket, userCanEnter, type}) => {

    let lock = false;
    let respite = 2;
    const error = useContext(ErrorContext);
    const [code, SetCode] = useState(null);
    const [startTimer, setStartTimer] = useState(new Date());
    const [timerText, setTimerText] = useState(null);

    useEffect(() => {
        if (!code) return;
        let changeTimer = setInterval(function () {
            let distance = new Date().getTime() - startTimer.getTime();
            var minutes = respite - 1 - Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = 60 - Math.floor((distance % (1000 * 60)) / 1000);
            if((respite*60*1000-distance)<0)
                getCodeOfSubscribe();
            else
                setTimerText(getStringOfTime(seconds) + " : " + getStringOfTime(minutes));
        }, 1000)
        return () => {
            clearInterval(changeTimer);
        };
    }, [code]);


    useEffect(() => {
            getCodeOfSubscribe();
    }, []);


    function getCodeOfSubscribe() {
        if (lock) return;
        lock = true;
        qrCode_getCode({
            Type: type,
            ReferenceId: ticket.Id,
            Description: ticket.Key,
        }).then(result => {
            lock = false;
            setStartTimer(new Date());
            SetCode(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    if (!userCanEnter) return (<></>);
    return (
        <>
            <Card elevation={10} sx={{margin: 3, borderRadius: 3}}>
                <Grid
                    sx={{backgroundColor: GympinTheme.palette.primary.main, color: "white"}}
                    container
                    direction={"column"}
                    justifyContent="center"
                    alignItems="center">
                    {code?.QrCode ? <Typography variant={"h2"} sx={{margin: 1}}>{code.QrCode}</Typography> :
                        <CircularProgress  sx={{p:1}} size={"3rem"} color={"inherit"}/>}
                </Grid>
                <CardContent>
                    <Grid
                        container
                        direction={"column"}
                        justifyContent="center"
                        alignItems="center">
                        {code?.QrCode ? <QRCode className={"qrCode"} value={code.QrCode}/> : <CircularProgress/>}
                    </Grid>
                </CardContent>
                <Grid
                    sx={{backgroundColor: GympinTheme.palette.primary.main, color: "white"}}
                    container
                    direction={"column"}
                    justifyContent="center"
                    alignItems="center">

                    {timerText ? <Typography sx={{p:1}} variant={"h2"}>{timerText}</Typography> : <CircularProgress sx={{p:1}} size={"3rem"} color={"inherit"}/>}

                </Grid>
            </Card>
        </>
    )
};

export default _QRcode;
