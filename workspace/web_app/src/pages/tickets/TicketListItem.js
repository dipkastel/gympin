import React, {useEffect, useState} from 'react';
import "./style.css"
import {Divider, Grid2 as Grid, Typography} from "@mui/material";
import {getStringOfTime, replacePersianNumbers, toPriceWithComma} from "../../helper/utils";
import {subscribeStatusEnum} from "../../helper/enums/subscribeStatusEnum";
import {useNavigate} from "react-router-dom";

const TicketListItem = ({item,getSubscribe}) => {

    const [timerText, setTimerText] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(item.UseExpire) return ;
        let changeTimer = setInterval(function () {
            let distance =new Date(item?.UseExpireDate).getTime()-new Date().getTime();
            if(distance<0){
                getSubscribe();
                clearInterval(changeTimer);
            }
            else{
                var hour =Math.floor((distance ) / (1000 * 60 * 60));
                var minutes =Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds =Math.floor((distance % (1000 * 60)) / 1000);
                setTimerText( replacePersianNumbers(getStringOfTime(seconds)+"")+" : "+replacePersianNumbers(getStringOfTime(minutes)+"")+" : "+replacePersianNumbers(getStringOfTime(hour)+""));
            }
        }, 1000)

        return () => {
            clearInterval(changeTimer);
        };
    }, []);



    function TicketLayer(props) {
        return (
            <div className={props.color}>
                <div className="ticket">
                    <div className="widget --flex-column">
                        <div className="tco"></div>
                        <div className="top --flex-column">
                            <div className="deetz --flex-row-j!sb">
                                <div className="label">{props.children}</div>
                            </div>
                        </div>
                        <div className="bco"></div>
                    </div>
                </div>
            </div>

        );
    }


    return (
        <Grid onClick={()=>navigate("/tickets/singleSubscribe/" + item.Key, {replace: false})}>

            <TicketLayer color={"white"}>
                <Grid container direction={"column"} >
                    <Grid sx={{mx:5}} container direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"h5"}>{item.Name}</Typography>
                    </Grid>
                    <Divider variant={"middle"} sx={{my:2,borderStyle:"dashed"}} component="div"/>
                    <Grid sx={{mx:5,mt:1}} container direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"subtitle2"} sx={{color:"#888888"}} >مجموعه ورزشی</Typography>
                        <Typography variant={"body1"}>{item?.TicketSubscribe?.Place?.Name}</Typography>
                    </Grid>
                    <Grid sx={{mx:5,mt:1}} container direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"subtitle2"} sx={{color:"#888888"}} >{item?.Status=="READY_TO_ACTIVE"?"مهلت ورود":"انقضا"}</Typography>
                        <Typography variant={"body1"}>{item?.Status=="READY_TO_ACTIVE"?timerText:item.ExpireDate}</Typography>
                    </Grid>
                    <Grid sx={{mx:5,mt:1}} container direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"subtitle2"} sx={{color:"#888888"}} >تعداد ورود</Typography>
                        <Typography variant={"body1"}>{replacePersianNumbers(item?.EntryTotalCount+"")}</Typography>
                    </Grid>
                    <Grid sx={{mx:5,mt:1}} container direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"subtitle2"} sx={{color:"#888888"}} >سریال</Typography>
                        <Typography variant={"body1"}>{replacePersianNumbers(item?.Serial[0]?.Serial?.split("-")[0])}</Typography>
                    </Grid>
                </Grid>
            </TicketLayer>
            <TicketLayer color={"red"}>
                <Grid container direction={"column"} >
                    <Grid sx={{mx:5}} container direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"body1"} >پرداخت شده</Typography>
                        <Typography variant={"caption"}>وضعیت</Typography>
                    </Grid>
                    <Grid sx={{mx:5}} container direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"subtitle1"} >{toPriceWithComma(item?.Price)}<small> تومان </small></Typography>
                        <Typography variant={"caption"}>{subscribeStatusEnum[item?.Status]}</Typography>
                    </Grid>
                </Grid>
            </TicketLayer>

        </Grid>
    );
};

export default TicketListItem;
