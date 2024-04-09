import React, { useEffect, useState} from 'react';
import __SmsSentList from "./engin/__SmsSentList";
import __SmsPendingList from "./engin/__SmsPendingList";
import __SmsFailedList from "./engin/__SmsFailedList";
import __SmsCanceledList from "./engin/__SmsCanceledList";

const __SettingSmsConfigs = () => {

    const [updatePageP, SetUpdatePageP] = useState(false);
    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }

    return (<>
            {!updatePageP&&<div className={"row"}>
                <div className={"col-6"}>
                    <__SmsPendingList updatePage={updatePage}/>
                    <__SmsFailedList updatePage={updatePage}/>
                    <__SmsCanceledList updatePage={updatePage}/>
                </div>
                <div className={"col-6"}>
                    <__SmsSentList updatePage={updatePage}/>
                </div>
            </div>
            }

        </>
    );
};

export default __SettingSmsConfigs;
