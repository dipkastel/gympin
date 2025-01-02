import React, {useState} from 'react';
import {Alert, Card, CardContent, Collapse, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {formStatus} from "../../helper/enum/fromStatusEnum";
import {formTypeEnum} from "../../helper/enum/formTypeEnum";
import _ContactForm from "../partials/_ContactForm";

const _ContactUs = () => {
    const [thisFormStatus, setThisFormStatus] = useState(null)
    return (
        <section>
            <Container>
                <Grid container columns={11}>
                    <Grid sx={{p: "8px 8px 8px 52px"}} size={{md: 6, xs: 9}}>
                        <Typography variant={"h3"} sx={{fontSize: "1.3rem", fontWeight: 600, mx: 2}}>اطلاعات تماس خود را وارد کنید
                            :</Typography>
                        <Typography variant={"h4"} sx={{textAlign: "justify", fontSize: "1rem", mt: 2, lineHeight: "1.7rem", mx: 2}}>با پر
                            کردن این فرم، کارشناسان ما در جیم پین با شما تماس خواهند گرفت و اطلاعات مورد نیازتان را در اختیار شما خواهند
                            گذاشت. ما در جیم پین تنها به ارائه ی خدمات ورزشی محدود نمی‌شویم بلکه به دنبال ایجاد یک همکاری بلند مدت برای
                            ارتقاء سلامت و بهبود بهروری کارکنان سازمان شما هستیم . اطلاعات فرم را تکمیل کنید و گامی‌موثر در جهت سلامت سازمان
                            خود بردارید.</Typography>
                    </Grid>
                    <Grid size={{md: 5, xs: 9}} textAlign={"center"}>

                        <Collapse in={thisFormStatus === formStatus.complete}>
                            <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"success"}>با تشکر از شما. همکاران ما به زودی با
                                شما تماس خواهند گرفت.</Alert>
                        </Collapse>
                        <Collapse in={thisFormStatus === formStatus.error}>
                            <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"error"}>خطا در ارسال اطلاعات . لطفا با شماره
                                ‌های جیم پین تماس بگیرید!</Alert>
                        </Collapse>
                        <Collapse in={thisFormStatus !== formStatus.complete}>
                            <Card elevation={2} sx={{mt: 3, mb: 12, borderRadius: 3, maxWidth: 500}}>
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

export default _ContactUs;
