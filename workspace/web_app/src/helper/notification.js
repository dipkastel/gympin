import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../components/GympinPagesProvider";
import {Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getLastNotif, getLastNotifId} from "./pocket";

function GNotification() {
    const States = {
        denied: 1,
        granted: 2,
        default: 3,
        notWorking: 4,
    }

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [render, setRender] = useState(false);
    const [state, setState] = useState(States.default);
    const [showedNotifId, SetShowedNotifId] = useState(getLastNotifId())


    useEffect(() => {
        const interval = setInterval(async () => {
            if (showedNotifId !== getLastNotifId()) {
                    const newNotif1 = new Notification(getLastNotif());
                    SetShowedNotifId(getLastNotifId());
                    clearInterval(interval);
            }
        }, 16 * 1000);
        return () => clearInterval(interval);
    }, [showedNotifId])


    function init() {
        try {
            if (render) return;
            setRender(true);
            if (!("Notification" in window)) {
                setState(States.notWorking);
            } else if (Notification.permission === "granted") {
                setState(States.granted);
            } else if (Notification.permission !== "denied") {
                setState(States.default);
                setTimeout(() => {
                    setOpenModal(true);
                }, 1000 * 12);
            } else {
                setState(States.denied);
                console.log(Notification.permission);
            }
        } catch (ex) {
            setState(States.denied);
            console.log("Notification error");

        }
    }

    function requestForNotificationPermission(e) {
        e.preventDefault()
        setOpenModal(false);
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                // const notif = new Notification("دم شما گرم.");
                setState(States.granted);
            } else {
                error.showError({
                    clickable: true,
                    message: 'شما فعالسازی اعلان ها را رد کردید',
                    buttonTitle: 'فعال سازی',
                    duration: 8000,
                    onClick: () => {
                        console.log(result)
                        if (result === States.default)
                            requestForNotificationPermission(e);
                        else
                            alert("نوتیفیکیشن ها را از منوی کناری آدرس سایت ↸ در مرورگر فعال یا ریست کنید");
                    }
                });
            }
        })
    }

    function popup() {
        return (<>
            {/*{(state === States.notWorking) &&*/}
            {/*<Alert severity="error">*/}
            {/*    <AlertTitle>مرورگر شما از بعضی امکانات جیم پین پشتیبانی نمیکند !</AlertTitle>*/}
            {/*    برای استفاده از همه امکانات جیم پین، پیشنهاد میشود از <strong> آخرین ورژن گوگل کروم </strong>استفاده*/}
            {/*    نمایید .*/}
            {/*</Alert>}*/}
            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>اعلان</DialogTitle>
                <DialogContent>
                    <Typography variant={"subtitle1"}>اطلاع رسانی های جیم پین از طریق اعلان ها اتفاق می
                        افتند</Typography>
                    <Typography variant={"body2"}>ورزش های جدید</Typography>
                    <Typography variant={"body2"}>تخفیف ها</Typography>
                    <Typography variant={"body2"}>افزایش و کاهش اعتبار شما</Typography>
                    <Typography variant={"body2"}>پیام های مجموعه ها برای شما</Typography>
                    <Typography variant={"body2"}>و....</Typography>
                    <Typography variant={"subtitle1"}>برای از دست ندادن همه اینها دسترسی به اعلان ها را فعال
                        نمایید</Typography>
                </DialogContent>
                <DialogActions>
                    <Button fullWidth variant={"contained"} color={"primary"}
                            onClick={(e) => requestForNotificationPermission(e)}>باشه</Button>
                </DialogActions>
            </Dialog>
            {init()}
        </>)
    }

    return (
        <>
            {/*{popup()}*/}
        </>
    )
};

export default GNotification;
