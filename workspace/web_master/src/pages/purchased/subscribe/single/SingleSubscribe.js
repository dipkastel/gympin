import React, {useContext, useEffect, useState} from 'react';
import _SingleSubscribeDetail from "./_SingleSubscribeDetail";
import _SingleSubscribeEntryList from "./_SingleSubscribeEntryList";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSearchParams} from "react-router-dom";
import {purchasedSubscribe_getById} from "../../../../network/api/subscribe.api";
import _SingleSubscribeActions from "./_SingleSubscribeActions";
import getAccessOf from "../../../../helper/accessManager";
import {personnelAccessEnumT} from "../../../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../../../components/AccessDenied";

const SingleSubscribe = () => {
    const error = useContext(ErrorContext);
    const [searchParam] = useSearchParams();
    const [subscribe, SetSubscribe] = useState(null);

    useEffect(() => {
        document.title = 'مدیریت عضویت';
        getSubscribe();
    }, [searchParam]);

    function getSubscribe() {
        SetSubscribe(null);
        purchasedSubscribe_getById({id: searchParam.get("id")}).then(result => {
            SetSubscribe(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if (!getAccessOf(personnelAccessEnumT.SubscribeDetail))
        return <AccessDenied/>;

    return (
        <>
            {subscribe && <_SingleSubscribeDetail subscribe={subscribe} renewSubscribe={getSubscribe}/>}
            {subscribe && <_SingleSubscribeEntryList subscribe={subscribe} renewSubscribe={getSubscribe}/>}
            {(getAccessOf(personnelAccessEnumT.SubscribeDetailActions)) && subscribe &&
            <_SingleSubscribeActions subscribe={subscribe} renewSubscribe={getSubscribe}/>}

        </>
    );
};

export default SingleSubscribe;
