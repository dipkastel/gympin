import React, {useEffect, useState} from 'react';
import {PurchasedSubscribeStatus} from "../../../../helper/enums/PurchasedSubscribeStatus";
import {getStringOfTime} from "../../../../helper";
import {Typography} from "@mui/material";

const _TicketStatus = ({ticket}) => {

    const [timerText, setTimerText] = useState(null);
    const [hour, sethour] = useState(0);


    useEffect(() => {
        let changeTimer = setInterval(function () {
            let distance = new Date(ticket?.UseExpireDate).getTime() - new Date().getTime();
            if (distance < 0) {
                clearInterval(changeTimer);
            } else {
                var hours = Math.floor((distance) / (1000 * 60 * 60));
                sethour(hours);
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimerText(getStringOfTime(seconds) + " : " + getStringOfTime(minutes) + " : " + getStringOfTime(hours));
            }
        }, 1000)

        return () => {
            clearInterval(changeTimer);
        };
    }, []);


    return (
        <>
            {ticket.Status != "READY_TO_ACTIVE"&& PurchasedSubscribeStatus[ticket.Status]}
            {ticket.Status == "READY_TO_ACTIVE"&&<Typography sx={{color:'rgba('+(255-(hour*3))+',0,0,1)',textDecoration:hour<3?"underline":""}} variant={"subtitle1"}>{timerText}</Typography> }

        </>
    );
};


export default _TicketStatus;
