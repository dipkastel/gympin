import React, {useEffect} from 'react';
import _ListItem from "../../components/_ListItem";
import _SettingsCorporate from "./SettingsCorporate";

const Settings = () => {

    useEffect(() => {
        document.title = 'تنظیمات';
    }, []);

    return (
        <>
            <_SettingsCorporate/>

        </>
    );
};

export default Settings;
