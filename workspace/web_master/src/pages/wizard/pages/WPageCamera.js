import React, {useEffect, useState} from 'react';
import {Alert, Button, Grid, Typography} from "@mui/material";
import {Figure} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../helper/utils";

const WPageCamera = ({onNext}) => {
    const [cameraAccess, setCameraAccess] = useState("")
    const [tempAccess, setTempAccess] = useState(false)
    const [InVideo, setInVideo] = useState(document.createElement('video'));
    const [isIos, setIsIos] = useState(false);


    useEffect(() => {
        try {
            navigator.permissions.query({name: 'camera'})
                .then((permissionObj) => {
                    var permission = permissionObj.state;
                    setCameraAccess(permission);
                })
                .catch((error) => {
                    setCameraAccess("denied");
                });

        } catch (e) {
            setIsIos(true)
            setCameraAccess("prompt");
        }
    }, [tempAccess]);


    function getAccessToCamera() {
        navigator.mediaDevices?.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        }).then(result => {
            setTempAccess(result.active);
        }).catch(e => {
            setTempAccess("result.active");
        })

    }

    return (
        <>
            {cameraAccess == "prompt" && <>
                <Grid sx={{p: 2,pb:0}}>
                    <Typography variant={"subtitle1"}>
                        در بخش های مختلف این اپلیکیشن نیاز است از دوربین تلفن همراه استفاده شود.
                    </Typography>
                </Grid>
                <Figure.Image
                    width={"100%"}
                    alt="finish intro"
                    src={toAbsoluteUrl("/assets/images/qr1.png")}
                />


                <Grid sx={{p: 2,pt:0}}>
                    <Typography variant={"body2"}>
                        مثلا : برای اسکن بلیط کاربران
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        لطفا دسترسی اپلیکیشن به دوربین را تایید فرمایید.
                    </Typography>
                    <Figure.Image
                        width={"100%"}
                        alt="finish intro"
                        src={toAbsoluteUrl("/assets/images/allertCamera.png")}
                    />

                    <Button sx={{mt: 3}} onClick={(e) => getAccessToCamera()} fullWidth variant={"contained"}
                            color={"primary"}>دریافت
                        دسترسی</Button>
                </Grid>


            </>}

            {cameraAccess == "granted" &&
            <Grid sx={{p: 2}}>
                <Alert severity="success" sx={{px: 1}}>
                    <Typography variant={"body1"} sx={{px: 1}}>{"دسترسی دریافت شد ."}</Typography>
                </Alert>
            </Grid>}
            {cameraAccess == "denied" &&<>
                <Grid sx={{p: 2}}>
                    <Alert severity="error" sx={{px: 1}}>
                        <Typography variant={"body1"} sx={{px: 1}}>{"دسترسی داده نشد"}</Typography>
                        <Typography variant={"body1"} sx={{px: 1}}>لطفا از قسمت تنظیمات دسترسی به دوربین را فعال
                            نمایید</Typography>

                    </Alert>
                    <Typography variant={"body1"} sx={{p: 1}}>مراحل فعالسازی :
                    </Typography>
                    <Typography variant={"body1"} sx={{p: 1}}>مرحله اول
                    </Typography>
                </Grid>
                    <Figure.Image
                        width={"100%"}
                        alt="finish intro"
                        src={toAbsoluteUrl("/assets/images/privacyC.png")}
                    />
                <Grid sx={{p: 2}}>
                    <Typography variant={"body1"} sx={{px: 1}}>مرحله دوم
                    </Typography>
                </Grid>
                    <Figure.Image
                        width={"100%"}
                        alt="finish intro"
                        src={toAbsoluteUrl("/assets/images/allertcameraper.png")}
                    />
                <Grid sx={{p: 2}}>
                    <Typography variant={"body1"} sx={{px: 1}}>مرحله آخر
                    </Typography>
                </Grid>
                    <Figure.Image
                        width={"100%"}
                        alt="finish intro"
                        src={toAbsoluteUrl("/assets/images/allertCameraPer3.png")}
                    />

            </>
            }
            <Grid sx={{p: 2}}>
                <Button onClick={(e) => onNext()} disabled={!((cameraAccess === "granted") || isIos)} fullWidth
                        variant={"contained"} color={"primary"}>بعدی</Button>
            </Grid>
        </>
    );
};

export default WPageCamera;
