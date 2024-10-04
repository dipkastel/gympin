import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import QRCode from "react-qr-code";
import {qrCode_getCode} from "../../../network/api/qrCode.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _QRcode = ({ticket,userCanEnter,type}) => {

    let lock = false;
    let respite = 2;
    const error = useContext(ErrorContext);
    const [code, SetCode] = useState(null);
    const [startTimer, setStartTimer] = useState(new Date());
    const [timerText, setTimerText] = useState(null);

    useEffect(() => {
        if(!code) return ;
        let changeTimer = setInterval(function () {
            let distance =new Date().getTime()- startTimer.getTime() ;

            console.log("start Time" ,new Date().getTime(), startTimer.getTime(),distance,Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) )
            var minutes =respite-1-Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds =60-Math.floor((distance % (1000 * 60)) / 1000);
            setTimerText(seconds+" : "+minutes);
        }, 1000)
        return () => {
            clearInterval(changeTimer);
        };
    }, [code]);


    useEffect(() => {
        getCodeOfSubscribe();
        let changeQrInterval = setInterval(function () {
            getCodeOfSubscribe();
        }, respite * 60 * 1000)

        return () => {
            clearInterval(changeQrInterval);
        };
    }, []);



    function getCodeOfSubscribe() {
        if(lock)return;
        lock = true;
        qrCode_getCode({
            Type:type,
            ReferenceId:ticket.Id,
            Description:ticket.Key,
        }).then(result => {
            lock =false;
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


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <Grid
                        container
                        direction={"column"}
                        justifyContent="center"
                        alignItems="center">
                        {code?.QrCode ?
                            <>
                                <QRCode className={"qrCode"} value={code.QrCode}/>
                                <Typography variant={"h1"} sx={{margin: 1}}>{code.QrCode}</Typography>
                            </> :
                                <CircularProgress/>

                        }
                    </Grid>
                </CardContent>
                {timerText}
            </Card>
        </>
    )
};

export default _QRcode;
