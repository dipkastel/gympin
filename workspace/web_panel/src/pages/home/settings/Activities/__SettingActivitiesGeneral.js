import React from 'react';
import __SmsPendingList from "../sms/engin/__SmsPendingList";
import __SmsFailedList from "../sms/engin/__SmsFailedList";
import __SmsCanceledList from "../sms/engin/__SmsCanceledList";
import __SmsSentList from "../sms/engin/__SmsSentList";
import ___SettingsActivitiesUsersActives from "./general/___SettingsActivitiesUsersActives";

const __SettingActivitiesGeneral = () => {

    return (<>
            <div className={"row"}>
                <div className={"col-6"}>
                    <___SettingsActivitiesUsersActives/>
                </div>
                <div className={"col-6"}>
                </div>
            </div>
        </>
    );
};

export default __SettingActivitiesGeneral;
