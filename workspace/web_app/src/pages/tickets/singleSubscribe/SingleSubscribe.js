import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _SubscribeDetail from "./_SubscribeDetail";
import {purchasedSubscribe_getByKey} from "../../../network/api/purchasedSubscribe.api";
import _TicketOwner from "../commonPartials/_TicketOwner";
import {Alert, Typography} from "@mui/material";
import _UseExpire from "../commonPartials/_UseExpire";
import _UsageProgress from "../commonPartials/_UsageProgress";
import _QRcode from "../commonPartials/_QRcode";
import _SubscribePhoneLessEnter from "./_SubscribePhoneLessEnter";
import _SubscribeEnterList from "./_SubscribeEnterList";

const SingleSubscribe = () => {
    const {subscribeKey} = useParams();
    const [subscribe, setSubscribe] = useState(null)
    const [userCanEnter, setUserCanEnter] = useState(null)
    const error = useContext(ErrorContext);

    useEffect(() => {
        document.title = 'بلیط - عضویت';
        getSubscribe();
    }, []);

    function getSubscribe() {
        purchasedSubscribe_getByKey({key: subscribeKey}).then(result => {
            setSubscribe(result.data.Data);
            if(result.data.Data.UseExpire){
                setUserCanEnter(false);
            }else{
                setUserCanEnter(true);
            }
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
            {subscribe &&
            <div>
                <div className={"section-title mt-3 me-3"}>
                    <Typography variant={"body2"}>{subscribe.Name}</Typography>

                </div>
            </div>}
            {subscribe && <_UseExpire subscribe={subscribe} getSubscribe={getSubscribe} setUserCanEnter={setUserCanEnter} />}
            {subscribe && <_TicketOwner subscribe={subscribe}/>}
            {subscribe && <_SubscribeDetail subscribe={subscribe}/>}
            {subscribe && <_UsageProgress setUserCanEnter={setUserCanEnter} ticket={subscribe}/>}
            {subscribe &&
            (subscribe.Status == "ACTIVE"||subscribe.Status == "READY_TO_ACTIVE")&&<_QRcode ticket={subscribe} type={"SUBSCRIBE"} userCanEnter={userCanEnter}/>
            }
            {subscribe && userCanEnter &&
            (subscribe.Status == "ACTIVE")&&<_SubscribePhoneLessEnter subscribe={subscribe} getSubscribe={getSubscribe}/>}
            {subscribe && <_SubscribeEnterList subscribe={subscribe} getSubscribe={getSubscribe} setUserCanEnter={setUserCanEnter}/>}
        </>
    );
};

export default SingleSubscribe;
