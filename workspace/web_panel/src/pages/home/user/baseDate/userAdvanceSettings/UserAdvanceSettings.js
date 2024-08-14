import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {user_GetUserSettings, user_SetUserSettings} from "../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Button, Divider, FormControl, FormGroup, FormLabel, Grid, IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {UserSettingKeys} from "../../../../../helper/enums/UserSettingKeys";
import {Form, Modal} from "react-bootstrap";
import {ArticleCategory_add} from "../../../../../network/api/articleCategories.api";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";

const UserAdvanceSettings = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const [settings, SetSettings] = useState(null)
    const [openModalAdd, setOpenModalAdd] = useState(false)

    useEffect(() => {
        getUserSettings();
    }, []);

    function getUserSettings() {
        user_GetUserSettings({Id: currentUser.Id}).then(data => {
            SetSettings(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {
        function addCategory(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            SetSettings([...settings,{Key:e.target.settingKey.value}])
        }
        function getKeysToAdd(){
            var keys = [];
            Object.keys(UserSettingKeys).filter(key=>!settings?.map(s=>s.Key).includes(key))?.map(key=>{
                keys.push({value: key, label: UserSettingKeys[key]});
            })
            return keys;
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addCategory(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن تنظیمات شخصی "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormControl fullWidth>
                                <Select
                                    className={"dropdown"}
                                    name={"settingKey"}
                                    options={getKeysToAdd()}
                                />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function submitSettingsForm(e) {
        e.preventDefault();
        SetSettings([]);
        user_SetUserSettings({
            Id: e.target.Id.value,
            Value: e.target.Value.value,
            Data: e.target.Data.value,
            Key: e.target.Key.value,
            User: {Id: currentUser.Id}
        }).then(result => {
            getUserSettings();
            error.showError({message: "ثبت موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
                getUserSettings();
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function deleteItem(item) {

        SetSettings([]);
        user_SetUserSettings({
            Id: item.Id,
            Value: null,
            Data: null,
            Key: item.Key,
            User: {Id: currentUser.Id}
        }).then(result => {
            getUserSettings();
            error.showError({message: "ثبت موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
                getUserSettings();
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="تنظیمات شخصی کاربر"

                               toolbar={
                                   <PortletHeaderToolbar>
                                       {settings && <button
                                           type="button"
                                           className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                           onClick={(e) => setOpenModalAdd(true)}
                                       >
                                           <AddIcon/>
                                       </button>}
                                   </PortletHeaderToolbar>
                               }
                />
                <PortletBody>
                    {settings && settings.map(item => (
                        <div key={item.Id}>
                            <Form noValidate autoComplete="off" onSubmit={(e) => submitSettingsForm(e)}>
                                <Grid container alignItems={"center"} justifyContent={"space-between"}>


                                    <FormGroup>
                                        <FormLabel component="legend">{UserSettingKeys[item.Key]}</FormLabel>

                                    </FormGroup>

                                    <IconButton aria-label="delete" color={"error"} onClick={() => deleteItem(item)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid container alignItems={"center"}>
                                    <Grid item className={"col-md-5"}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="مقدار"
                                                className="textField"
                                                name={"Value"}
                                                defaultValue={item.Value}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item className={"col-md-5"}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="مقدار اضافی"
                                                className="textField"
                                                defaultValue={item.Data}
                                                name={"Data"}
                                                // onChange={(e) => setValues(toPriceWithComma(e.target.value))}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item className={"col-md-2"}>
                                        <FormControl fullWidth>
                                            <FormGroup>
                                                <Button
                                                    variant="contained"
                                                    color={"primary"}
                                                    type={"submit"}
                                                >
                                                    ثبت
                                                </Button>
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>

                                    <TextField hidden={true} value={item.Id} name={"Id"}/>
                                    <TextField hidden={true} value={item.Key} name={"Key"}/>
                                </Grid>
                            </Form>
                            <Divider variant="inset" sx={{mx: 0, mb: 2}} component="p"/>

                        </div>
                    ))}

                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </>
    );
};

export default UserAdvanceSettings;
