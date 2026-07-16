"use client";

import { JSX, useState } from "react";

import {
    Alert,
    Card,
    CardContent,
    Collapse,
    Grid,
    Typography,
} from "@mui/material";

import ContactForm from "./ContactForm";
import {formStatus} from "@/lib/enums/formStatus";
import {formTypeEnum} from "@/lib/enums/formTypeEnum";

type FormStatus =
| (typeof formStatus)[keyof typeof formStatus]
| null;

export default function IntroForm(): JSX.Element {
    const [thisFormStatus, setThisFormStatus] =
    useState<FormStatus>(null);

    return (
        <>
            <Collapse
                in={
                    thisFormStatus ===
                    formStatus.complete
                }
            >
                <Alert
                    severity="success"
                    variant="filled"
                    elevation={10}
                    sx={{
                        mt: 3,
                    }}
                >
                    با تشکر از شما. همکاران ما به زودی با شما تماس خواهند گرفت.
                </Alert>
            </Collapse>

            <Collapse
                in={
                    thisFormStatus ===
                    formStatus.error
                }
            >
                <Alert
                    severity="error"
                    variant="filled"
                    elevation={10}
                    sx={{
                        mt: 3,
                    }}
                >
                    خطا در ارسال اطلاعات. لطفاً با شماره‌های جیم پین تماس بگیرید!
                </Alert>
            </Collapse>

            <Collapse
                in={
                    thisFormStatus !==
                    formStatus.complete
                }
            >
                <Card
                    elevation={4}
                    sx={{
                        my: 3,
                        borderRadius: 3,
                        maxWidth: 500,
                    }}
                >
                    <CardContent>
                        <Grid
                            direction="column"
                            spacing={3}
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    textAlign: "justify",
                                }}
                            >
                                ثبت سازمان و اطلاعات بیشتر:
                            </Typography>

                            <ContactForm
                                formType={
                                    formTypeEnum.CorporateRegister
                                }
                                setFormStatus={(
                                    status: FormStatus
                                ) =>
                                    setThisFormStatus(status)
                                }
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Collapse>
        </>
    );
}
