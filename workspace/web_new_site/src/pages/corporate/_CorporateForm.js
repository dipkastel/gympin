import React, {useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Alert, Card, CardContent, Collapse, Typography} from "@mui/material";
import {formStatus} from "../../helper/enum/fromStatusEnum";
import _ContactForm from "../partials/_ContactForm.js";
import {formTypeEnum} from "../../helper/enum/formTypeEnum";

const _CorporateForm = () => {

    const [thisFormStatus, setThisFormStatus] = useState(null)

    return (
        <section  data-aos="fade-up" className={"Corporate-form"}>

            <Grid container columns={10} alignContent={"center"} textAlign={"right"}>
                <Grid sx={{py:5,px:"8vw"}} item size={{md: 6, xs: 10}}>

                    <Typography sx={{fontWeight: 600}} variant={"h5"}>اطلاعات تماس خود را وارد کنید</Typography>
                    <Typography sx={{fontWeight: 400,lineHeight:"2rem", mt: 2, mb: 3, textAlign: "justify"}} variant={"subtitle1"}>
                        با پر کردن این فرم، کارشناسان ما در جیم پین با شما تماس خواهند گرفت و اطلاعات مورد نیازتان را در اختیار شما خواهند گذاشت.
                    </Typography>
                </Grid>
                <Grid  item size={{md: 4, xs: 10}} justifyItems={"center"}>

                    <Collapse in={thisFormStatus === formStatus.complete}>
                        <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"success"}>با تشکر از شما. همکاران ما به زودی با
                            شما تماس خواهند گرفت.</Alert>
                    </Collapse>
                    <Collapse in={thisFormStatus === formStatus.error}>
                        <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"error"}>خطا در ارسال اطلاعات . لطفا با شماره
                           ‌های جیم پین تماس بگیرید!</Alert>
                    </Collapse>
                    <Collapse in={thisFormStatus !== formStatus.complete}>
                    <Card elevation={2} sx={{mx:2,mt: 3,mb:-12, borderRadius: 3, maxWidth: 500}}>
                        <CardContent>
                            <Grid direction={"column"} spacing={3} textAlign={"center"}><Typography variant={"body2"} sx={{
                                fontWeight: 500,
                                lineHeight: 1.6,
                                textAlign: "justify"
                            }}>ثبت سازمان و اطلاعات بیشتر : </Typography>

                                <_ContactForm formType={formTypeEnum.CorporateRegister} setFormStatus={(e)=>setThisFormStatus(e)} />
                            </Grid>
                        </CardContent>

                    </Card>
                    </Collapse>
                </Grid>
            </Grid>
        </section>
    );
};

export default _CorporateForm;
