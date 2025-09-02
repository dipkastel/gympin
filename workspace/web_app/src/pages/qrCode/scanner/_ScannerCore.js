import React, {useCallback, useEffect, useRef, useState} from "react";
import jsQR from "jsqr";
import {Grid2 as Grid, Typography} from "@mui/material";
import _ByCode from "./_ByCode";



export default function _ScannerCore({ onFind, scannWork, actionOnScan }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [cameraStatus, setCameraStatus] = useState("loading");

    useEffect(() => {
        const video = document.createElement("video");
        video.setAttribute("playsinline", true); // iOS fix
        videoRef.current = video;

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then((stream) => {
                video.srcObject = stream;
                video.play();

                const canvas = canvasRef.current;
                ctxRef.current = canvas.getContext("2d", { willReadFrequently: true });

                setCameraStatus("active");
                requestAnimationFrame(tick); // start loop
            })
            .catch(() => setCameraStatus("error"));

        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                if (videoRef.current.srcObject) {
                    videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
                }
            }
        };
    }, []);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                videoRef.current?.pause();
            } else {
                videoRef.current?.play();
                requestAnimationFrame(tick);
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    useEffect(() => {
        if (scannWork) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
            requestAnimationFrame(tick);
        }
    }, [scannWork]);

    function tick() {
        try {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = ctxRef.current;

            if (video && video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
                if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "attemptBoth",
                });

                if (code) {
                    const data = actionOnScan ? actionOnScan(code.data) : code.data;
                    onFind(data);
                }
            }

        }catch (e){}
        requestAnimationFrame(tick);
    }

    return (
        <>
            {cameraStatus === "loading" && (
                <Grid container justifyContent="center" alignItems="center" sx={{ width: "100%", height: "250px" }}>
                    <progress />
                </Grid>
            )}
            {cameraStatus === "error" && (
                <Typography sx={{ width: "100%", p: 1, direction: "rtl" }} variant="subtitle1">
                    خطا در اتصال به دوربین
                </Typography>
            )}
            <Grid hidden={cameraStatus !== "active"} sx={{ direction: "ltr", mb: 4 }}>
                <canvas ref={canvasRef} id="qrCanvas" />
            </Grid>
            <_ByCode setCode={onFind} />
        </>
    );
}
