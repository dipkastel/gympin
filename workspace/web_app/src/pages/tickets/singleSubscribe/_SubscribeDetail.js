import React, {useContext, useEffect, useState} from 'react';
import {Alert, Card, CardContent, CardHeader, Collapse, Divider, Grid, IconButton, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {dayOfWeekEnum} from "../../../helper/enums/dayOfWeekEnum";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {ticketSubscribe_getActiveTimesByTicketSubscribe} from "../../../network/api/ticketSubscribe.api";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const _SubscribeDetail = ({subscribe}) => {
    const error = useContext(ErrorContext);
    const [timing, setTiming] = useState(null)
    const [openTiming, setOpenTiming] = useState(false)
    const  [openDescription,SetOpenDescription]  = useState(false);
    useEffect(() => {
        console.log(subscribe)
        getTiming(subscribe);
    }, [subscribe]);

    function getTiming(subscribe) {
        ticketSubscribe_getActiveTimesByTicketSubscribe({ticketSubscribeId:subscribe.TicketSubscribe.Id}).then(result=>{
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
            {subscribe && <Card elevation={3} sx={{margin: 1}}>
                <CardHeader title={subscribe.Name}/>
                <CardContent sx={{paddingY: 0}}>
                    <Grid
                        container
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Grid>
                            <Typography sx={{paddingY: 0.5}}
                                        variant={"subtitle1"}>{"مجموعه ورزشی " + subscribe?.TicketSubscribe?.Place?.Name}</Typography>
                        </Grid>
                        <IconButton hidden={(!subscribe.Description)} aria-label="openDescription" color="info" onClick={()=>SetOpenDescription(!openDescription)}>
                            <HelpOutlineIcon/>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Grid>
                            <Typography sx={{paddingY: 0.5}}
                                        variant={"subtitle1"}>{toPriceWithComma(subscribe.Price) + " تومان برای " + subscribe.EntryTotalCount + " ورود"}</Typography>
                        </Grid>
                        <IconButton onClick={() => setOpenTiming(!openTiming)} color={"info"}>
                            <HistoryToggleOffIcon/>
                        </IconButton>
                    </Grid>
                    <Typography sx={{paddingY: 0.5}} variant={"subtitle1"}>
                        {"اعتبار عضویت تا " + new Date(subscribe.ExpireDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</Typography>
                    <Collapse in={openDescription} timeout="auto" sx={{my:1}} unmountOnExit>
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
                                        variant={"subtitle1"}>{subscribe.Timing}</Typography>
                            {/*{timing && timing.map(item => (*/}
                            {/*    <Typography width={"100%"} key={item.Id} sx={{pr: 1, m: 1}} color={"gray"}*/}
                            {/*                variant={"subtitle2"}>*/}
                            {/*        {item.Hall.Name + " " + " " + dayOfWeekEnum[item.DayOfWeek] + " از " +*/}
                            {/*        item?.OpeningTime.substring(0, 5) + " تا " +*/}
                            {/*        item?.ClosingTime.substring(0, 5) + " "}*/}
                            {/*    </Typography>*/}
                            {/*))}*/}
                        </Grid>
                    </Collapse>

                </CardContent>

            </Card>}

        </div>
    );
};

export default _SubscribeDetail;
