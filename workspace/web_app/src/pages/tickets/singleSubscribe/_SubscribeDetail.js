import React, {useContext, useEffect, useState} from 'react';
import {Alert, Card, CardContent, Collapse, Divider, Grid, IconButton, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {ticketSubscribe_getActiveTimesByTicketSubscribe} from "../../../network/api/ticketSubscribe.api";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const _SubscribeDetail = ({subscribe}) => {

    const error = useContext(ErrorContext);
    const [timing, setTiming] = useState(null)
    const [openTiming, setOpenTiming] = useState(false)
    const [openDescription, SetOpenDescription] = useState(false);
    useEffect(() => {
        console.log(subscribe)
        getTiming(subscribe);
    }, [subscribe]);

    function getTiming(subscribe) {
        ticketSubscribe_getActiveTimesByTicketSubscribe({ticketSubscribeId: subscribe.TicketSubscribe.Id}).then(result => {
            setTiming(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <div>
            {subscribe && <>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardContent >
                        <Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"مجموعه ورزشی : "}</Typography>
                            <Typography variant={"subtitle1"}>{subscribe?.TicketSubscribe?.Place?.Name}</Typography>
                        </Grid>
                        <Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"اعتبار : "}</Typography>
                            <Typography variant={"subtitle1"}>{new Date(subscribe?.TicketSubscribeExpireDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            })}</Typography>
                        </Grid>
                        <Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"تعداد ورود : "}</Typography>
                            <Typography variant={"subtitle1"}>{subscribe?.EntryTotalCount}</Typography>
                        </Grid>
                        <Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"رهگیری پرداخت : "}</Typography>
                            <Typography variant={"subtitle1"}>{subscribe?.Serial?.filter(ss=>ss?.ProcessType==="TRA_CHECKOUT_BASKET")[0]?.Serial?.split('-')[0]}</Typography>
                        </Grid>
                        {subscribe.Description&&<Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"توضیحات : "}</Typography>
                            <IconButton aria-label="openDescription" color="info"
                                        onClick={() => SetOpenDescription(!openDescription)}>
                                <HelpOutlineIcon/>
                            </IconButton>
                        </Grid>}
                        {subscribe?.Timing&&<Grid
                            container
                            sx={{width: "100%"}}
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Grid>
                                <Typography sx={{color: "#858585"}} variant={"body2"}>{"زمان استفاده : "}</Typography>
                            </Grid>
                            <IconButton onClick={() => setOpenTiming(!openTiming)} color={"info"}>
                                <HistoryToggleOffIcon/>
                            </IconButton>
                        </Grid>}
                        <Collapse in={openDescription} timeout="auto" sx={{my: 1}} unmountOnExit>
                            <Alert severity="info">
                                {subscribe.Description}
                            </Alert>
                        </Collapse>
                        <Collapse in={openTiming} timeout="auto" unmountOnExit>
                            <Divider variant="inset" sx={{mx: 0, my: 1}} component="div"/>
                            <Grid
                                container
                                sx={{width: "100%"}}
                                direction="row"
                                justifyContent={"right"}
                                alignItems={"center"}
                            >
                                <Typography width={"100%"} sx={{paddingY: 0.5}} color={"gray"}
                                            variant={"subtitle1"}>{subscribe?.Timing}</Typography>
                            </Grid>
                        </Collapse>

                    </CardContent>

                </Card>


            </>}

        </div>
    );
};

export default _SubscribeDetail;
