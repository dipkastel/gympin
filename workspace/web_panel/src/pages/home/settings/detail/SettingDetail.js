import React, {useContext, useEffect, useState} from 'react';
import {
    Portlet,
    PortletBody,
    PortletFooter,
    PortletHeader,
    PortletHeaderToolbar
} from "../../../partials/content/Portlet";
import {Delete} from "@mui/icons-material"
import {Form} from "react-bootstrap";
import {Button, Typography} from "@mui/material";
import {settings_delete, settings_update} from "../../../../network/api/settings.api";
import {SettingTypes} from "../settingsTypeEnum";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const SettingDetail = ({setting,refreshData}) => {
    const error = useContext(ErrorContext);
    const [inSetting,SetInSetting] = useState({});
    useEffect(() => {
        SetInSetting(setting)
    }, [setting.Id]);

    function deleteItem() {

        settings_delete(setting)
            .then((data) => {
                error.showError({message: "عملیات موفق",});
                SetInSetting(null)
            })
            .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function updateSetting(e) {
        e.preventDefault()
        SetInSetting({
            ...inSetting,
            Value: e.target.Value.value,
            Data: e.target.Data.value
        })
        settings_update({
            ...inSetting,
            Value: e.target.Value.value,
            Data: e.target.Data.value
        }).then((data) => {
            error.showError({message: "عملیات موفق",});
                 refreshData()
            })
            .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    return (
        <>
            {inSetting&&<Portlet>
                <PortletHeader
                    title={Object.entries(SettingTypes).find(t=>t[0]===setting.Type)[1]}
                    toolbar={
                        (setting.Value==null) && <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => deleteItem()}
                            >
                                <Delete color={"error"}/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>
                    <Typography variant={"h5"}>
                        {setting.Description}
                    </Typography>
                    <br/>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => updateSetting(e)}>
                        <Form.Label>
                            مقدار :
                        </Form.Label>
                        <Form.Group controlId="Value">
                            <Form.Control
                                name="Value"
                                type="Text"
                                value={inSetting["Value"]}
                                onChange={(e)=>SetInSetting({...inSetting,Value:e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group controlId="Data">
                            <Form.Label>
                                بعضی تنظیم ها به بیش از یک مقدار نیاز دارد
                            </Form.Label>
                            <Form.Control
                                name="Data"
                                type="text"
                                onChange={(e)=>SetInSetting({...inSetting,Data:e.target.value})}
                                value={inSetting["Data"]}
                            />
                        </Form.Group>
                        <Button
                            className={"button_danger"}
                            type={"submit"}
                            variant={"contained"}
                        >
                            ثبت
                        </Button>
                    </Form>
                </PortletBody>
                <PortletFooter>
                    {setting.Key}
                </PortletFooter>
            </Portlet>}
        </>
    );
};

export default SettingDetail;
