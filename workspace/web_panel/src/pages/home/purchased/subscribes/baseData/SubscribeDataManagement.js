import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom/cjs/react-router-dom";
import _SubscribeInfo from "./info/_SubscribeInfo";
import Notice from "../../../../partials/content/Notice";
import Notes from "../../../../partials/content/notes/Notes";
import _SubscribeEntryList from "./entry/_SubscribeEntryList";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {purchasedSubscribe_getById} from "../../../../../network/api/purchasedSubscribes.api";
import _SubscribeStatus from "./info/_SubscribeStatus";
import _SubscribeSerial from "./info/_SubscribeSerial";
import _SubscribeFreeze from "./freeze/_SubscribeFreeze";
import _Transactions from "./transactions/_Transaction";
import {serial_getBySerial} from "../../../../../network/api/serial.api";
import _SubscribeActions from "./actions/_SubscribeActions";

const SubscribeDataManagement = () => {
    const error = useContext(ErrorContext);
    const {subscribeId} = useParams();
    const [subscribe, setSubscribe] = useState({})

    const [transactions, SetTransactions] = useState(null);

    useEffect(() => {
        if (subscribe.Serial)
            getTransactionsBySerial()
    }, [subscribe]);

    function getTransactionsBySerial() {
        serial_getBySerial({serial: subscribe.Serial.Serial}).then((result) => {
            SetTransactions(result.data.Data);
            console.log("result", result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    useEffect(() => {
        getSubscribes();
    }, [subscribeId]);

    function getSubscribes() {
        purchasedSubscribe_getById({id: subscribeId}).then(result => {
            setSubscribe(result.data.Data)
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
                <p>جزئیات عضویت کاربر</p>
            </Notice>

            <div className="row">
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-8">
                            {subscribe && <_SubscribeInfo subscribe={subscribe}/>}
                            {subscribe && <_SubscribeEntryList subscribe={subscribe} updatePage={getSubscribes}/>}
                        </div>
                        <div className="col-md-4">
                            {subscribe && <_SubscribeStatus subscribe={subscribe} updatePage={getSubscribes}/>}
                            {subscribe && <_SubscribeSerial subscribe={subscribe}/>}
                            {subscribe && transactions && <_SubscribeActions subscribe={subscribe} transactions={transactions}/>}

                        </div>
                        <div className="col-md-6">
                            {subscribe && <_SubscribeFreeze subscribe={subscribe} updatePage={getSubscribes}/>}
                        </div>

                        <div className="col-md-6">
                            {subscribe &&transactions&& <_Transactions subscribe={subscribe} transactions={transactions} updatePage={getSubscribes}/>}
                        </div>

                    </div>
                </div>
                <div className="col-md-2">
                    {subscribe && <Notes source={{subscribe: {Id: subscribe.Id}}}/>}
                </div>
            </div>
        </>
    );
};

export default SubscribeDataManagement;
