import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material"
import {Form} from "react-bootstrap";
import {Button, Collapse, Grid, IconButton, TextField, Typography} from "@mui/material";
import {settings_delete, settings_update} from "../../../../network/api/settings.api";
import {SettingTypes} from "../settingsTypeEnum";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import AddIcon from "@mui/icons-material/Add";

const SettingDetail = ({setting, refreshData}) => {
    const error = useContext(ErrorContext);
    const [inSetting, SetInSetting] = useState({});
    const [expanded, setExpanded] = useState(false);
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
            <Form
                noValidate
                autoComplete="off"
                onSubmit={(e) => updateSetting(e)}>
                <Portlet>
                    <PortletHeader

                        title={<>
                            <Typography variant={"subtitle1"} onClick={() => setExpanded(!expanded)}>{setting.Description}</Typography>
                            <Typography variant={"caption"} onClick={() => setExpanded(!expanded)}>
                                {setting.Key}
                            </Typography>
                        </>}
                        toolbar={<PortletHeaderToolbar>

                            <Typography variant={"caption"}>
                                {SettingTypes[inSetting.Type]}
                            </Typography>
                            {(setting.Value == null) &&
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => deleteItem()}
                            >
                                <Delete color={"error"}/>
                            </button>}

                            <IconButton aria-label="down"
                                        onClick={() => setExpanded(!expanded)}>
                                {expanded ? <ExpandLess/> : <ExpandMore/>}
                            </IconButton>
                        </PortletHeaderToolbar>
                        }

                    />

                    <Collapse in={expanded} timeout="auto" unmountOnExit>

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
                                <Grid paddingX={1} md={1}>
                                    <Button
                                        type={"submit"}
                                        variant={"contained"}
                                        size={"large"}
                                    >
                                        ثبت
                                    </Button>
                                </Grid>
                            </Grid>

                        </PortletBody>
                    </Collapse>
                </Portlet>
            </Form>
            }
        </>
    );
};

export default SettingDetail;
