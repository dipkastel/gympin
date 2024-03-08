import React, {useContext, useEffect, useState} from 'react';
import {
    Portlet,
    PortletBody,
    PortletFooter,
    PortletHeader,
    PortletHeaderToolbar
} from "../../../../partials/content/Portlet";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material"
import {Form} from "react-bootstrap";
import {Button, Collapse, Grid, IconButton, TextField, Typography} from "@mui/material";
import {settings_delete, settings_update} from "../../../../../network/api/settings.api";
import {SettingTypes} from "../../../../../helper/enums/settingsTypeEnum";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import AddIcon from "@mui/icons-material/Add";

const SettingDetail = ({setting, refreshData}) => {
    const error = useContext(ErrorContext);
    const [inSetting, SetInSetting] = useState({});
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
            Data: e.target?.Data?.value||""
        })
        settings_update({
            ...inSetting,
            Value: e.target.Value.value,
            Data: e.target?.Data?.value||""
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
            {inSetting &&
            <Portlet>
                <Form
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => updateSetting(e)}>
                <PortletHeader

                    title={<>
                        <Typography variant={"subtitle1"} >{setting.Description}</Typography>
                        <Typography variant={"caption"}>
                            {setting.Key}
                        </Typography>
                    </>}
                    toolbar={<PortletHeaderToolbar>

                        <Typography variant={"caption"}>
                            {SettingTypes[setting.Type]}
                        </Typography>

                    </PortletHeaderToolbar>
                    }

                />

                <PortletBody className={"p-2"}>
                        <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                            <Grid paddingX={1} alignItems={"center"} md={6}>
                                <TextField
                                    label="مقدار"
                                    name="Value"
                                    className="textField"
                                    value={inSetting["Value"] || ""}
                                    type="Text"
                                    onChange={(e) => SetInSetting({...inSetting, Value: e.target.value})}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid paddingX={1} alignItems={"center"} md={5}>
                                {(inSetting["Data"]) ?
                                    <TextField
                                        label="مقدار اضافه"
                                        name="Data"
                                        className="textField"
                                        value={inSetting["Data"] || ""}
                                        type="Text"
                                        onChange={(e) => SetInSetting({...inSetting, Data: e.target.value})}
                                        margin="normal"
                                        variant="outlined"
                                    /> : <IconButton
                                        color={"primary"}
                                        variant={"contained"}
                                        aria-label="مقدار اضافی"
                                        onClick={() => {
                                            SetInSetting({...inSetting, Data: " "})
                                        }}
                                    >
                                        <AddIcon/>
                                    </IconButton>}
                            </Grid>
                        </Grid>

                </PortletBody>
                <PortletFooter>
                    <Grid paddingX={1} md={6}>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            size={"large"}
                            className={"col-6"}
                        >
                            ثبت
                        </Button>
                        {(setting.Value == null) &&
                        <button
                            type="button"
                            className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                            onClick={(e) => deleteItem()}
                            className={"col-6"}
                        >
                            <Delete color={"error"}/>
                        </button>}
                    </Grid>
                </PortletFooter>
            </Form>
            </Portlet>
            }
        </>
    );
};

export default SettingDetail;
