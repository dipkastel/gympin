import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../partials/content/Notice";
import {settings_add, settings_getAll} from "../../../network/api/settings.api";
import SettingDetail from "./detail/SettingDetail";
import {Button, Chip, Container, Grid, Typography} from "@mui/material";
import {Form, Modal, Row} from "react-bootstrap";
import Select from "react-select";
import {SettingTypes} from "./settingsTypeEnum";
import {ErrorContext} from "../../../components/GympinPagesProvider";


const SettingsManagement = () => {
    const error = useContext(ErrorContext);
    const [settings, SetSettings] = useState([])
    const [openModalAdd, SetOpenModalAdd] = useState(false)
    const [filter,SetFilter] = useState(null)
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
                                علاعم به جر _ و باید یکتا باشد)</Form.Label>
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

            <Notice  icon="flaticon-warning kt-font-primary">
                <Grid
                    container
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"end"}
                >
                <p>مدیریت تنظیمات</p>
                <Button variant={"contained"} size={"large"} onClick={() => SetOpenModalAdd(true)}>افزودن</Button>
                </Grid>
                <Typography sx={{mt:3}} variant={"h6"}>
                    فیلتر
                </Typography>
                {Object.entries(SettingTypes).filter(f=>filter?f[0]===filter:true).map(item=>(<>
                    <Chip size={"medium"} sx={{fontSize:15,mx:"5px",}} label={item[1]} color={item[0]===filter?"error":"default"} onClick={()=>SetFilter((item[0]===filter)?null:item[0])}/>
                </>))}
            </Notice>
            <div className="container-fluid">
                <Row>
                    <Grid container spacing={3}>
                        {settings.filter(f=>filter?f.Type===filter:true).map((setting, index) => (
                            <Grid item xs={4} key={index}>
                                <SettingDetail setting={setting} refreshData={()=>getAllDatas()}/>
                            </Grid>
                        ))}
                    </Grid>
                </Row>
            </div>
            {RenderModalAdd()}
        </div>
    );
};

export default SettingsManagement;
