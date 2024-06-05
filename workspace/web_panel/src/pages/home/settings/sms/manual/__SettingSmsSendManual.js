import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import { Button, Typography} from "@mui/material";
import {Alert, Form, Modal} from "react-bootstrap";
import {sms_addSms} from "../../../../../network/api/sms.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
const __SettingSmsSendManual = ({pattern,smsSent}) => {

    const error = useContext(ErrorContext);
    const [params,setParams] = useState([]);
    const [smsText,setSmsText] = useState("");
    const [phoneNumber,setPhoneNumber] = useState(null);

    useEffect(() => {
        setSmsText(pattern?.Template);
        setParams(pattern?.Template?.match(/%.*?%/gi)?.sort((a,b)=>{return a>b}).map(t=>{return {key:t,value:null}}))
    },[pattern]);


    function formSubmit(e) {
        e.preventDefault();
        var data = {
            PhoneNumber:phoneNumber,
            Pattern:{PatternKey:pattern.PatternKey}
        }
        var index = 1;
        params.map(d=>{
            data["Text"+index++] = d.value;
        })

        sms_addSms(data).then(result => {
            error.showError({message: "با موفقیت ارسال شد",});
            smsSent();
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
        var result = params.map(p=>(p.key===item.key)?{key:p.key,value:e.target.value}:p);

        result.forEach(p=>{
            text = text.replace(p.key,p.value);
        });
        setSmsText(text);
        setParams(result);
    }

    return (
        <>
            {pattern&& <Portlet>
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
                            value={phoneNumber||""}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Alert variant={"info"} className={"m-0 px-2  d-block"}>
                        <Typography variant={"subtitle1"}>{smsText}</Typography>
                    </Alert>

                    <Form onSubmit={(e) => formSubmit(e)}>

                        {params?.map(item=>(
                            <Form.Group>
                                <Form.Label>{item.key.replaceAll("%","")}</Form.Label>
                                <Form.Control
                                    name="Title"
                                    type="text"
                                    value={item.value||""}
                                    onChange={(e)=>changeValue(item,e)}
                                />
                            </Form.Group>
                        ))}

                        <Button
                            variant={"contained"}
                            className={"button_danger"}
                            type={"submit"}
                        >
                            ارسال
                        </Button>
                    </Form>
                </PortletBody>

            </Portlet>}

        </>
    );
};

export default __SettingSmsSendManual;
