import React from 'react';
import _SettingsCodeForQr from "./_SettingsCodeForQr";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";

const QrSettings = () => {

    if(!getAccessOf(personnelAccessEnumT.ManagementSettingsQr))
        return <AccessDenied/>;

    return (
        <div>
            <_SettingsCodeForQr/>
        </div>
    );
};

export default QrSettings;
