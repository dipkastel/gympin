import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Collapse, Divider, Grid, IconButton, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import {planGatesTiming_getByPlan} from "../../network/api/Plans.api";
import {dayOfWeekEnum} from "../../helper/enums/dayOfWeekEnum";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

const _TicketDetail = ({ticket}) => {
    const [timing,setTiming]= useState(null)
    const [openTiming,setOpenTiming]= useState(false)
    useEffect(() => {
        getTiming(ticket);
    }, [ticket]);

    function getTiming(ticket){
        planGatesTiming_getByPlan({Id:ticket.Plan.Id}).then(result=>{
            setTiming(result.data.Data);
        }).catch(e=>console.log(e));
    }

    return (
        <div>
            {ticket&&<Card elevation={3} sx={{margin:1}}>
                <CardHeader title={ticket.PlanName} />
                    <CardContent sx={{paddingY:0}}>
                        <Grid
                            container
                            sx={{width:"100%"}}
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                        <Grid>
                            <Typography sx={{paddingY:0.5}} variant={"subtitle1"}>{"مجموعه ورزشی "+ticket.Plan.Place.Name}</Typography>
                            <Typography sx={{paddingY:0.5}} variant={"subtitle1"}>{toPriceWithComma(ticket.Price)+" تومان برای "+ticket.EntryTotalCount+" ورود"}</Typography>
                            <Typography sx={{paddingY:0.5}} variant={"subtitle1"}>
                                {"اعتبار بلیط تا "+new Date(ticket.ExpireDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}</Typography>

                        </Grid>
                            <IconButton onClick={()=>setOpenTiming(!openTiming)}   color={"info"}>
                                <HistoryToggleOffIcon />
                            </IconButton>
                        </Grid>
                        <Collapse in={openTiming} timeout="auto" unmountOnExit>
                            <Divider variant="inset" sx={{mx: 0,my:1}} component="div"/>
                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"right"}
                                alignItems={"center"}
                            >

                                <Typography width={"100%"} sx={{paddingY:0.5}} color={"gray"} variant={"subtitle1"}>{"قابل استفاده در :"}</Typography>
                                {timing&&timing.map(item=>(
                                    <Typography width={"100%"} key={item.Id} sx={{pr:1,m:1}} color={"gray"} variant={"subtitle2"}>
                                        {item["gate-timing"].Gate.Name+" "+item["gate-timing"].Name+" "+dayOfWeekEnum[item["gate-timing"]["Day-of-week"]]+" از "+
                                        item["gate-timing"]["Opening-time"].substring(0,5)+" تا "+
                                        item["gate-timing"]["Closing-time"].substring(0,5)+" "}
                                    </Typography>
                                ))}
                            </Grid>
                        </Collapse>
                    </CardContent>

                </Card>}

            </div>
    );
};

export default _TicketDetail;
