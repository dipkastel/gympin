"use client";

import {JSX, useState} from "react";

import {Alert, Card, CardContent, Collapse, Grid, Typography} from "@mui/material";

import ContactForm from "./ContactForm";
import {formStatus} from "@/lib/enums/formStatus";
import {formTypeEnum} from "@/lib/enums/formTypeEnum";

type FormStatus =
    | (typeof formStatus)[keyof typeof formStatus]
    | null;

export default function CorporateForm(): JSX.Element {
    const [thisFormStatus, setThisFormStatus] =
        useState<FormStatus>(null);

    return (
        <section className="Corporate-form">
            <Grid
                container
                columns={10}
                sx={{
                    alignContent: "center",
                    textAlign: "right",
                }}
            >
                <Grid
                    size={{md: 6, xs: 10}}
                    sx={{
                        py: 5,
                        px: "8vw",
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                        }}
                    >
                        اطلاعات تماس خود را وارد کنید
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 400,
                            lineHeight: "2rem",
                            mt: 2,
                            mb: 3,
                            textAlign: "justify",
                        }}
                    >
                        با پر کردن این فرم، کارشناسان ما در جیم پین با شما تماس
                        خواهند گرفت و اطلاعات مورد نیازتان را در اختیار شما
                        خواهند گذاشت.
                    </Typography>
                </Grid>

                <Grid
                    size={{md: 4, xs: 10}}
                    sx={{
                        justifyItems: "center",
                    }}
                >
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
                            با تشکر از شما. همکاران ما به زودی با شما تماس خواهند
                            گرفت.
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
                            خطا در ارسال اطلاعات. لطفاً با شماره‌های جیم پین تماس
                            بگیرید!
                        </Alert>
                    </Collapse>

                    <Collapse
                        in={
                            thisFormStatus !==
                            formStatus.complete
                        }
                    >
                        <Card
                            elevation={2}
                            sx={{
                                mx: 2,
                                mt: 3,
                                mb: -12,
                                borderRadius: 3,
                                maxWidth: 500,
                            }}
                        >
                            <CardContent>
                                <Grid
                                    sx={{
                                        display:"flex",
                                        flexDirection:"column",
                                        gap:3,
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
                </Grid>
            </Grid>
        </section>
    );
}
