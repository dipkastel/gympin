import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {settings_getAll} from "../../../../network/api/settings.api";
import SettingDetail from "../General/detail/SettingDetail";

const __SettingSmsConfigs = () => {

    const error = useContext(ErrorContext);
    const [settings, SetSettings] = useState([])

    useEffect(() => {
        getSettings();
    }, []);



    function getSettings() {
        settings_getAll().then(result => {
            SetSettings(result.data.Data.filter(f=>f.Type == "SMS"));
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }
    return (<>
            <div className={"row"}>
                {settings.map((setting, index) => (
                    <div className={"col-6"} key={index}>
                        <SettingDetail  setting={setting} refreshData={() => getSettings()}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default __SettingSmsConfigs;
