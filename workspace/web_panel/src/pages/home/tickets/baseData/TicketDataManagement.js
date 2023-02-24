import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom/cjs/react-router-dom";
import _TicketInfo from "./info/_TicketInfo";
import Notice from "../../../partials/content/Notice";
import {ticket_getById} from "../../../../network/api/tickets.api";
import UserAvatar from "../../user/baseDate/Avatar/UserAvatar";
import UserBasics from "../../user/baseDate/Base/UserBasics";
import UserAccess from "../../user/baseDate/Access/UserAccess";
import UserStatus from "../../user/baseDate/Status/UserStatus";
import UserCredit from "../../user/baseDate/credit/UserCredit";
import UserPlaces from "../../user/baseDate/places/UserPlaces";
import UserCorporates from "../../user/baseDate/corporates/UserCorporates";
import UserTransActions from "../../user/baseDate/TransActions/UserTransActions";
import Notes from "../../../partials/content/notes/Notes";
import _Transactions from "./transactions/_Transaction";
import _TicketEntryList from "./entry/_TicketEnryList";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const TicketDataManagement = () => {
    const error = useContext(ErrorContext);
    const {ticketId} = useParams();
    const [ticket,setTicket]=useState({})
    useEffect(() => {
        getTicket();
    }, [ticketId]);
    function getTicket(){
        ticket_getById({id:ticketId}).then(result=>{
            setTicket(result.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>جزئیات بلیط کاربر</p>
            </Notice>

            <div className="row">
                <div className="col-md-5">
                    {ticket && <_TicketInfo ticket={ticket}/>}
                    {ticket && <_Transactions ticket={ticket}/>}
                </div>
                <div className="col-md-5">
                    {ticket && <_TicketEntryList ticket={ticket}/>}
                </div>
                <div className="col-md-2">
                    {ticket && <Notes source={{ticket:{Id:ticket.Id}}} />}
                </div>
            </div>
        </>
    );
};

export default TicketDataManagement;
