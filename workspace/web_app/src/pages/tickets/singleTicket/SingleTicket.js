import React, {useContext, useEffect, useState} from 'react';
import _QRcode from "./_QRcode";
import {useNavigate, useParams} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _TicketDetail from "../_TicketDetail";
import {ticket_getById} from "../../../network/api/tickets.api";
import _EnterList from "./_EnterList";
import _UsageProgress from "./_UsageProgress";
import _PhoneLessEnter from "./_PhoneLessEnter";

const SingleTicket = () => {

    const navigate = useNavigate()
    const {ticketId} = useParams();
    const [ticket, setTicket] = useState(null)
    const [userCanEnter, setUserCanEnter] = useState(null)
    const error = useContext(ErrorContext);

    useEffect(() => {
        getTicket();
    }, []);

    function getTicket() {
        ticket_getById({id: ticketId}).then(result => {
            setTicket(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        });
    }


    return (
        <>
            {ticket && <_TicketDetail ticket={ticket}/>}
            {ticket && <_UsageProgress setUserCanEnter={setUserCanEnter} ticket={ticket}/>}
            {ticket && <_QRcode ticket={ticket}/>}
            {ticket && userCanEnter && <_PhoneLessEnter ticket={ticket} getTicket={getTicket}/>}
            {ticket && <_EnterList ticket={ticket} getTicket={getTicket} setUserCanEnter={setUserCanEnter}/>}
        </>
    );
};

export default SingleTicket;
