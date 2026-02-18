import React from 'react';
import Grid from "@mui/material/Grid2";
import {Button, Card, Typography} from "@mui/material";
import {NotificationsActive} from "@mui/icons-material";

const __AlertNotifications = ({notificationPermission, SetNotificationPermission}) => {

    function requestForPermission(e) {
        e.preventDefault();
        try {
            Notification?.requestPermission().then((result) => {
                SetNotificationPermission(result);
                if (result == "granted") {
                    window.location = "/";
                }
            });
        } catch (e) {
        }
    }

    return (
        <div>
                <Grid sx={{mx: 2, mt: 2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container justifyContent={"space-between"} direction={"row"}>
                            <Grid container direction={"row"}>
                                <NotificationsActive color={"warning"}/>
                                <Typography sx={{px: 1}}>
                                    با فعال سازی اعلان ها از آخرین تغییرات و جدید ترین خدمات جیم پین
                                    مطلع شوید.
                                </Typography>
                            </Grid>
                            <Grid>
                                <Button
                                    variant={"outlined"}
                                    onClick={(e) => requestForPermission(e)}
                                >
                                    فعالسازی
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
        </div>
    );
};

export default __AlertNotifications;
