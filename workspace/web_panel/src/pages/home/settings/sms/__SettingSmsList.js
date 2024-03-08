import React, {useContext, useEffect, useState} from 'react';
import {
    Portlet,
    PortletBody,
    PortletFooter,
    PortletHeader,
    PortletHeaderToolbar
} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {settings_getAll} from "../../../../network/api/settings.api";
import SettingDetail from "../General/detail/SettingDetail";
import {Form} from "react-bootstrap";
import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {SettingTypes} from "../../../../helper/enums/settingsTypeEnum";
import {Delete} from "@mui/icons-material";

const __SettingSmsConfigs = () => {

    const error = useContext(ErrorContext);
    const [smsList, SetSmsList] = useState([])

    useEffect(() => {
        getSmsList();
    }, []);
    

    function getSmsList() {


    }
    return (<>
            <Portlet>
                    <PortletHeader
                        title={<>
                            <Typography variant={"subtitle1"} >لیست پیام ها</Typography>
                        </>}
                    />

                    <PortletBody className={"p-2"}>
                    </PortletBody>
                    <PortletFooter>
                        <></>
                    </PortletFooter>
            </Portlet>

        </>
    );
};

export default __SettingSmsConfigs;
