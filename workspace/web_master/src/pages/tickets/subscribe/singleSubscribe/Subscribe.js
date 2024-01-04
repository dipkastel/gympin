import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ticketSubscribe_getById, TicketSubscribes_getById} from "../../../../network/api/ticketSubscribe.api";
import _SubscribeBaseData from "./_SubscribeBaseData";
import _SubscribeActiveTimes from "./_SubscribeActiveTimes";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import getAccessOf from "../../../../helper/accessManager";
import {personnelAccessEnumT} from "../../../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../../../components/AccessDenied";
import _SubscribeActive from "./_SubscribeActive";
import _SubscribeDelete from "./_SubscribeDelete";
import _SubscribeSports from "./_SubscribeSports";

const Subscribe = () => {
    const error = useContext(ErrorContext);
    const {subscribeId} = useParams()
    const [ticketSubscribe, setTicketSubscribe] = useState([]);
    useEffect(() => {
        getSubscribeData();
    }, []);
    function getSubscribeData(){
        TicketSubscribes_getById({id:subscribeId}).then(result=>{
            setTicketSubscribe(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementTicketSubscribes))
        return <AccessDenied/>;

    return (
        <>
            <_SubscribeActive ticketSubscribe={ticketSubscribe} getSubscribeData={getSubscribeData}/>
            <_SubscribeBaseData ticketSubscribe={ticketSubscribe} getSubscribeData={getSubscribeData}/>
            <_SubscribeActiveTimes ticketSubscribe={ticketSubscribe} />
            <_SubscribeSports ticketSubscribe={ticketSubscribe} />
            <_SubscribeDelete ticketSubscribe={ticketSubscribe} getSubscribeData={getSubscribeData}/>
        </>

    );
};

export default Subscribe;
