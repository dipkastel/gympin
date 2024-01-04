import React, {useContext, useEffect, useState} from 'react';
import _QRcode from "./_QRcode";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _SubscribeDetail from "./_SubscribeDetail";
import {purchasedSubscribe_getById} from "../../../network/api/purchasedSubscribe.api";
import _EnterList from "./_EnterList";
import _UsageProgress from "./_UsageProgress";
import _PhoneLessEnter from "./_PhoneLessEnter";

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
            {subscribe && <_UsageProgress setUserCanEnter={setUserCanEnter} subscribe={subscribe}/>}
            {subscribe && <_QRcode subscribe={subscribe}/>}
            {subscribe && userCanEnter && <_PhoneLessEnter subscribe={subscribe} getSubscribe={getSubscribe}/>}
            {subscribe && <_EnterList subscribe={subscribe} getSubscribe={getSubscribe} setUserCanEnter={setUserCanEnter}/>}
        </>
    );
};

export default SingleSubscribe;
