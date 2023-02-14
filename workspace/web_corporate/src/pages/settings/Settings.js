import React from 'react';
import _ListItem from "../../components/_ListItem";
import _SettingsCorporate from "./_SettingsCorporate";

const Settings = () => {
    return (
        <>
            <_SettingsCorporate/>
            <_ListItem title="خروج" destination="/auth/logout"/>
        </>
    );
};

export default Settings;
