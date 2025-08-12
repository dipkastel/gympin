import React, {useEffect, useRef, useState} from 'react';
import jsQR from 'jsqr';
import {Grid, IconButton, Typography} from "@mui/material";
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import _ByCode from "./_ByCode";


export default function _ScannerCore({onFind, scannWork}) {
    const cameraStatusEnum = {
        permisionDenied: <>permisionDenied</>,
        active: <></>,
        loading: <><Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}
                         sx={{width: "100%", height: "250px"}}>
            <progress></progress>
        </Grid></>,
        disabled: <>disabled</>,
        byCode: <>
            <_ByCode setCode={onFind} toCamera={() => setCameraStatus(cameraStatusTypeEnum.loading)}/>
        </>,
        error: <><Typography sx={{width: "100%", p: 1, direction: "rtl"}}
                             variant={"subtitle1"}>{"خطا در اتصال به دوربین"}</Typography><br/> </>
    };

    const cameraStatusTypeEnum = {
        permisionDenied: "permisionDenied",
        active: "active",
        loading: "loading",
        disabled: "disabled",
        byCode: "byCode",
        error: "error"
    };

    const {
        requestAnimationFrame
    } = global;

    const [InVideo, setInVideo] = useState(document.createElement('video'));
    const [cameraStatus, setCameraStatus] = useState(cameraStatusTypeEnum.loading);
    const [randomNnumber, setRandomNumber] = useState(0);
    const [canvasContext, setCanvasContext] = useState(null);
    const convas = useRef(null);


    useEffect(() => {
        if (cameraStatus == cameraStatusTypeEnum.byCode) return;
        navigator.mediaDevices?.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        }).then(function (stream) {
            InVideo.srcObject = stream;
            InVideo.setAttribute('playsinline', true);
            InVideo.play();
            setInVideo(InVideo);
            setCanvasContext(convas.current.getContext('2d', {willReadFrequently: true}))
            requestAnimationFrame(tick);
        });

        if (!navigator.mediaDevices) {
            setCameraStatus(cameraStatusTypeEnum.error)
        }

        return () => {
            InVideo.pause();
        }

    }, [cameraStatus]);


    useEffect(() => {
        var interval = setInterval(() => setRandomNumber(Math.random()), 125);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        requestAnimationFrame(tick);
    }, [randomNnumber]);


    function tick() {

        return new Promise((resolve) => {
            if (InVideo.readyState === InVideo.HAVE_ENOUGH_DATA && canvasContext) {
                if (cameraStatus != cameraStatusTypeEnum.active && cameraStatus != cameraStatusTypeEnum.byCode) {
                    resolve(setCameraStatus(status => cameraStatusTypeEnum.active));
                }

                convas.current.height = InVideo.videoHeight;
                convas.current.width = InVideo.videoWidth;
                canvasContext.drawImage(InVideo, 0, 0, convas.current.width, convas.current.height);
                var imageData = canvasContext.getImageData(0, 0, convas.current.width, convas.current.height);

                var code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: 'attemptBoth'});
                if (code) {
                    onFind(code.data);
                }

            } else {
                requestAnimationFrame(tick);
            }
        });
    }


    // useEffect(() => {
    //     if(loading) return;
    //     setMessage(!enabled?React.createElement("div", null, React.createElement("span", {
    //         role: "img",
    //         "aria-label": "camera"
    //     }, ""), failedToLoadCamera()):null);
    // }, [enabled,loading]);

    // useEffect(() => {
    //     setMessage(loading?React.createElement("div", null, React.createElement("span", {
    //         role: "img",
    //         "aria-label": "time"
    //     }, ""), loadCamera()):null);
    // }, [loading]);

    useEffect(() => {

        (scannWork) ? InVideo.pause() : InVideo.play();
    }, [scannWork]);

    return (
        <>
            {cameraStatusEnum[cameraStatus]}
            <Grid hidden={cameraStatus != cameraStatusTypeEnum.active} sx={{direction: "ltr", mb: 4}}>
                <canvas ref={convas} id="qrCanvas"/>
            </Grid>
            {!(cameraStatus == cameraStatusTypeEnum.byCode) && <Grid sx={{bottom: "50px", right: "10px", position: "absolute"}}>
                <IconButton onClick={(e) => {
                    setCameraStatus(cameraStatusTypeEnum.byCode)
                }} sx={{backgroundColor: "#ffffff"}} color={"default"}>
                    <KeyboardHideIcon/>
                </IconButton>
            </Grid>}
        </>
    );
}
