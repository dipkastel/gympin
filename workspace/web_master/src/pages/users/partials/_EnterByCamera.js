import React, {useEffect, useRef, useState} from 'react';
import jsQR from 'jsqr';
import {Card, CardHeader, Grid, Paper, Typography} from "@mui/material";
import {ErrorOutline, QuestionMarkTwoTone} from "@mui/icons-material";

const _EnterByCamera = ({onFind, scannWork}) => {
    const {requestAnimationFrame} = global;
    const cameraStatusTypeEnum = {
        permisionDenied: "permisionDenied",
        active: "active",
        loading: "loading",
        disabled: "disabled",
        error: "error"
    };
    const [InVideo, setInVideo] = useState(document.createElement('video'));
    const [cameraStatus, setCameraStatus] = useState(cameraStatusTypeEnum.loading);
    const [randomNnumber, setRandomNumber] = useState(0);
    const [canvasContext, setCanvasContext] = useState(null);
    const [isUp,setIsUp] = useState(true);
    const convas = useRef(null);

    const cameraStatusEnum = {
        permisionDenied: <>permisionDenied</>,
        active: <></>,
        loading: <><Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}
                         sx={{width: "100%", height: "250px"}}>
            <progress></progress>

        </Grid></>,
        disabled: <>disabled</>,
        error: <><Typography sx={{width:"100%",p:1,direction:"rtl"}} variant={"subtitle1"}>{"خطا در اتصال به دوربین"}</Typography><br/> </>
    };

    useEffect(() => {
        (scannWork) ? InVideo.pause() : InVideo.play();
    }, [scannWork]);

    useEffect(() => {
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
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsUp(true);
            } else {
                setIsUp(false);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        requestAnimationFrame(tick);
    }, [randomNnumber]);

    function tick() {
        if(!isUp) return ;
        return new Promise((resolve) => {
            if (InVideo.readyState === InVideo.HAVE_ENOUGH_DATA && canvasContext) {
                if (cameraStatus != cameraStatusTypeEnum.active ) {
                    resolve(setCameraStatus(status => cameraStatusTypeEnum.active));
                }

                convas.current.height = InVideo.videoHeight;
                convas.current.width = InVideo.videoWidth;
                canvasContext.drawImage(InVideo, 0, 0, convas.current.width, convas.current.height);
                var imageData = canvasContext.getImageData(0, 0, convas.current.width, convas.current.height);

                var code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: 'dontInvert'});
                if (code) {
                    onFind(code.data);
                }

            } else {
                requestAnimationFrame(tick);
            }
        });
    }


    return (<>

        <Card variant={"outlined"}>
            <CardHeader
                title={"ثبت ورود با اسکن بلیط"}
                action={<ErrorOutline/>}
            />
            <Paper elevation={0} sx={{
                borderRadius: 3,
                margin: 2
            }}>
                {cameraStatusEnum[cameraStatus]}
                <Grid sx={{height: cameraStatus != cameraStatusTypeEnum.active ? "0px" : "100%"}}>
                    <canvas ref={convas} id="qrCanvas"/>
                </Grid>
            </Paper>
        </Card>


    </>);
};

export default _EnterByCamera;
