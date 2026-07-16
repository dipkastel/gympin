"use client";

import {JSX, useState} from "react";
import {Alert, Card, CardContent, Collapse, Container, Grid, Typography} from "@mui/material";
import ContactForm from "./ContactForm";
import {formStatus} from "@/lib/enums/formStatus";
import {formTypeEnum} from "@/lib/enums/formTypeEnum";

type FormStatus =
    | (typeof formStatus)[keyof typeof formStatus]
    | null;

export default function HomeContact(): JSX.Element {
    const [thisFormStatus, setThisFormStatus] =
        useState<FormStatus>(null);

    return (
        <section>
            <Container>
                <Grid
                    container
                    columns={50}
                    sx={{
                        mt: 2,
                        mb: 18,
                        textAlign: "center",
                        alignContent: "center",
                    }}
                >
                    <Grid
                        className="ltr"
                        size={{
                            sm: 50,
                            md: 27,
                        }}
                    >
                        <img
                            className="apps-img"
                            src="/images/main-img-footer.jpg"
                            alt="اولین ارتباط با جیم پین مؤثرترین ارتباط خواهد بود"
                        />
                    </Grid>

                    <Grid
                        size={{
                            sm: 50,
                            md: 23,
                        }}
                        sx={{
                            direction: "ltr",
                            mt: 5,
                            px: 4,
                            textAlign: "left",
                            alignContent: "start",
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                display: "inline",
                                fontWeight: 600,
                            }}
                        >
                            {"تجربه نزدیک با "}
                        </Typography>

                        <Typography
                            variant="h4"
                            component="span"
                            color="primary"
                            sx={{
                                display: "inline",
                                fontWeight: 600,
                            }}
                        >
                            جیم پین
                        </Typography>

                        <Typography variant="subtitle1">
                            برای آشنایی بیشتر با جیم پین و خدمات آن، همچنین
                            درخواست مشاوره تلفنی و یا جلسه حضوری، از طریق فرم
                            زیر اقدام نمایید.
                        </Typography>

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
                                با تشکر از شما. همکاران ما به زودی با شما تماس
                                خواهند گرفت.
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
                                خطا در ارسال اطلاعات. لطفاً با شماره‌های جیم پین
                                تماس بگیرید!
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
                                    my: 1,
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
                                            برای دریافت اطلاعات بیشتر فرم زیر را تکمیل
                                            نمایید:
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
            </Container>
        </section>
    );
}
