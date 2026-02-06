import React, {useContext, useEffect, useState} from 'react';
import {Alert, Card, CardContent, Collapse, Divider, Grid, IconButton, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {ticketSubscribe_getActiveTimesByTicketSubscribe} from "../../../network/api/ticketSubscribe.api";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const _SubscribeDetail = ({subscribe}) => {

    const [openTiming, setOpenTiming] = useState(false)
    const [openDescription, SetOpenDescription] = useState(false);

    return (
        <div>
            {subscribe && <>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardContent >
                        <Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"مجموعه : "}</Typography>
                            <Typography variant={"subtitle1"}>{subscribe?.TicketSubscribe?.Place?.Name}</Typography>
                        </Grid>
                        <Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"انقضا : "}</Typography>
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
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"کد رزرو : "}</Typography>
                            <Typography variant={"subtitle1"}>{subscribe?.Serial?.filter(ss=>ss?.ProcessType==="TRA_CHECKOUT_BASKET")[0]?.Serial?.split('-')[0]}</Typography>
                        </Grid>
                        {subscribe.Description&&<Grid container direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{color: "#858585"}} variant={"body2"}>{"توضیحات : "}</Typography>
                            <IconButton sx={{pt:1,pb:0}} aria-label="openDescription" color="info"
                                        onClick={() => SetOpenDescription(!openDescription)}>
                                <HelpOutlineIcon/>
                            </IconButton>
                        </Grid>}
                        <Collapse in={openDescription} timeout="auto" sx={{my: 1}} unmountOnExit>
                            <Alert severity="info">
                                {subscribe.Description}
                            </Alert>
                        </Collapse>
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
                            <IconButton sx={{pt:1,pb:0}} onClick={() => setOpenTiming(!openTiming)} color={"info"}>
                                <HistoryToggleOffIcon/>
                            </IconButton>
                        </Grid>}
                        <Collapse in={openTiming} sx={{my: 1}} timeout="auto" unmountOnExit>
                            <Alert severity="info">
                                {subscribe?.Timing}
                            </Alert>
                        </Collapse>

                    </CardContent>

                </Card>


            </>}

        </div>
    );
};

export default _SubscribeDetail;
