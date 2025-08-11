import React, {useEffect} from "react";
import SettingsCatering from "./SettingsCatering";

const Settings = () => {
    useEffect(() => {
        document.title = "تنظیمات";
    }, []);

    return (
        <>
            <SettingsCatering/>
        </>
    );
};

export default Settings;
