import React from 'react';
import {Button, Card, CardContent, Container, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

const _ContactForm = () => {
    return (
        <section>
            <Container>
                <Grid container columns={11}>
                    <Grid sx={{p: "8px 8px 8px 52px"}} size={{md:6,xs:9}}>
                        <Typography variant={"h3"} sx={{fontSize: "1.3rem", fontWeight: 600,mx:2}}>اطلاعات تماس خود را وارد کنید :</Typography>
                        <Typography variant={"h4"} sx={{textAlign:"justify",fontSize: "1rem",mt:2,lineHeight:"1.7rem",mx:2 }}>با پر کردن این فرم،کارشناسان ما در جیم پین با شما تماس خواهند گرفت و اطلاعات مورد نیازتان را در اختیار شما خواهند گذاشت. ما در جیم پین تنها به ارائه ی خدمات ورزشی محدود نمی شویم بلکه به دنبال ایجاد یک همکاری بلند مدت برای ارتقاء سلامت و بهبود بهروری کارکنان سازمان شما هستیم . اطلاعات فرم را تکمیل کنید و گامی موثر در جهت سلامت سازمان خود بردارید.</Typography>
                    </Grid>
                    <Grid  size={{md:5,xs:9}} textAlign={"center"}>

                        <Card elevation={2} sx={{mt: 3,mb:12, borderRadius: 3,maxWidth:500}}>
                            <CardContent>
                                <Grid direction={"column"} spacing={3} textAlign={"center"}><Typography variant={"body2"} sx={{
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    textAlign: "justify"
                                }}>برای دریافت اطلاعات بیشتر فرم زیر را تکمیل نمایید : </Typography>

                                    <TextField sx={{my: 1}} size={"small"} fullWidth variant={"outlined"} placeholder={"نام و نام خانوادگی :"}/>
                                    <TextField sx={{my: 1}} size={"small"} fullWidth variant={"outlined"} placeholder={"نام سازمان :"}/>
                                    <TextField sx={{my: 1}} size={"small"} fullWidth variant={"outlined"} placeholder={"شماره تماس :"}/>
                                    <Button  variant={"contained"} color={"primary"} sx={{px: 5,borderRadius:2.5}}>ثبت نام سازمان</Button>
                                </Grid>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default _ContactForm;
