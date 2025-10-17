import React, {useState} from 'react';
import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import {formStatus} from "../../helper/enum/fromStatusEnum.js";
import {account_requestPublicMessage, account_requestRegisterAdvise, account_requestRegisterCorporate} from "../../network/api/account.api";
import {formTypeEnum} from "../../helper/enum/formTypeEnum.js";

const _ContactForm = ({setFormStatus, formType}) => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({})

    function sendMessage(e) {
        e.preventDefault();
        var error = {};
        if (e?.target?.Name?.value?.length > 90) {
            error = {...error, Name: {error: true, errorMessage: "نام و نام خانوادگی طولانی است."}}
        }
        if (e?.target?.Name?.value?.length < 5) {
            error = {...error, Name: {error: true, errorMessage: "نام و نام خانوادگی کوتاه است."}}
        }
        if (!e?.target?.Name?.value) {
            error = {...error, Name: {error: true, errorMessage: "نام و نام خانوادگی الزامی‌است."}}
        }
        if (!e?.target?.Message?.value) {
            error = {...error, Message: {error: true, errorMessage: "نام شرکت یا سازمان الزامی‌است."}}
        }
        if (!e?.target?.Tel?.value) {
            error = {...error, Tel: {error: true, errorMessage: "شماره تلفن الزامی‌است."}}
        }
        if (!isEmpty(error)) {
            setFormData(error);
            return;
        }
        setLoading(true);
        var postData = {
            PhoneNumber: e.target.Tel.value,
            FullName: e.target.Name.value,
            Text: e.target.Message.value
        }

        switch (formType) {
            case formTypeEnum.advise:
                account_requestRegisterAdvise(postData).then(result => {
                    setFormStatus(formStatus.complete);
                    setLoading(false);
                }).catch(e => {
                    setFormStatus(formStatus.error);
                    setLoading(false);
                })
                break;
            case formTypeEnum.CorporateRegister:
                account_requestRegisterCorporate(postData).then(result => {
                    setFormStatus(formStatus.complete);
                    setLoading(false);
                }).catch(e => {
                    setFormStatus(formStatus.error);
                    setLoading(false);
                })
                break;

            case formTypeEnum.Message:
                account_requestPublicMessage(postData).then(result => {
                    setFormStatus(formStatus.complete);
                    setLoading(false);
                }).catch(e => {
                    setFormStatus(formStatus.error);
                    setLoading(false);
                })
                break;

            default:
                account_requestRegisterAdvise(postData).then(result => {
                    setFormStatus(formStatus.complete);
                    setLoading(false);
                }).catch(e => {
                    setFormStatus(formStatus.error);
                    setLoading(false);
                })
                break;
        }

    }

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    return (
        <>

            <CacheProvider value={cacheRtl}>
                <div dir="rtl">
                    <form onSubmit={sendMessage}>
                        <TextField error={formData?.Name?.error} helperText={formData?.Name?.errorMessage} disabled={loading} name={"Name"}
                                   sx={{my: 1}} size={"small"} fullWidth variant={"outlined"} label={"نام و نام خانوادگی :"}/>
                        <TextField error={formData?.Message?.error} helperText={formData?.Message?.errorMessage} disabled={loading}
                                   name={"Message"}
                                   sx={{my: 1}} size={"small"} fullWidth variant={"outlined"} label={"نام سازمان :"}/>
                        <TextField error={formData?.Tel?.error} helperText={formData?.Tel?.errorMessage} disabled={loading} name={"Tel"}
                                   sx={{my: 1}} size={"small"} fullWidth variant={"outlined"} label={"شماره تماس :"}/>
                        <LoadingButton loading={loading} type={"submit"} variant={"contained"} color={"primary"}
                                       sx={{px: 5, borderRadius: 2.5}}>ثبت
                            نام سازمان</LoadingButton>
                    </form>
                </div>
            </CacheProvider>
        </>
    );
};

export default _ContactForm;
