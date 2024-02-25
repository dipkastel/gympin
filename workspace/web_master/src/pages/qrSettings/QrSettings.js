import React, {useEffect} from 'react';
import _SettingsCodeForQr from "./_SettingsCodeForQr";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";

const QrSettings = () => {

    useEffect(() => {
        document.title = 'تنظیمات qr کد';
    }, []);

    if(!getAccessOf(personnelAccessEnumT.ManagementSettingsQr))
        return <AccessDenied/>;



    return (
        <div>
            <_SettingsCodeForQr/>
        </div>
    );
};

export default QrSettings;
