import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Alert, Button, Grid, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {sms_addSms} from "../../../../../network/api/sms.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const __SettingSmsSendManual = ({pattern}) => {

    const error = useContext(ErrorContext);
    const [params, setParams] = useState([]);
    const [smsText, setSmsText] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);

    useEffect(() => {
        setSmsText(pattern?.Template);
        setParams(pattern?.Template?.match(/%.*?%/gi)?.sort((a, b) => {
            return a > b
        }).map(t => {
            return {key: t, value: null}
        }))
    }, [pattern]);


    function sendMessage(v) {
        v.preventDefault();
        var data = {
            PhoneNumber: phoneNumber,
            Pattern: {PatternKey: pattern.PatternKey}
        }
        var index = 1;
        params.map(d => {
            data["Text" + index++] = d.value;
        })

        sms_addSms(data).then(result => {
            error.showError({message: "با موفقیت ارسال شد",});
            setPhoneNumber("");
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function changeValue(item, e) {
        var text = pattern?.Template;
        var result = params.map(p => (p.key === item.key) ? {key: p.key, value: e.target.value} : p);

        result.forEach(p => {
            text = text.replace(p.key, p.value);
        });
        setSmsText(text);
        setParams(result);
    }

    return (
        <>

            <Grid container spacing={1}>
                <Grid size={{xs: 12, sm: 12, md: 4, xl: 4}}>
                    <Portlet>
                        <PortletHeader
                            title={<>
                                <Typography variant={"subtitle1"}>{pattern?.Name}</Typography>
                            </>}
                        />
                        <PortletBody className={"p-2"}>

                            <Form.Group>
                                <Form.Label>ارسال به</Form.Label>
                                <Form.Control
                                    type={"PhoneNumber"}
                                    value={phoneNumber || ""}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                        </PortletBody>

                    </Portlet>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 4, xl: 4}}>
                    <Portlet>
                        <PortletHeader
                            title={<>
                                <Typography variant={"subtitle1"}>{"متغییر ها"}</Typography>
                            </>}
                        />
                        <PortletBody className={"p-2"}>
                            {params?.map(item => (
                                <Form.Group>
                                    <Form.Label>{item.key.replaceAll("%", "")}</Form.Label>
                                    <Form.Control
                                        name="Title"
                                        type="text"
                                        value={item.value || ""}
                                        onChange={(e) => changeValue(item, e)}
                                    />
                                </Form.Group>
                            ))}
                        </PortletBody>

                    </Portlet>

                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 4, xl: 4}}>

                    <Portlet>
                        <PortletHeader
                            title={<>
                                <Typography variant={"subtitle1"}>{"نمونه"}</Typography>
                            </>}
                        />
                        <PortletBody className={"p-2"}>
                            <Grid container direction={"column"} spacing={1}>
                                <Grid>
                                    <Alert
                                        severity={"info"}
                                        variant={"outlined"}
                                        icon={false}>
                                        <Typography variant={"subtitle1"}>{smsText + " لغو11"}</Typography>
                                    </Alert>
                                </Grid>
                                <Grid>
                                    <Button
                                        variant={"contained"}
                                        className={"button_danger"}
                                        onClick={(e) => sendMessage(e)}
                                        fullWidth
                                    >
                                        ارسال
                                    </Button>
                                </Grid>
                            </Grid>
                        </PortletBody>

                    </Portlet>

                </Grid>
            </Grid>

        </>
    );
};

export default __SettingSmsSendManual;
