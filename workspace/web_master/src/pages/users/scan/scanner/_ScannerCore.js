import React, {Component, useEffect, useState} from 'react';
import jsQR from 'jsqr';
import {Card, Grid} from "@mui/material";


export default function _ScannerCore({onFind,scannWork}){

    const {
        requestAnimationFrame
    } = global;

    const InVideo = document.createElement('video');
    const [enabled,setEnabled] = useState(false);
    const [loading,setLoading] = useState(true);
    const [message,setMessage] = useState(null);

    useEffect(() => {

        let canvasElement = document.getElementById('qrCanvas');
        let canvas = canvasElement.getContext('2d');
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        }).then(function (stream) {
            InVideo.srcObject = stream;
            InVideo.setAttribute('playsinline', true);
            InVideo.play();
            requestAnimationFrame(tick);
        });

        const tick = () => {

            if (!enabled) setEnabled(true)
            if (InVideo.readyState === InVideo.HAVE_ENOUGH_DATA) {
                if (loading) setLoading(false);
                canvasElement.height = InVideo.videoHeight;
                canvasElement.width = InVideo.videoWidth;
                canvas.drawImage(InVideo, 0, 0, canvasElement.width, canvasElement.height);
                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert'
                });

                if (code) {
                    onFind(code.data);
                }
            }

            requestAnimationFrame(tick);
        };

        return()=>{
            InVideo.pause();
        }

    }, []);
    function loadCamera(){
        return (<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}  sx={{width:"100%",height:"250px"}}>
            <progress></progress>

        </Grid>)
    }

    function failedToLoadCamera(){
        return (<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}  sx={{width:"100%",height:"250px"}}>
            <h5>
                خطا در اتصال به دوربین (لطفا سلامت دوربین دستگاه خود را بررسی نمایید)
            </h5>

        </Grid>)
    }

    useEffect(() => {
        setMessage(enabled?React.createElement("div", null, React.createElement("span", {
            role: "img",
            "aria-label": "camera"
        }, ""), failedToLoadCamera()):null);
    }, [enabled,loading]);

    useEffect(() => {
        setMessage(loading?React.createElement("div", null, React.createElement("span", {
            role: "img",
            "aria-label": "time"
        }, ""), loadCamera()):null);
    }, [loading]);

    useEffect(() => {
        (scannWork)?InVideo.pause():InVideo.play();
    }, [scannWork]);

    return (
        <Card elevation={3} sx={{
            margin: 2,
        }}>
            {React.createElement("div", null, message, React.createElement("canvas", {
                id: "qrCanvas"
            }))}
        </Card>
    );
}
