import React, {useContext, useEffect, useState} from 'react';
import _SingleSubscribeDetail from "./_SingleSubscribeDetail";
import _SingleSubscribeEntryList from "./_SingleSubscribeEntryList";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {purchasedSubscribe_getByKey} from "../../../../network/api/subscribe.api";
import _SingleSubscribeActions from "./_SingleSubscribeActions";
import getAccessOf from "../../../../helper/accessManager";
import {personnelAccessEnumT} from "../../../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../../../components/AccessDenied";
import _SingleSubscribeUser from "./_SingleSubscribeUser";

const SingleSubscribe = () => {
    const error = useContext(ErrorContext);
    const {subscribeId} = useParams();
    const [subscribe, SetSubscribe] = useState(null);

    useEffect(() => {
        document.title = 'مدیریت عضویت';
        console.log(subscribeId)
        getSubscribe();
    }, [subscribeId]);

    function getSubscribe() {
        SetSubscribe(null);
        purchasedSubscribe_getByKey({key: subscribeId}).then(result => {
            SetSubscribe(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    if (!getAccessOf(personnelAccessEnumT.SubscribeDetail))
        return <AccessDenied/>;

    return (
        <>

            {subscribe && <div><div className={"section-title mt-3 mb-3"}> جزئیات عضویت</div></div>}
            {subscribe && <_SingleSubscribeUser subscribe={subscribe} renewSubscribe={getSubscribe}/>}
            {subscribe && <_SingleSubscribeDetail subscribe={subscribe} renewSubscribe={getSubscribe}/>}
            {subscribe && <_SingleSubscribeEntryList subscribe={subscribe} renewSubscribe={getSubscribe}/>}
            {(getAccessOf(personnelAccessEnumT.SubscribeDetailActions)) && subscribe &&
            <_SingleSubscribeActions subscribe={subscribe} renewSubscribe={getSubscribe}/>}

        </>
    );
};

export default SingleSubscribe;
