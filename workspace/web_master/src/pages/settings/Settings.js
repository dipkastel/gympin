import React, {useEffect} from 'react';
import _SettingsPlaces from "./_SettingsPlaces";
import _ListItem from "../management/_ListItem";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import {getWizardComplete} from "../../helper/pocket";

const Settings = () => {
    useEffect(() => {
        document.title = 'تنظیمات';
    }, []);

    const introMode=!getWizardComplete()


    return (
        <>
            <_SettingsPlaces/>
            {!introMode&&getAccessOf(personnelAccessEnumT.ManagementSettingsQr)&&<_ListItem title="کنترل qr کد ها" destination="/management/qrManagement"/>}
            {!introMode&&<_ListItem title="خروج" destination="/auth/logout"/>}
        </>
    );
};

export default Settings;
