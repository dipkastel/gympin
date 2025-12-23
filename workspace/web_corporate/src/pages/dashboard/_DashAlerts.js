import React, {useContext, useEffect, useState} from 'react';
import {invoice_query} from "../../network/api/invoice.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {Button, Card, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {ArrowLeft, NotificationImportant, NotificationsActive} from "@mui/icons-material";
import {useNavigate} from "react-router";

const _DashAlerts = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [invoiceToPays, SetInvoiceToPays] = useState(null);
    const [invoicePlaces, SetInvoicePlaces] = useState(null);
    const corporate = useSelector(({corporate}) => corporate.corporate)

    const [notificationPermission, SetNotificationPermission] = useState("granted");
    useEffect(() => {
        try{
            SetNotificationPermission(Notification?.permission);
        }catch (e) {}
    }, []);


    useEffect(() => {
        getInvoiceToPay()
    }, [corporate]);


    function getInvoiceToPay() {
        if (!corporate) return;
        invoice_query({
            queryType: "FILTER",
            Corporate: corporate.Id,
            Status: "NEED_TO_PAY",
            paging: {
                Page: 0,
                Size: 10,
                Desc: true
            }
        })
            .then((result) => {
                SetInvoiceToPays(result.data.Data);
                const caterings = [];
                for (var item in result.data.Data.content) {
                    if (!caterings.some(o => o.Id == result?.data?.Data?.content[item]?.InvoiceBuyables[0]?.Place.Id))
                        caterings.push(result?.data?.Data?.content[item]?.InvoiceBuyables[0]?.Place)
                }
                SetInvoicePlaces(caterings);

            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }


    function requestForPermission(e) {
        e.preventDefault();
        try{
            Notification?.requestPermission().then(result=>{
                SetNotificationPermission(result);
                if(result=="granted"){
                    window.location = "/";
                }
            });
        }catch (e) { }
    }

    return (
        <>
            {/*{invoiceToPays && invoiceToPays?.totalElements > 0 &&*/}
            {/*<Grid sx={{mx: 2, mt: 2}}>*/}
            {/*    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>*/}
            {/*        <Grid container direction={"column"}>*/}
            {/*            <Grid container direction={"row"}>*/}
            {/*                <NotificationImportant/>*/}
            {/*                <Typography sx={{px: 1}}>{"شما " + invoiceToPays?.totalElements + " رسید آماده پرداخت دارید"}</Typography>*/}
            {/*            </Grid>*/}
            {/*            {invoicePlaces.map(item => (*/}
            {/*                <Grid sx={{cursor: "pointer", pl: 2, pt: 1}} onClick={(e => {*/}
            {/*                    navigate("/food/needToPay/" + item.Id)*/}
            {/*                })} container direction={"row"}>*/}
            {/*                    <ArrowLeft/>*/}
            {/*                    <Typography variant={"body2"} sx={{px: 1}}>{"پیگیری و پرداخت سفارشات " + item?.Name}</Typography>*/}
            {/*                </Grid>))}*/}

            {/*        </Grid>*/}
            {/*        {invoiceToPays?.totalElement > 10 && <Typography sx={{px: 1}}>{"و..."}</Typography>}*/}
            {/*    </Card>*/}
            {/*</Grid>}*/}
            {notificationPermission!="granted"&&<Grid sx={{mx: 2, mt: 2}}>
                <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                    <Grid container justifyContent={"space-between"} direction={"row"}>
                        <Grid container direction={"row"}>
                            <NotificationsActive color={"warning"}/>
                            <Typography sx={{px: 1}}>با فعال سازی اعلان ها از آخرین تغییرات و جدید ترین خدمات اپسا مطلع شوید.</Typography>
                        </Grid>
                        <Grid >
                            <Button variant={"outlined"} onClick={(e)=>requestForPermission(e)} >فعالسازی</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>}

        </>
    );
};

export default _DashAlerts;
