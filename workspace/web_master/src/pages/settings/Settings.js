import React from 'react';
import _SettingsPlaces from "./_SettingsPlaces";
import _ListItem from "../management/_ListItem";

const Settings = () => {
    return (
        <>
            <_SettingsPlaces/>
            <_ListItem title="کنترل qr کد ها" destination="/management/qrManagement"/>
            <_ListItem title="خروج" destination="/auth/logout"/>
        </>
    );
};

export default Settings;
