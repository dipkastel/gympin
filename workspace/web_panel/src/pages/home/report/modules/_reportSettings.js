import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {reportSettings_getAll, reportSettings_update} from "../../../../network/api/reportSettings.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {List, ListItem, ListItemText, Switch} from "@mui/material";

const _reportSettings = () => {
    const error = useContext(ErrorContext);
    const [reportSettings,SetReportSettings] = useState([]);

    useEffect(() => {
        getReport();
    }, []);

    function getReport() {
        reportSettings_getAll({}).then(response=>{
            SetReportSettings(response.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function updateAutoUpdate(e,row) {
        reportSettings_update({
            Id:row.Id,
            UpdateAuto:e.target.checked,
            Key:row.Key,
            Value:row.Value,
            Description:row.Description
        }).then(result=>{
            getReport();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getTime(value) {
        if(!value.includes("IRDT")) return value;
        const timezoneMap = {
            IRDT: "+0430",
            IRST: "+0330",
        };

        const normalized = value.replace(
            /\b(IRDT|IRST)\b/,
            match => timezoneMap[match]
        );

        return new Date(normalized).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"

        });
    }

    return (
        <>

            <Portlet>
                <PortletHeader title="پایه گزارشات "/>
                <PortletBody>
                    <p>پایه گزارشات اطلاعاتی است که سیستم از آنها برای تصمیمات خود استفاده میکند. تغییر این تنظیمات تاثیری بر مرجع آنها ندارد و فقط در تصمیم گیری های آینده سیستم موثر خواهد بود.این تنظیمات هر روز ساعت 2 بامداد به روز میشوند.</p>
                    <List>

                        {reportSettings&&reportSettings.map(item=>(
                            <ListItem>
                                <ListItemText
                                    primary={getTime(item.Value)}
                                    secondary={item.Description}
                                              sx={{ textAlign:"right" }}/>

                                <Switch
                                    edge="end"
                                    onChange={e=>updateAutoUpdate(e,item)}
                                    checked={item?.UpdateAuto}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-wifi',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </PortletBody>
            </Portlet>

        </>
    );
};

export default _reportSettings;
