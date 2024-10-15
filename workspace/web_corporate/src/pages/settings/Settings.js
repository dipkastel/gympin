import React, {useEffect} from 'react';
import _ListItem from "../../components/_ListItem";
import _SettingsCorporate from "./_SettingsCorporate";

const Settings = () => {

    useEffect(() => {
        document.title = 'تنظیمات';
    }, []);

    return (
        <>
            <_SettingsCorporate/>

            <div>
                <div className={"section-title mb-2"}>
                   بیشتر
                </div>
            </div>
            <_ListItem title="خروج" destination="/auth/logout"/>
        </>
    );
};

export default Settings;
