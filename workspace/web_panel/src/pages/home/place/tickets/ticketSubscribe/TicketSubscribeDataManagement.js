import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Notice from "../../../../partials/content/Notice";
import {TicketSubscribes_getById, TicketSubscribes_update} from "../../../../../network/api/ticketSubscribes.api";
import TicketSubscribeBase from "./Base/TicketSubscribeBase";
import TicketSubscribeActivityTimes from "./TicketActivityTimes/TicketSubscribeActivityTimes";
import {Button} from "@mui/material";
import TicketSubscribeSport from "./ticketSubscribeSports/TicketSubscribeSport";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import _TicketSubscribeHistoryChart from "./HistoryChart/_TicketSubscribeHistoryChart";
import _ChangeTicketSubscribeStatus from "./changeStatus/_ChangeTicketSubscribeStatus";
import TicketCourseCoaches from "../ticketCourse/ticketCourseCoaches/TicketCourseCoaches";
import TicketSubscribeCoaches from "./ticketSubscribeCoaches/TicketSubscribeCoaches";

const TicketSubscribeDataManagement = () => {
    const error = useContext(ErrorContext);
    let {ticketSubscribeId} = useParams();
    let history = useHistory();
    const [ticketSubscribe,setTicketSubscribe] = useState(null);
    useEffect(() => {
        getTicketSubscribe();
    }, []);

    function getTicketSubscribe() {
        TicketSubscribes_getById({id: ticketSubscribeId}).then((result) => {
            setTicketSubscribe(result.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function updateTicketSubscribe(ticketSubscribe) {
        TicketSubscribes_update(ticketSubscribe).then(data => {
            setTicketSubscribe(data.data.Data)
            error.showError({message: "با موفقیت ثبت شد",});
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
                {ticketSubscribe && (
                    <>
                        <p>مدیریت مشخصات عضویت {ticketSubscribe.Name}</p>
                        <Button variant={"contained"} color={"warning"} onClick={()=>{
                         history.push("/place/data/"+ticketSubscribe.Place.Id)
                        }}>بازگشت</Button>
                    </>

                )}
            </Notice>
            {ticketSubscribe && <div className="row">
                <div className="col-md-6">
                    {ticketSubscribe&&<_ChangeTicketSubscribeStatus ticketSubscribe={ticketSubscribe} updateTicketSubscribe={updateTicketSubscribe}/>}
                    {ticketSubscribe&&<TicketSubscribeBase ticketSubscribe={ticketSubscribe} updateTicketSubscribe={updateTicketSubscribe}/>}
                </div>
                <div className="col-md-6">
                    {ticketSubscribe&&<TicketSubscribeActivityTimes ticketSubscribe={ticketSubscribe} />}
                    {ticketSubscribe&&<TicketSubscribeSport ticketSubscribe={ticketSubscribe} />}
                    {ticketSubscribe&&<TicketSubscribeCoaches ticketSubscribe={ticketSubscribe} />}
                    {ticketSubscribe&&<_TicketSubscribeHistoryChart ticketSubscribe={ticketSubscribe} />}
                </div>
            </div>}
        </>
    );
};

export default TicketSubscribeDataManagement;
