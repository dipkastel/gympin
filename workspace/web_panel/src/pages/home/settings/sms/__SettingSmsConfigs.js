import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
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
            SetSettings(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }
    return (<>
                    {settings.filter(f=>f.Key.includes("SMS")).map((setting, index) => (
                        <SettingDetail key={index} setting={setting} refreshData={() => getSettings()}/>
                    ))}

        </>
    );
};

export default __SettingSmsConfigs;
