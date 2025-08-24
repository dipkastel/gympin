import React, {useState} from 'react';
import {Alert, Card, CardContent, Collapse, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _ContactForm from "../partials/_ContactForm";
import {formTypeEnum} from "../../helper/enum/formTypeEnum";
import {formStatus} from "../../helper/enum/fromStatusEnum";

const _Contact = () => {
    const [thisFormStatus, setThisFormStatus] = useState(null)
    return (
        <section  data-aos="fade-up">
            <Container>
                <Grid sx={{mt: 2, mb: 18}} container columns={50} alignContent={"center"} textAlign={"center"}>
                    <Grid className={"ltr"} size={{sm: 50, md: 27}}>
                        <img className={"apps-img"} alt={"اولین ارتباط با جیم پین موثر ترین ارتباط خواهد بود"}
                             src={"/assets/images/main-img-footer.jpg"}/>
                    </Grid>
                    <Grid sx={{direction: "rtl", mt: 5, px: 4}} alignContent={"start"} textAlign={"right"} size={{sm: 50, md: 23}}>
                        <Typography variant={"h4"} sx={{display: "inline", fontWeight: 600}}>تجربه نزدیک با </Typography>
                        <Typography variant={"h4"} sx={{display: "inline", fontWeight: 600}} color={"primary"}>جیم پین</Typography>
                        <Typography variant={"subtitle1"}>برای آشنایی بیشتر با جیم پین و خدمات آن همچنین درخواست مشاوره تلفنی و یا جلسه
                            حضوری از طریق دکمه زیر اقدام نمایید.</Typography>

                        <Collapse in={thisFormStatus === formStatus.complete}>
                            <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"success"}>با تشکر از شما. همکاران ما به زودی با
                                شما تماس خواهند گرفت.</Alert>
                        </Collapse>
                        <Collapse in={thisFormStatus === formStatus.error}>
                            <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"error"}>خطا در ارسال اطلاعات . لطفا با شماره
                               ‌های جیم پین تماس بگیرید!</Alert>
                        </Collapse>
                        <Collapse in={thisFormStatus !== formStatus.complete}>
                            <Card elevation={2} sx={{my: 1, borderRadius: 3, maxWidth: 500}}>
                                <CardContent>
                                    <Grid direction={"column"} spacing={3} textAlign={"center"}><Typography variant={"body2"} sx={{
                                        fontWeight: 500,
                                        lineHeight: 1.6,
                                        textAlign: "justify"
                                    }}>برای دریافت اطلاعات بیشتر فرم زیر را تکمیل نمایید : </Typography>

                                        <_ContactForm setFormStatus={(e) => setThisFormStatus(e)}
                                                      formType={formTypeEnum.CorporateRegister}/>
                                    </Grid>
                                </CardContent>

                            </Card>
                        </Collapse>
                    </Grid>
                </Grid>

            </Container>
        </section>
    );
};

export default _Contact;
