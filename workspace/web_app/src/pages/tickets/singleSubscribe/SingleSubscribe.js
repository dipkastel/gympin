import React, {useContext, useEffect, useState} from 'react';
import _QRcode from "../commonPartials/_QRcode";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _SubscribeDetail from "./_SubscribeDetail";
import {purchasedSubscribe_getById} from "../../../network/api/purchasedSubscribe.api";
import _SubscribeEnterList from "./_SubscribeEnterList";
import _UsageProgress from "../commonPartials/_UsageProgress";
import _SubscribePhoneLessEnter from "./_SubscribePhoneLessEnter";

const SingleSubscribe = () => {
    const {subscribeId} = useParams();
    const [subscribe, setSubscribe] = useState(null)
    const [userCanEnter, setUserCanEnter] = useState(null)
    const error = useContext(ErrorContext);

    useEffect(() => {
        getSubscribe();
    }, []);

    function getSubscribe() {
        purchasedSubscribe_getById({id: subscribeId}).then(result => {
            setSubscribe(result.data.Data);
            console.log(result.data.Data);
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
            {subscribe && <_SubscribeDetail subscribe={subscribe}/>}
            {subscribe && <_UsageProgress setUserCanEnter={setUserCanEnter} ticket={subscribe}/>}
            {subscribe && <_QRcode ticket={subscribe} type={"SUBSCRIBE"} userCanEnter={userCanEnter}/>}
            {subscribe && userCanEnter && <_SubscribePhoneLessEnter subscribe={subscribe} getSubscribe={getSubscribe}/>}
            {subscribe && <_SubscribeEnterList subscribe={subscribe} getSubscribe={getSubscribe} setUserCanEnter={setUserCanEnter}/>}
        </>
    );
};

export default SingleSubscribe;
