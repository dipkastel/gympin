import React, {useContext, useEffect, useState} from 'react';
import {CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import QRCode from "react-qrcode-logo";
import {qrCode_getCode} from "../../../network/api/qrCode.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {getStringOfTime} from "../../../helper/utils";

const _QRcode = ({ticket, type}) => {

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
            if ((respite * 60 * 1000 - distance) < 0)
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

    return (
        <>
            <CardContent>
                <Grid
                    container
                    direction={"column"}
                    justifyContent="center"
                    alignItems="center">
                    {code?.QrCode ?
                        <Grid sx={{borderTop:"2px solid",borderBottom:"2px solid", my:3,borderImage:"linear-gradient(to right, #ddd 15%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, #ddd 85%) 1" }}>
                        <Grid sx={{borderLeft:"2px solid",borderRight:"2px solid",borderImage:"linear-gradient(to bottom, #ddd 15%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, #ddd 85%) 1" }}>
                        <QRCode value={code?.QrCode}
                                size={250}
                                qrStyle="dots"
                                eyeRadius={25}
                                quietZone={25}
                                eyeColor="#E7333E"
                                fgColor="#333333"
                                bgColor="#ffffff"
                                logoImage="/assets/images/qrlogo.png"
                                logoWidth={60}
                                logoHeight={60}
                                logoOpacity={1}
                        />
                    </Grid>
                        </Grid>  : <Grid sx={{minHeight:300}} alignContent={"center"}><CircularProgress/></Grid>}
                    {code?.QrCode ? <Typography variant={"h2"} sx={{margin: 1}}></Typography> :
                        <CircularProgress sx={{p: 1}} size={"3rem"} color={"inherit"}/>}
                </Grid>
            </CardContent>
            <Grid
                sx={{background: "linear-gradient(90deg, #ff416c, #ff4b2b)", color: "white"}}
                container
                direction={"column"}
                justifyContent="center"
                alignItems="center">
                {timerText ? <><Typography sx={{px: 1, pt: 2}} variant={"h2"}>{code?.QrCode}</Typography><Typography sx={{px: 1, pb: 2}}
                                                                                                                    variant={"h6"}>{timerText}</Typography>  </> :
                    <CircularProgress sx={{p: 1}} size={"3rem"} color={"inherit"}/>}

            </Grid>
        </>
    )
};

export default _QRcode;
