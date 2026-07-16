"use client";

import {FormEvent, JSX, useState} from "react";

import axios from "axios";

import {Button, TextField} from "@mui/material";
import {formStatus} from "@/lib/enums/formStatus";
import {formTypeEnum} from "@/lib/enums/formTypeEnum";
import {AccountApi, AuthApi} from "@/lib/network/apiConstants";

type FormStatus =
    (typeof formStatus)[keyof typeof formStatus];

type FormType =
    (typeof formTypeEnum)[keyof typeof formTypeEnum];

interface FieldError {
    error: boolean;
    errorMessage: string;
}

interface FormErrors {
    Name?: FieldError;
    Message?: FieldError;
    Tel?: FieldError;
}

interface ContactFormProps {
    setFormStatus: (status: FormStatus) => void;
    formType: FormType;
}

interface ContactFormElements
    extends HTMLFormControlsCollection {
    Name: HTMLInputElement;
    Message: HTMLInputElement;
    Tel: HTMLInputElement;
}

interface ContactFormElement
    extends HTMLFormElement {
    elements: ContactFormElements;
}

export default function ContactForm({
                                        setFormStatus,
                                        formType,
                                    }: ContactFormProps): JSX.Element {
    const [loading, setLoading] =
        useState<boolean>(false);

    const [formData, setFormData] =
        useState<FormErrors>({});

    function isEmpty(
        obj: FormErrors
    ): boolean {
        return Object.keys(obj).length === 0;
    }

    async function sendMessage(
        event: FormEvent<ContactFormElement>
    ): Promise<void> {
        event.preventDefault();

        const form = event.currentTarget;

        const name =
            form.elements.Name.value.trim();

        const message =
            form.elements.Message.value.trim();

        const tel =
            form.elements.Tel.value.trim();

        let errors: FormErrors = {};

        if (!name) {
            errors.Name = {
                error: true,
                errorMessage:
                    "نام و نام خانوادگی الزامی است.",
            };
        } else if (name.length < 5) {
            errors.Name = {
                error: true,
                errorMessage:
                    "نام و نام خانوادگی کوتاه است.",
            };
        } else if (name.length > 90) {
            errors.Name = {
                error: true,
                errorMessage:
                    "نام و نام خانوادگی طولانی است.",
            };
        }

        if (!message) {
            errors.Message = {
                error: true,
                errorMessage:
                    "نام شرکت یا سازمان الزامی است.",
            };
        }

        if (!tel) {
            errors.Tel = {
                error: true,
                errorMessage:
                    "شماره تلفن الزامی است.",
            };
        }

        if (!isEmpty(errors)) {
            setFormData(errors);
            return;
        }

        setFormData({});
        setLoading(true);

        const postData = {
            PhoneNumber: tel,
            FullName: name,
            Text: message,
        };

        const endpointByType = {
            [formTypeEnum.advise]:
            AccountApi.requestRegisterAdvise,

            [formTypeEnum.CorporateRegister]:
            AccountApi.requestRegisterCorporate,

            [formTypeEnum.Message]:
            AccountApi.requestPublicMessage,
        };

        const endpoint =
            endpointByType[formType] ??
            AccountApi.requestRegisterAdvise;

        try {
            await axios.post(`${AuthApi.BASEURL}${endpoint}`, postData);

            setFormStatus(formStatus.complete);
        } catch {
            setFormStatus(
                formStatus.error
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div dir="rtl">
            <form onSubmit={sendMessage}>
                <TextField
                    name="Name"
                    label="نام و نام خانوادگی :"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={loading}
                    error={formData.Name?.error}
                    helperText={
                        formData.Name?.errorMessage
                    }
                    sx={{my: 1}}
                />

                <TextField
                    name="Message"
                    label="نام سازمان :"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={loading}
                    error={formData.Message?.error}
                    helperText={
                        formData.Message?.errorMessage
                    }
                    sx={{my: 1}}
                />

                <TextField
                    name="Tel"
                    label="شماره تماس :"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={loading}
                    error={formData.Tel?.error}
                    helperText={
                        formData.Tel?.errorMessage
                    }
                    sx={{my: 1}}
                />

                <Button
                    type="submit"
                    loading={loading}
                    variant="contained"
                    color="primary"
                    sx={{
                        px: 5,
                        borderRadius: 2.5,
                    }}
                >
                    ثبت نام سازمان
                </Button>
            </form>
        </div>
    );
}
