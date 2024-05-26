import React, {useEffect, useState} from 'react';
import {Alert, Button, Grid, Typography} from "@mui/material";

const WPageCamera = ({onNext}) => {
    const [cameraAccess, setCameraAccess] = useState("")
    const [tempAccess, setTempAccess] = useState(false)

    useEffect(() => {
        navigator.permissions.query({name: 'camera'})
            .then((permissionObj) => {
                var permission = permissionObj.state;
                setCameraAccess(permission);
            })
            .catch((error) => {
            });
    }, [tempAccess]);


    function getAccessToCamera() {
        navigator.mediaDevices?.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        }).then(result=>{
            setTempAccess(result.active);
        }).catch(e=>{
            setTempAccess("result.active");
        })

    }

    return (
        <>
            {cameraAccess=="prompt" &&
            <Grid sx={{p: 2}}>
                <Typography variant={"subtitle1"}>
                    در بخش های مختلف این اپلیکیشن نیاز است از دوربین تلفن همراه استفاده شود. مثلا:
                </Typography>
                <Typography variant={"subtitle1"}>
                    برای اسکن بلیط کاربران
                </Typography>
                <Typography variant={"subtitle1"}>
                    لطفا دسترسی اپلیکیشن به دوربین را تایید فرمایید.
                </Typography>

                <Button  sx={{mt:3}} onClick={(e) => getAccessToCamera()} fullWidth variant={"contained"} color={"primary"}>دریافت
                    دسترسی</Button>
            </Grid>}

            {cameraAccess=="granted" &&
            <Grid sx={{p: 2}}>
                <Alert severity="success" sx={{px: 1}}>
                    <Typography variant={"body1"} sx={{px: 1}}>{"دسترسی دریافت شد ."}</Typography>
                </Alert>
            </Grid>}
            {cameraAccess=="denied" &&
            <Grid sx={{p: 2}}>
                <Alert severity="error" sx={{px: 1}}>
                    <Typography variant={"body1"} sx={{px: 1}}>{"دسترسی داده نشد"}</Typography>
                </Alert>
            </Grid>}
            <Grid sx={{p: 2}}>
                <Button onClick={(e) => onNext()} disabled={cameraAccess!=="granted"} fullWidth variant={"contained"} color={"primary"}>بعدی</Button>
            </Grid>
        </>
    );
};

export default WPageCamera;
