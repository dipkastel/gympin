import React, {useState} from 'react';
import {Alert, Card, CardContent, Collapse, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _ContactForm from "../partials/_ContactForm";
import {formStatus} from "../../helper/enum/fromStatusEnum";
import {formTypeEnum} from "../../helper/enum/formTypeEnum";

const __IntroForm = () => {

    const [thisFormStatus, setThisFormStatus] = useState(null)

    return (
        <>
            <Collapse in={true}>
                <Typography variant={"h1"} color={"primary"} sx={{display: "inline", fontWeight: "700"}}> جیم پین </Typography>
                <Typography variant={"h1"} sx={{display: "inline", fontWeight: "700"}}>چیست</Typography>
                <Typography variant={"body2"} sx={{fontWeight: 500, mt: 4, lineHeight: 1.4, textAlign: "justify"}}>جیم پین در حوزه رفاهیات
                    پرسنل، به طور اختصاصی ورزش و سلامت کارمندان فعالیت می‌کند و پل ارتباطی شرکت‌ها و مراکز ورزشی است. جیم پین به نمایندگی از
                    طرف سازمان‌ها، با تعداد زیادی مجموعه ی ورزشی همکاری می‌کند تا کارمندان شرکت‌های طرف قرارداد، در هر نقطه از شهر به مراکز
                    ورزشی، دسترسی ارزان و آسان داشته باشند؛ این مراکز ورزشی دارای پراکندگی محاسبه شده بر روی نقشه و همچنین رشته‌های بسیار
                    متنوع هستند.</Typography>
                {/*<div className={"intro-buttons"}>*/}
                {/*    <Button variant={"contained"} color={"primary"} onClick={(e)=>{setShowForm(!showForm)}} sx={{borderRadius: 2, ml: 1, px: 4}}>اطلاعات بیشتر</Button>*/}
                {/*<Button variant={"outlined"} color={"primary"} sx={{borderRadius:2,mr:1}}  >درخواست دمو</Button>*/}
                {/*</div>*/}
            </Collapse>
            <Collapse in={thisFormStatus === formStatus.complete}>
                <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"success"}>با تشکر از شما. همکاران ما به زودی با شما تماس
                    خواهند گرفت.</Alert>
            </Collapse>
            <Collapse in={thisFormStatus === formStatus.error}>
                <Alert sx={{mt: 3}} elevation={10} variant={"filled"} severity={"error"}>خطا در ارسال اطلاعات . لطفا با شماره‌های جیم پین
                    تماس بگیرید!</Alert>
            </Collapse>
            <Collapse in={thisFormStatus !== formStatus.complete}>
                <Card elevation={2} sx={{my: 3, borderRadius: 3, maxWidth: 500}}>
                    <CardContent>
                        <Grid direction={"column"} spacing={3} textAlign={"center"}><Typography variant={"body2"} sx={{
                            fontWeight: 500,
                            lineHeight: 1.6,
                            textAlign: "justify"
                        }}>ثبت سازمان و اطلاعات بیشتر : </Typography>
                            <_ContactForm setFormStatus={(e) => setThisFormStatus(e)} formType={formTypeEnum.CorporateRegister}/>
                        </Grid>
                    </CardContent>

                </Card>
            </Collapse>
        </>
    );
};

export default __IntroForm;
