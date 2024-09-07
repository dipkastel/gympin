import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {settings_add, settings_getAll} from "../../../../network/api/settings.api";
import {Form, Modal} from "react-bootstrap";
import Select from "react-select";
import {SettingTypes} from "../../../../helper/enums/settingsTypeEnum";
import {Button, Chip, Collapse, Grid, IconButton, Paper, Typography} from "@mui/material";
import Notice from "../../../partials/content/Notice";
import SettingDetail from "./detail/SettingDetail";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material";
import {Row} from "reactstrap";

const _SettingGeneral = () => {
    const error = useContext(ErrorContext);
    const [settings, SetSettings] = useState([])
    const [openModalAdd, SetOpenModalAdd] = useState(false)
    const [filter, SetFilter] = useState(null)
    useEffect(() => {
        getAllDatas();
    }, [filter]);

    function getAllDatas() {
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

    function RenderModalAdd() {
        function addSetting(e) {
            e.preventDefault()
            settings_add({
                Key: e.target.Key.value,
                Description: e.target.Description.value,
                Type: e.target.Type.value
            })
                .then((data) => {
                    SetOpenModalAdd(false);
                    getAllDatas();
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
                <Modal show={openModalAdd} onHide={() => SetOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addSetting(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن تنظیم جدید "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>کلید (عبارتی متشکل از حروف بزرگ انگلیسی که تنظیم را تعریف میکند بدون فاصله و
                                علاعم به جز _ و باید یکتا باشد)</Form.Label>
                            <Form.Group controlId="Key">
                                <Form.Control
                                    name="Key"
                                    type="Text"
                                    placeholder="STH_STH_STH"

                                />
                            </Form.Group>
                            <Form.Group controlId="Description">
                                <Form.Label>لطفا توضیح کاملی از استفاده تنظیم بنویسید به نحوی که دیگران متوجه
                                    شوند.</Form.Label>
                                <Form.Control
                                    name="Description"
                                    type="text"
                                    placeholder="توضیح برای کاربرد تنظیم"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>نوع (از نوع برای دسته بندی و ارسال به بخش هدف استفاده میشود)</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    inputId="react-select-single"
                                    name="Type"
                                    options={Object.entries(SettingTypes).map(data => {
                                        return {label: data[1], value: data[0]}
                                    })}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => SetOpenModalAdd(false)}
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

    return (
        <div>
            <Paper sx={{mx: 1,my:2, p: 2}}>
                <Grid
                    container
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"end"}
                >
                    <Grid item>
                        {Object.entries(SettingTypes).filter(f => filter ? f[0] === filter : true).map(item => (
                            <Chip key={item[1]} size={"medium"} sx={{fontSize: 15, mx: "5px",}} label={item[1]}
                                  color={item[0] === filter ? "error" : "default"}
                                  onClick={() => SetFilter((item[0] === filter) ? null : item[0])}/>
                        ))}
                    </Grid>
                    <Button variant={"contained"} size={"large"} onClick={() => SetOpenModalAdd(true)}>افزودن</Button>
                </Grid>
            </Paper>
            <div className="container-fluid">
                <Row>
                {settings.filter(f=>f.Type!="SMS").filter(f => filter ? f.Type === filter : true).map((setting, index) => (
                    <div className={"col-6"} key={setting.Key}>
                            <SettingDetail key={index} setting={setting} refreshData={() => getAllDatas()}/>
                    </div>
                ))}
                </Row>
            </div>
            {RenderModalAdd()}
        </div>
    );
};

export default _SettingGeneral;
