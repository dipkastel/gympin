import React, {useContext, useEffect, useState} from 'react';
import _SingleTicketDetail from "./_SingleTicketDetail";
import _SingleTicketEntryList from "./_SingleTicketEntryList";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSearchParams} from "react-router-dom";
import {ticket_getById} from "../../network/api/ticket.api";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import _SingleTicketActions from "./_SingleTicketActions";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";

const SingleTicket = () => {
    const error = useContext(ErrorContext);
    const [searchParam] = useSearchParams();
    const [ticket,SetTicket] = useState(null);

    useEffect(() => {
        getTicket();
    }, [searchParam]);

    function getTicket() {
        SetTicket(null);
        ticket_getById({id:searchParam.get("id")}).then(result=>{
            SetTicket(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.TicketDetail))
        return (<></>);

    return (
        <>
            {ticket&&<_SingleTicketDetail ticket={ticket} renewTicket={getTicket}/>}
            {ticket&&<_SingleTicketEntryList ticket={ticket} renewTicket={getTicket}/>}
            {(getAccessOf(personnelAccessEnumT.TicketDetailActions))&&ticket&&<_SingleTicketActions ticket={ticket} renewTicket={getTicket}/>}

        </>
    );
};

export default SingleTicket;
